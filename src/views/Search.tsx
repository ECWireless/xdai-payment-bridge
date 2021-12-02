import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styled-components/macro';
import { GU } from 'components/theme';

import { WalletContext } from 'contexts/WalletContext';

import { Container, Flex } from 'components/Containers';
import { H3, P2 } from 'components/Typography';

const Search: React.FC = () => {
  const { address, connectWallet, isConnected, disconnect } = useContext(WalletContext);
  const navigate = useNavigate();
  const [searchedAddress, setSearchedAddress] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchedAddress.length !== 42) {
      alert('Invalid address');
      return;
    } else {
      navigate(`/address/${searchedAddress}`);
    }
  };

  return (
    <Container>
      <Flex
        css={`
          padding-top: ${GU * 10}px;
        `}
        align={'center'}
        direction={'column'}
        justify={'center'}
      >
        <H3>xDAI PaymentBridge</H3>
        {isConnected && <P2>Connected as {address}</P2>}
      </Flex>
      <Flex
        css={`
          height: 80vh;
        `}
        align={'center'}
        direction={'column'}
        justify={'center'}
      >
        {isConnected && (
          <div>
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
                  onChange={(e) => setSearchedAddress(e.target.value)}
                  value={searchedAddress}
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
            <button
              css={`
                margin-top: ${GU * 8}px;
              `}
              onClick={disconnect}
            >
              Disconnect
            </button>
          </div>
        )}
        {!isConnected && (
          <button
            css={`
              margin-top: ${GU * 8}px;
            `}
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </Flex>
    </Container>
  );
};

export default Search;
