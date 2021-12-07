import { Contract, providers, utils } from 'ethers';
import { SIDE_NETWORK, bridgeAddresses } from 'web3/constants';

export const relayTokens = async (
  ethersProvider: providers.Web3Provider,
  chainId: number,
  receiver: string,
  amount: string,
): Promise<providers.TransactionResponse> => {
  if (!(ethersProvider && chainId && bridgeAddresses[chainId] && receiver && amount)) {
    throw new Error('Could not validate bridge input params');
  }

  const contractAddress = bridgeAddresses[chainId];

  if (chainId === SIDE_NETWORK) {
    const abi = new utils.Interface(['function relayTokens(address _receiver) external payable']);
    const communityContract = new Contract(contractAddress, abi, ethersProvider.getSigner());
    return communityContract.relayTokens(receiver, {
      value: utils.parseEther(amount),
    });
  }

  const abi = new utils.Interface(['function relayTokens(address _receiver, uint256 _amount) external']);
  const communityContract = new Contract(contractAddress, abi, ethersProvider.getSigner());
  return communityContract.relayTokens(receiver, utils.parseEther(amount));
};
