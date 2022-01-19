import React, { useState } from 'react';

type WalletProviderProps = {
  children: React.ReactNode;
};

type Wallet = {
  address: string;
  balance: string;
  privateKey: string;
  publicKey: string;
  stakingAddress: string;
} | null;

export const WalletProviderContext = React.createContext<{
  wallet: Wallet | null | undefined;
  setWallet: (wallet: Wallet) => void;
} | null>(null);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<Wallet>(null);
  return (
    <WalletProviderContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletProviderContext.Provider>
  );
};
