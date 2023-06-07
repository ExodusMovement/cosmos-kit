import { BroadcastMode, DirectSignDoc, WalletClient } from '@cosmos-kit/core';
import type { 
  AccountData,
  DirectSignResponse,
  ExodusCosmosProvider,
  StdSignDoc
} from '../types';

export class ExodusClient implements WalletClient {
  readonly client: ExodusCosmosProvider;
  private account!: AccountData;

  constructor(client: ExodusCosmosProvider) {
    this.client = client;
  }

  async connect(chainId: string | string[]) {
    await this.client.connect({ chainId: Array.isArray(chainId) ? chainId[0] : chainId });
  }

  async getAccount(chainId: string) {
    const account = await this.client.connect({ chainId });

    this.account = account;

    return {
      ...account,
      pubkey: account.publicKey,
    }
  }

  async getOfflineSigner(chainId: string) {
    await this.getAccount(chainId)

    return {
      getAccounts: async (): Promise<AccountData[]> => [this.account],
      signDirect: async (
        signer: string,
        signDoc: DirectSignDoc
      ): Promise<DirectSignResponse> => {
        return this.client.signTransaction(signDoc);
      },
    };
  }

  async signAmino(chainId: string, signer: string, signDoc: StdSignDoc) {
    return this.client.signAminoTransaction(signDoc);
  }

  async sendTx(chainId: string, transaction: Uint8Array, mode: BroadcastMode) {
    return this.client.sendTx(chainId, transaction, mode)
  }
}
