import {useAddress, useContract, useMetamask, useCoinbaseWallet} from "@thirdweb-dev/react"


export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
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
      <button className='text-amber-200 font-bold' onClick={connectWithMetamask} >Connect Wallet</button>
      <button onClick={mintingNFT}>Minting NFT</button>
    </>
  )
}
