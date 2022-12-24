import {useAddress, useContract, useMetamask, useCoinbaseWallet} from "@thirdweb-dev/react"


export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const coinbaseWallet = useCoinbaseWallet();
  const { contract : editionDrop, isLoading, isError} = useContract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,"edition-drop"
  );
  console.log({contract : editionDrop});

  const mintingNFT = async() => {
    const tx = await editionDrop.erc1155.claimTo(address, 2 , 1 );
  }
  // Condition
  // if(isLoading) {}
  //if(isError){}
  return (
    <>
      <div className="flex text-center justify-center my-20">
        <button className='font-bold border-line bg-red-300 w-40 h-10' onClick={connectWithMetamask} >Connect Wallet</button>
      <br></br>
        <button className='font-bold border-line bg-red-300 w-50 h-10 ml-20' onClick={coinbaseWallet}>Connect with Coinbase</button>
      <br></br>
        <button className='font-bold border-line bg-red-300 w-40 h-10 ml-20'onClick={mintingNFT}>Minting NFT</button>
      </div>

    </>
  )
}
