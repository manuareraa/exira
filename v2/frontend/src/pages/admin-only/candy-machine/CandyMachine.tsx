import React from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplCandyMachine,
  create,
  fetchCandyMachine,
  fetchCandyGuard,
  mintLimitGuardManifest,
} from "@metaplex-foundation/mpl-candy-machine";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  generateSigner,
  transactionBuilder,
  percentAmount,
  createGenericFile,
  publicKey,
  some,
  none,
  sol,
  dateTime,
} from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

function CandyMachine(props) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const umi = createUmi(connection)
    .use(walletAdapterIdentity(wallet))
    // this is for minting programmable NFTs
    .use(mplTokenMetadata());

  const createCandyMachine = async () => {
    const collectionAddress = "DSHGeyFApgxCmVZbmcMfW3PVjt6X4tWxTJtbajrR7qbH";
    const myCustomAuthority = generateSigner(umi);
    console.log("UMI: ", umi.identity.publicKey);
    console.log("Candy Machine Authority: ", myCustomAuthority);
    const candyMachineSettings = {
      authority: myCustomAuthority,
      tokenStandard: TokenStandard.ProgrammableNonFungibleEdition,
      sellerFeeBasisPoints: percentAmount(500),
      symbol: "EXtCM1",
      maxEditionSupply: 5,
      isMutable: true,
      creators: [
        {
          address: umi.identity.publicKey,
          percentageShare: 100,
          verified: true,
        },
      ],
      collectionMint: collectionAddress,
      collectionUpdateAuthority: umi.identity,
      itemsAvailable: 5, // or 1000
      hiddenSettings: none(),
      configLineSettings: some({
        // prefixName: "exPNFTtv2prop1P1",
        prefixName: "testCollp",
        nameLength: 0,
        prefixUri: "https://arweave.net/",
        uriLength: 43,
        isSequential: false,
      }),
      guards: {
        // id is just a unique identifier and limit is the maximum number of mints per address
        mintLimit: some({ id: 1, limit: 20 }),
        botTax: some({ lamports: sol(0.01), lastInstruction: true }),
        solPayment: some({
          lamports: sol(1.5),
          destination: umi.identity.publicKey,
        }),
        // startDate: some({ date: dateTime("2023-04-04T16:00:00Z") }),
      },
    };
    console.log("Creating Candy Machine....");
    const candyMachine = await create(umi, candyMachineSettings);
    console.log("candyMachine", candyMachine);
  };

  const fetchCandyMachineData = async () => {
    console.log("fetching candy machine data");
    const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
    const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    console.log("candyMachine", candyMachine);
    console.log("candyGuard", candyGuard);
  };

  return (
    <div className="flex flex-col items-start justify-center px-48 mt-20">
      This is Candy Machine
      <button className="mt-16 btn btn-primary" onClick={createCandyMachine}>
        Create Candy Machine
      </button>
    </div>
  );
}

export default CandyMachine;
