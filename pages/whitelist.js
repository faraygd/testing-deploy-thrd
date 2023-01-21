import React, { useState } from "react";
import QRCode from "qrcode.react"; // Import the QR code library
import Web3 from "web3"; // Import web3.js
import { useEffect } from "react";
import { useContract } from "@thirdweb-dev/react";

const VerifyPage = () => {
  const [holderAddress, setHolderAddress] = useState("");
  const [nftId, setNftId] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Function to scan the QR code
  const scanQr = async data => {
    setQrScanned(true);
    // Extract the holder address and NFT ID from the QR code data
    const qrData = data.split(",");
    const scannedAddress = qrData[0];
    const scannedNftId = qrData[1];
    setHolderAddress(scannedAddress);
    setNftId(scannedNftId);
  };

  // Function to verify the holder's ownership of the NFT
  async function verifyHolder() {
    // Connect to the blockchain
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/fRLwo_JLm7TAesxddUJNJugHBo52YSnI")
    );
    // Get the NFT contract
    const nftContract = useContract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, "edition-drop");
    // Call the 'ownerOf' function to get the address that owns the NFT
    const owner = await nftContract.methods.ownerOf(nftId).call();
    // Compare the scanned address to the owner address
    if (owner.toLowerCase() === holderAddress.toLowerCase()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div>
      {qrScanned ? (
        <div>
          <p>Scanned Address: {holderAddress}</p>
          <p>Scanned NFT ID: {nftId}</p>
          <button onClick={verifyHolder}>Verify</button>
          {isValid ? <p>Holder NFT is valid</p> : <p>Holder NFT is not valid</p>}
        </div>
      ) : (
        <QRCode value={`${holderAddress},${nftId}`} onScan={scanQr} />
      )}
    </div>
  );
};

export default VerifyPage;