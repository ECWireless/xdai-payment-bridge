// import ethIcon from 'assets/eth.png';
import xdaiIcon from 'assets/xdai.png';

const {
  REACT_APP_DEFAULT_NETWORK,
  REACT_APP_KOVAN_RPC: KOVAN_RPC,
  REACT_APP_SOKOL_RPC: SOKOL_RPC,
  REACT_APP_SIDE_NETWORK,
} = process.env;

export const bridgeAddresses: { [chainId: number]: string } = {
  42: '0x99fb1a25caeb9c3a5bf132686e2fe5e27bc0e2dd',
  77: '0x867949C3F2f66D827Ed40847FaA7B3a369370e13',
};

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
    name: 'Kovan SPOA',
    symbol: 'KSPOA',
    decimals: 18,
    address: '0xff94183659f549d6273349696d73686ee1d2ac83',
    iconUri: xdaiIcon,
  },
  77: {
    name: 'SPOA',
    symbol: 'SPOA',
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
export const SIDE_NETWORK = Number(REACT_APP_SIDE_NETWORK || 77);
