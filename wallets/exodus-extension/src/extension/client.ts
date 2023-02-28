import type { AccountData } from '@cosmjs/proto-signing';
import type { DirectSignResponse } from '@cosmjs/proto-signing/build/signer';
import { WalletClient } from '@cosmos-kit/core';
import type { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';

import type { ExodusCosmosProvider } from '../types';

export class ExodusClient implements WalletClient {
  readonly client: ExodusCosmosProvider;
  #account;

  constructor(client: ExodusCosmosProvider) {
    this.client = client;
  }

  async getAccount(chainId: string) {
    const account = await this.client.connect({ chainId });

    this.#account = account;

    return account;
  }

  async getOfflineSigner() {
    return {
      getAccounts: async (): Promise<AccountData[]> => [this.#account],
      signDirect: async (
        signer: string,
        signDoc: SignDoc
      ): Promise<DirectSignResponse> => {
        const { signature } = await this.client.signTransaction({
          signer,
          ...signDoc,
        });

        return {
          signed: signDoc,
          signature: {
            pub_key: {
              type: this.#account.algo,
              value: this.#account.publicKey,
            },
            signature,
          },
        };
      },
    };
  }
}
