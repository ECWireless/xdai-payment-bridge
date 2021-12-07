import { Contract, providers, utils } from 'ethers';

export const relayTokens = async (
  ethersProvider: providers.Web3Provider,
  contractAddress: string,
  receiver: string,
  amount: string,
): Promise<providers.TransactionResponse> => {
  if (!(ethersProvider && contractAddress && receiver && amount)) {
    throw new Error('Could not validate bridge input params');
  }
  const abi = new utils.Interface(['function relayTokens(address _receiver, uint256 _amount) external']);
  const communityContract = new Contract(contractAddress, abi, ethersProvider.getSigner());
  return communityContract.relayTokens(receiver, amount);
};
