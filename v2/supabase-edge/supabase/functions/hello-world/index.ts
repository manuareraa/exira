import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  printV1,
  fetchMasterEditionFromSeeds,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { Connection, PublicKey } from "@solana/web3.js";

console.log("Edge function to print PNFT Edition");

// The main function that the edge server will call
Deno.serve(async (req) => {
  try {
    // Parse request body
    const { masterEditionMint, editionOwnerPublicKey } = await req.json();
    console.log(`Master Edition Mint: ${masterEditionMint}`);
    console.log(`Edition Owner PublicKey: ${editionOwnerPublicKey}`);

    // Setup connection and UMI with identity
    const connection = new Connection("https://api.devnet.solana.com"); // Replace with the correct network
    const umi = createUmi(connection).use(walletAdapterIdentity());

    // Fetch the master edition account
    const masterEdition = await fetchMasterEditionFromSeeds(umi, {
      mint: masterEditionMint,
    });
    console.log("Fetched Master Edition: ", masterEdition);

    // Generate new edition mint signer
    const editionMint = generateSigner(umi);
    console.log("Edition Mint: ", editionMint);

    // Print the new edition
    const response = await printV1(umi, {
      masterTokenAccountOwner: new PublicKey(editionOwnerPublicKey), // Set token account owner
      masterEditionMint, // Pass the master edition mint
      editionMint, // The new mint for the edition
      editionTokenAccountOwner: new PublicKey(editionOwnerPublicKey), // The owner of the new edition
      editionNumber: masterEdition.supply + 1n, // Increment the edition number
      tokenStandard: TokenStandard.ProgrammableNonFungible, // Use the PNFT standard
    }).sendAndConfirm(umi);

    console.log("Print PNFT Edition Response: ", response);
    const signature = base58.deserialize(response.signature)[0];

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "PNFT Edition printed",
        signature,
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in printing PNFT Edition: ", error);

    // Return error response
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
