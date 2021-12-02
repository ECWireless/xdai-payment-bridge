import React from 'react';
import { useParams } from 'react-router-dom';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { Container, Flex } from 'components/Containers';
import { H3 } from 'components/Typography';

const Bridge: React.FC = () => {
  const { id } = useParams();
  const [amount, setAmount] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Paying ' + amount);
  };

  return (
    <Container>
      <Flex
        css={`
          padding-top: ${GU * 10}px;
        `}
        justify={'center'}
      >
        <H3>{id}</H3>
      </Flex>
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
        </form>
      </Flex>
    </Container>
  );
};

export default Bridge;
