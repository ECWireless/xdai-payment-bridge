import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { Container, Flex } from 'components/Containers';
import { H3 } from 'components/Typography';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (address.length !== 42) {
      alert('Invalid address');
      return;
    } else {
      navigate(`/address/${address}`);
    }
  };

  return (
    <Container>
      <Flex
        css={`
          padding-top: ${GU * 10}px;
        `}
        justify={'center'}
      >
        <H3>xDAI PaymentBridge</H3>
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
          <label htmlFor={'search'}>Search receiving address:</label>
          <Flex
            css={`
              margin-top: ${GU * 2}px;
            `}
          >
            <input
              css={`
                width: ${GU * 100}px;
              `}
              type={'text'}
              name={'search'}
              id={'search'}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <button
              css={`
                margin-left: ${GU * 2}px;
              `}
              type={'submit'}
            >
              Search
            </button>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};

export default Search;
