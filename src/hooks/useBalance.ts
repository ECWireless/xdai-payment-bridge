import { useWallet } from 'contexts/WalletContext';
import { useEffect, useState } from 'react';
import { getBalance } from 'web3/balance';
import { NETWORK_CURRENCIES, erc20Tokens } from 'web3/constants';

interface IBalances {
  balances: { [key: string]: string };
  isLoadingBalances: boolean;
}

export const useBalance = (refresh = 0): IBalances => {
  const { provider, address, chainId } = useWallet();

  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [isLoadingBalances, setLoadingBalances] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !address || !chainId) {
        return;
      }

      setLoadingBalances(true);
      const tempBalances: { [key: string]: string } = {};
      await Promise.all(
        erc20Tokens.map(async (token) => {
          const balance = await getBalance(provider, token.address, address);
          tempBalances[token.symbol] = balance.toString();
          return balance;
        }),
      );
      const balance = (await provider.getBalance(address)).toString();
      const nativeSymbol = NETWORK_CURRENCIES[chainId].symbol;
      tempBalances[nativeSymbol] = balance.toString();
      setBalances(tempBalances);
      setLoadingBalances(false);
    };

    fetchBalance();
  }, [address, provider, refresh, chainId]);

  return { balances, isLoadingBalances };
};
