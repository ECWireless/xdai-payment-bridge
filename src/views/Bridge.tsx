import React from 'react';
import { useParams } from 'react-router-dom';
import { utils } from 'ethers';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { useBalance } from 'hooks/useBalance';

import { Container, Flex } from 'components/Containers';
import { P1, P3 } from 'components/Typography';

const Bridge: React.FC = () => {
  const { id } = useParams();
  const { balances } = useBalance();
  const [amount, setAmount] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Paying ' + amount);
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
              type={'text'}
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
              Pay
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
