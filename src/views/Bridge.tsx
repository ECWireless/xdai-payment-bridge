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
import { kovanToSokolBridgeAddress, erc20Tokens } from 'web3/constants';
import { onApprove } from 'web3/approve';
import { relayTokens } from 'web3/kovanToSokolBridge';

import { Container, Flex } from 'components/Containers';
import { P1, P3 } from 'components/Typography';

const Bridge: React.FC = () => {
  const { id } = useParams();
  const { chainId, provider } = useContext(WalletContext);
  const [refreshCount, refresh] = useRefresh();
  const { balances } = useBalance(refreshCount);
  const allowance = useAllowance(kovanToSokolBridgeAddress, erc20Tokens[0].address, refreshCount);
  const [amount, setAmount] = useState('');
  const [isPending, setIsPending] = useState(false);

  const needsApproved = useMemo(() => {
    if (allowance.toString() === '0') return true;
    if (amount === '') return false;
    return utils.parseEther(amount).gt(allowance);
  }, [amount, allowance]);

  const isDisabled = useMemo(() => {
    if (amount === '' || amount === '0') return true;
    if (!provider) return true;
    return false;
  }, [amount, provider]);

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
      const tx = await onApprove(provider, erc20Tokens[0].address, kovanToSokolBridgeAddress);
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
  }, [provider, checkTx]);

  const onRelayTokens = useCallback(async () => {
    if (!(provider && amount && id)) return;

    try {
      setIsPending(true);
      const tx = await relayTokens(provider, kovanToSokolBridgeAddress, id, utils.parseEther(amount).toString());
      await checkTx(tx);
      toast.success(`KSPOA has been bridged`);
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
  }, [amount, id, provider, checkTx]);

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
          {balances['KSPOA'] && (
            <P3
              css={`
                margin-top: ${GU * 2}px;
              `}
            >
              Current balance: {utils.formatEther(balances['KSPOA']).toString()} KSPOA
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
