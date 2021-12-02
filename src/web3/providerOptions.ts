import WalletConnectProvider from '@walletconnect/web3-provider';
import { WalletLink, WalletLinkProvider } from 'walletlink';
import { IProviderOptions } from 'web3modal';

import CoinbaseLogo from 'assets/coinbase-wallet.svg';

interface ConnectorOptions {
  appName: string;
  networkUrl: string;
  chainId: number;
}

export const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        3: process.env.REACT_APP_ROPSTEN_RPC,
      },
    },
  },
  'custom-walletlink': {
    display: {
      logo: CoinbaseLogo,
      name: 'Coinbase',
      description: 'Scan with Coinbase wallet to connect',
    },
    options: {
      appName: 'uDonate',
    },
    package: WalletLink,
    connector: async (PackageObject: typeof WalletLink, options: ConnectorOptions): Promise<WalletLinkProvider> => {
      const { appName } = options;
      const walletLink = new PackageObject({
        appName,
      });
      // @ts-expect-error invalid types cannot assign {} to 'string'
      const provider = walletLink.makeWeb3Provider({}, 0);
      await provider.enable();
      return provider;
    },
  },
};
