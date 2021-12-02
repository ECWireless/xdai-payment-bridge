import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styled-components/macro';
import { GU } from 'components/theme';
import { shortenAddress } from 'utils';

import { WalletContext } from 'contexts/WalletContext';

import { Container, Flex } from 'components/Containers';
import { H3, P2 } from 'components/Typography';

const Header: React.FC = () => {
  const { address, connectWallet, isConnected, disconnect } = useContext(WalletContext);
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
        ) : (
          <button onClick={connectWallet}>Connect</button>
        )}
      </Flex>
    </Container>
  );
};

export default Header;
