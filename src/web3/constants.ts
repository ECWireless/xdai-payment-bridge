import ethIcon from 'assets/eth.png';
import xdaiIcon from 'assets/xdai.png';

const { REACT_APP_DEFAULT_NETWORK, REACT_APP_KOVAN_RPC: KOVAN_RPC, REACT_APP_SOKOL_RPC: SOKOL_RPC } = process.env;

export const erc20Tokens = [
  {
    name: 'Kovan SPOA',
    symbol: 'KSPOA',
    decimals: 18,
    address: '0xff94183659f549d6273349696d73686ee1d2ac83',
  },
];

// networks
type StringInfo = {
  [chainId: number]: string;
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  iconUri: string;
};

type CurrencyInfo = {
  [chainId: number]: Token;
};

export const NETWORK_CURRENCIES: CurrencyInfo = {
  42: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    address: '',
    iconUri: ethIcon,
  },
  77: {
    name: 'SPOA',
    symbol: 'xDai',
    decimals: 18,
    address: '',
    iconUri: xdaiIcon,
  },
};

export const RPC_URLS: StringInfo = {
  42: KOVAN_RPC || '',
  77: SOKOL_RPC || '',
};

export const EXPLORER_URLS: StringInfo = {
  42: 'https://kovan.etherscan.io',
  77: 'https://explorer.anyblock.tools/ethereum/poa/sokol',
};

export const NETWORK_NAMES: StringInfo = {
  42: 'Kovan Testnet',
  77: 'Sokol Testnet',
};

export const DEFAULT_NETWORK = Number(REACT_APP_DEFAULT_NETWORK || 42);
