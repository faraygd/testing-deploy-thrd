import { ThirdwebProvider , ChainId} from '@thirdweb-dev/react'
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
