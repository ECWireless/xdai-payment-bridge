import { useWallet } from 'contexts/WalletContext';
import { useEffect, useState } from 'react';
import { getBalance } from 'web3/balance';
import { NETWORK_CURRENCIES, SIDE_NETWORK } from 'web3/constants';

interface IBalances {
  balance: string;
  isLoadingBalance: boolean;
}

export const useBalance = (refresh = 0): IBalances => {
  const { provider, address, chainId } = useWallet();

  const [balance, setBalance] = useState<string>('0');
  const [isLoadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !address || !chainId) {
        return;
      }

      setLoadingBalance(true);
      const tempBalances: { [key: string]: string } = {};
      if (chainId === SIDE_NETWORK) {
        const balance = (await provider.getBalance(address)).toString();
        setBalance(balance.toString());
      } else {
        const balance = await getBalance(provider, NETWORK_CURRENCIES[chainId].address, address);
        tempBalances[NETWORK_CURRENCIES[chainId].symbol] = balance.toString();
        setBalance(balance.toString());
      }
      setLoadingBalance(false);
    };

    fetchBalance();
  }, [address, provider, refresh, chainId]);

  return { balance, isLoadingBalance };
};
