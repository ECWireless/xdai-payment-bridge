import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { utils, providers } from 'ethers';
import { toast } from 'react-toastify';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { useRefresh } from 'hooks/useRefresh';
import { useBalance } from 'hooks/useBalance';
import { useAllowance } from 'hooks/useAllowance';
import { WalletContext } from 'contexts/WalletContext';
import { onApprove } from 'web3/approve';
import { relayTokens } from 'web3/bridge';
import { NETWORK_CURRENCIES, SIDE_NETWORK, bridgeAddresses } from 'web3/constants';

import { Container, Flex } from 'components/Containers';
import { P1, P3 } from 'components/Typography';

const Bridge: React.FC = () => {
  const { id } = useParams();
  const { chainId, provider } = useContext(WalletContext);
  const [refreshCount, refresh] = useRefresh();
  const { balance } = useBalance(refreshCount);
  const allowance = useAllowance(
    chainId ? bridgeAddresses[chainId] : '',
    chainId ? NETWORK_CURRENCIES[chainId].address : '',
    refreshCount,
  );
  const [amount, setAmount] = useState('');
  const [isPending, setIsPending] = useState(false);

  const needsApproved = useMemo(() => {
    if (chainId === SIDE_NETWORK) return false;
    if (allowance.toString() === '0') return true;
    if (amount === '') return false;
    return utils.parseEther(amount).gt(allowance);
  }, [amount, chainId, allowance]);

  const isDisabled = useMemo(() => {
    if (amount === '' || amount === '0' || isPending) return true;
    if (!provider) return true;
    return false;
  }, [amount, isPending, provider]);

  const checkTx = useCallback(
    async (tx: providers.TransactionResponse) => {
      if (!chainId) throw Error('Depositing funds');
      if (!tx) throw Error('Could not confirm token approval');
      await tx.wait();
      const { status } = await tx.wait();
      if (status !== 1) {
        throw new Error('Could not confirm token approval');
      }
      refresh();
    },
    [chainId, refresh],
  );

  const onApproveToken = useCallback(async () => {
    if (!provider) return;

    try {
      setIsPending(true);
      const tx = await onApprove(
        provider,
        chainId ? NETWORK_CURRENCIES[chainId].address : '',
        chainId ? bridgeAddresses[chainId] : '',
      );
      await checkTx(tx);
      toast.success(`KSPOA has been approved`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Approving token failed', error);
      const possibleTxError = error as Error & { error?: Error };
      toast.error(`Approve failed: ${possibleTxError.error ? possibleTxError.error.message : possibleTxError.message}`);
    } finally {
      setIsPending(false);
    }
  }, [chainId, provider, checkTx]);

  const onRelayTokens = useCallback(async () => {
    if (!(chainId && provider && amount && id)) return;

    try {
      setIsPending(true);
      const tx = await relayTokens(provider, chainId, id, amount);
      await checkTx(tx);
      toast.success(`${NETWORK_CURRENCIES[chainId]?.symbol} has been bridged`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Bridging token failed', error);
      const possibleTxError = error as Error & { error?: Error };
      toast.error(
        `Bridging failed: ${possibleTxError.error ? possibleTxError.error.message : possibleTxError.message}`,
      );
    } finally {
      setIsPending(false);
    }
  }, [amount, chainId, id, provider, checkTx]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (needsApproved) {
      onApproveToken();
    } else {
      onRelayTokens();
    }
  };

  return (
    <Container>
      <Flex
        css={`
          height: 80vh;
        `}
        align={'center'}
        direction={'column'}
        justify={'center'}
      >
        <form onSubmit={onSubmit}>
          <label htmlFor={'search'}>Amount:</label>
          <Flex
            css={`
              margin-top: ${GU * 2}px;
            `}
          >
            <input
              css={`
                width: ${GU * 60}px;
              `}
              disabled={isDisabled}
              type={'number'}
              name={'search'}
              id={'search'}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <button
              css={`
                margin-left: ${GU * 2}px;
              `}
              type={'submit'}
              disabled={isDisabled}
            >
              {isPending ? 'Pending...' : needsApproved ? 'Approve' : 'Pay'}
            </button>
          </Flex>
          {chainId && (
            <P3
              css={`
                margin-top: ${GU * 2}px;
              `}
            >
              Current balance: {utils.formatEther(balance).toString()}{' '}
              {chainId ? NETWORK_CURRENCIES[chainId].symbol : ''}
            </P3>
          )}
          {id && (
            <P1
              css={`
                margin-top: ${GU * 8}px;
              `}
            >
              Receiving address: {id}
            </P1>
          )}
        </form>
      </Flex>
    </Container>
  );
};

export default Bridge;
