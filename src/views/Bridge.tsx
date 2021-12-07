import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { utils, BigNumber } from 'ethers';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { useRefresh } from 'hooks/useRefresh';
import { useBalance } from 'hooks/useBalance';
import { useAllowance } from 'hooks/useAllowance';
import { WalletContext } from 'contexts/WalletContext';
import { kovanXDaiBridgeAddress } from 'web3/constants';

import { Container, Flex } from 'components/Containers';
import { P1, P3 } from 'components/Typography';

const Bridge: React.FC = () => {
  const { id } = useParams();
  const { address } = useContext(WalletContext);
  const [refreshCount, refresh] = useRefresh();
  const { balances } = useBalance(refreshCount);
  const allowance = useAllowance(address || '', kovanXDaiBridgeAddress, refreshCount);
  const [amount, setAmount] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Paying ' + amount);
  };

  const needsApproved = useMemo(() => {
    if (allowance.toString() === '0') return true;
    if (amount === '') return false;
    return BigNumber.from(amount).gt(allowance);
  }, [amount, allowance]);

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
            >
              {needsApproved ? 'Approve' : 'Pay'}
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
