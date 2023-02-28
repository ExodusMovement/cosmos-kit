import { EndpointOptions, Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';

import { ChainExodusExtension } from './chain-wallet';
import { ExodusClient } from './client';
import { getExodusFromExtension } from './utils';

export class ExodusExtensionWallet extends MainWalletBase {
  constructor(walletInfo: Wallet, preferredEndpoints?: EndpointOptions) {
    super(walletInfo, ChainExodusExtension);
    this.preferredEndpoints = preferredEndpoints;
  }

  async initClient() {
    this.initingClient();
    try {
      const exodus = await getExodusFromExtension();
      this.initClientDone(exodus ? new ExodusClient(exodus.cosmos) : undefined);
    } catch (error) {
      this.logger?.error(error);
      this.initClientError(error);
    }
  }
}
