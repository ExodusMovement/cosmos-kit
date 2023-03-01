import type { AccountData } from '@cosmjs/proto-signing';

type Chain = string;

export interface Account {
  address: string;
}

interface ConnectionOptions {
  chainId: Chain;
}

interface Transaction {
  authInfo?: Uint8Array;
  body?: Uint8Array;
  chainId: Chain;
  signer: string;
}

export interface ExodusCosmosProvider {
  connect: (options: ConnectionOptions) => Promise<AccountData>;
  signTransaction: (transaction: Transaction) => Promise<{ signature: string }>;
}

export interface Exodus {
  cosmos: ExodusCosmosProvider;
}

export interface ExodusWindow {
  exodus: Exodus;
}
