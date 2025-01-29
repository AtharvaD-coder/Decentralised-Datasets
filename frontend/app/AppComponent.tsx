'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider, darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'project',
    projectId: process.env.NEXT_PUBLIC_PROJID_KEY!,
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  });

const queryClient = new QueryClient();

export const AppComponent = ({ children }: { children: React.ReactNode })=>{
    return(
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}  >
              <div className='relative'>
                <main>
                  <div className='absolute top-4 right-4 z-10'>

                  <ConnectButton/>
                  </div>
                  {children}
                  </main>
                </div>
            </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
  