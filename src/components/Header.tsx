import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styled-components/macro';
import { GU } from 'components/theme';
import { shortenAddress } from 'utils';

import { WalletContext } from 'contexts/WalletContext';
import { NETWORK_NAMES } from 'web3/constants';

import { Container, Flex } from 'components/Containers';
import { H3, P2, P3 } from 'components/Typography';

const Header: React.FC = () => {
  const { address, connectWallet, isConnected, disconnect, chainId } = useContext(WalletContext);
  const navigate = useNavigate();

  return (
    <Container
      css={`
        margin-top: ${GU * 8}px;
      `}
    >
      <Flex align={'center'} justify={'space-between'}>
        <H3 onClick={() => navigate('/')}>
          <span
            css={`
              text-decoration: line-through;
            `}
          >
            xDAI
          </span>{' '}
          Sokol PaymentBridge
        </H3>

        {isConnected ? (
          <Flex align={'flex-end'} direction={'column'}>
            <Flex>
              {isConnected && <P2>{shortenAddress(address || '')}</P2>}
              <button
                css={`
                  margin-left: ${GU * 4}px;
                `}
                onClick={disconnect}
              >
                Disconnect
              </button>
            </Flex>
            {chainId && (
              <P3
                css={`
                  margin-top: ${GU * 2}px;
                `}
              >
                {NETWORK_NAMES[chainId]}
              </P3>
            )}
          </Flex>
        ) : (
          <button onClick={connectWallet}>Connect</button>
        )}
      </Flex>
    </Container>
  );
};

export default Header;
