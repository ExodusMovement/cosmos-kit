import { AssetList, Chain } from '@chain-registry/types';
import { AminoSignResponse, OfflineAminoSigner, StdSignDoc } from '@cosmjs/amino';
import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSignResponse, EncodeObject, OfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing';
import { DeliverTxResponse, SigningStargateClient, StargateClient, StdFee } from '@cosmjs/stargate';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { ChainWalletBase } from '../bases';
import { NameService } from '../name-service';
import { WalletRepo } from '../repository';
import { ChainName, ChainRecord } from './chain';
import { CosmosClientType, ModalTheme, Mutable, State } from './common';
import { EndpointOptions, EventName, SignerOptions } from './manager';
import { BroadcastMode, DirectSignDoc, NameServiceName, SignOptions, Wallet, WalletAccount, WalletClient, WalletStatus } from './wallet';
export interface ChainWalletContext {
    chainWallet: ChainWalletBase | undefined;
    chain: Chain;
    assets: AssetList | undefined;
    wallet: Wallet;
    logoUrl: string | undefined;
    address: string | undefined;
    username: string | undefined;
    message: string | undefined;
    status: WalletStatus;
    isWalletDisconnected: boolean;
    isWalletConnecting: boolean;
    isWalletConnected: boolean;
    isWalletRejected: boolean;
    isWalletNotExist: boolean;
    isWalletError: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getRpcEndpoint: () => Promise<string>;
    getRestEndpoint: () => Promise<string>;
    getStargateClient: () => Promise<StargateClient>;
    getCosmWasmClient: () => Promise<CosmWasmClient>;
    getSigningStargateClient: () => Promise<SigningStargateClient>;
    getSigningCosmWasmClient: () => Promise<SigningCosmWasmClient>;
    getNameService: () => Promise<NameService>;
    estimateFee: (messages: EncodeObject[], type?: CosmosClientType, memo?: string, multiplier?: number) => Promise<StdFee>;
    sign: (messages: EncodeObject[], fee?: StdFee, memo?: string, type?: CosmosClientType) => Promise<TxRaw>;
    broadcast: (signedMessages: TxRaw, type?: CosmosClientType) => Promise<DeliverTxResponse>;
    signAndBroadcast: (messages: EncodeObject[], fee?: StdFee, memo?: string, type?: CosmosClientType) => Promise<DeliverTxResponse>;
    qrUrl: Mutable<string> | undefined;
    appUrl: Mutable<string> | undefined;
    enable: () => Promise<void>;
    getAccount: () => Promise<WalletAccount>;
    getOfflineSigner: () => Promise<OfflineSigner>;
    getOfflineSignerAmino: () => OfflineAminoSigner;
    getOfflineSignerDirect: () => OfflineDirectSigner;
    signAmino: (signer: string, signDoc: StdSignDoc, signOptions?: SignOptions) => Promise<AminoSignResponse>;
    signDirect: (signer: string, signDoc: DirectSignDoc, signOptions?: SignOptions) => Promise<DirectSignResponse>;
    sendTx(tx: Uint8Array, mode: BroadcastMode): Promise<Uint8Array>;
}
export interface ChainContext extends ChainWalletContext {
    wallet: Wallet | undefined;
    walletRepo: WalletRepo;
    openView: () => void;
    closeView: () => void;
}
export interface ManagerContext {
    chainRecords: ChainRecord[];
    walletRepos: WalletRepo[];
    defaultNameService: NameServiceName;
    getChainRecord: (chainName: ChainName) => ChainRecord;
    getWalletRepo: (chainName: ChainName) => WalletRepo;
    addChains: (chains: Chain[], assetLists: AssetList[], signerOptions?: SignerOptions, endpointOptions?: EndpointOptions) => void;
    getChainLogo: (chainName: ChainName) => string | undefined;
    getNameService: (chainName?: ChainName) => Promise<NameService>;
    on: (event: EventName, handler: (params: any) => void) => void;
    off: (event: EventName, handler: (params: any) => void) => void;
}
export interface ModalThemeContext {
    modalTheme: ModalTheme;
    setModalTheme: (theme: ModalTheme) => void;
}
export interface WalletContext {
    chainWallets: ChainWalletBase[];
    wallet: Wallet | undefined;
    status: WalletStatus;
    message: string | undefined;
}
export interface WalletClientContext {
    client: WalletClient | undefined;
    status: State;
    message: string | undefined;
}