import { Wallet } from '@cosmos-kit/core';

export const omniMobileInfo: Wallet = {
  name: 'omni-mobile',
  prettyName: 'Omni Mobile',
  logo: 'https://raw.githubusercontent.com/cosmology-tech/cosmos-kit/main/public/images/logos/wallets/omni.png',
  mode: 'wallet-connect',
  mobileDisabled: false,
  rejectMessage: {
    source: 'Request rejected',
  },
  downloads: [
    {
      device: 'mobile',
      os: 'android',
      link: 'https://play.google.com/store/apps/details?id=com.chainapsis.omni&hl=en&gl=US&pli=1',
    },
    {
      device: 'mobile',
      os: 'ios',
      link: 'https://apps.apple.com/us/app/omni-wallet/id1567851089',
    },
    {
      link: 'https://www.omni.app/download',
    },
  ],
  connectEventNamesOnWindow: ['omni_keystorechange'],
  walletconnect: {
    name: 'Omni',
    projectId:
      'afbd95522f4041c71dd4f1a065f971fd32372865b416f95a0b1db759ae33f2a7',
  },
};
