const express = require("express");
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const {
  printV1,
  fetchMasterEditionFromSeeds,
  TokenStandard,
} = require("@metaplex-foundation/mpl-token-metadata");
const {
  generateSigner,
  keypairIdentity,
  transactionBuilder,
} = require("@metaplex-foundation/umi");
const { base58 } = require("@metaplex-foundation/umi/serializers");
const {
  walletAdapterIdentity,
} = require("@metaplex-foundation/umi-signer-wallet-adapters");
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const { mplTokenMetadata } = require("@metaplex-foundation/mpl-token-metadata");
const bs58 = require("bs58");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Setup connection and UMI with identity
const connection = new Connection(
  "https://aged-soft-brook.solana-devnet.quiknode.pro/0c543ce79041ea51479a8e6722d56474da57db2a"
); // Replace with mainnet URL if necessary
const umi = createUmi(connection).use(mplTokenMetadata());

const a2PKey =
  "67ntqFiD44RjsKbFGUwh3gQwgsP3y9ANS4dAegyYC4WUQGcbbWwfKMsXvLoSpXxR43qoh8SHutRvKkNXC3p2JiSc";
const a1PKey =
  "4ciGA36faeNiPRghC4orxhPDh3GcFx9BnMHHT9gFZfR7btyr9kMFqrDgNEP8XE28ta5AkucCS2LUGzUaW3udeNge";

const keypair = Keypair.fromSecretKey(bs58.default.decode(a1PKey));

umi.use(keypairIdentity(keypair));

// console.log("Keypair: ", keypair);
console.log("UMI: ", umi.identity.publicKey);
console.log("UMI: ", new PublicKey(umi.identity.publicKey).toBase58());

// Function to print PNFT Edition
app.post("/print-pnft-edition", async (req, res) => {
  try {
    const { masterEditionMint, editionOwnerPublicKey, quantity } = req.body;

    console.log(`Master Edition Mint: ${masterEditionMint}`);
    console.log(`Edition Owner PublicKey: ${editionOwnerPublicKey}`);

    // Fetch the master edition account
    const masterEdition = await fetchMasterEditionFromSeeds(umi, {
      mint: masterEditionMint,
    });

    console.log("Fetched Master Edition: ", masterEdition);

    let builder = transactionBuilder();

    // run for loop with quantity
    for (let i = 0; i < quantity; i++) {
      // Generate new edition mint signer
      const editionMint = generateSigner(umi);
      console.log("Edition Mint: ", editionMint);
      const printerBuilder = printV1(umi, {
        masterTokenAccountOwner: "J6GT31oStsR1pns4t6P7fs3ARFNo9DCoYjANuNJVDyvN", // Set token account owner
        masterEditionMint, // Pass the master edition mint
        editionMint, // The new mint for the edition
        editionTokenAccountOwner: editionOwnerPublicKey, // The owner of the new edition
        // Increment the edition number
        // supply: 3n
        editionNumber: parseInt(masterEdition.supply) + i + 1,
        tokenStandard: TokenStandard.ProgrammableNonFungible, // Use the PNFT standard
      });
      builder = builder.add(printerBuilder);
    }

    // Sign and send the transaction
    const response = await builder.sendAndConfirm(umi);

    console.log("Print PNFT Edition Response: ", response);
    const signature = base58.deserialize(response.signature)[0];

    // Return success response
    res.status(200).json({
      success: true,
      message: "PNFT Edition printed successfully",
      signature,
    });
  } catch (error) {
    console.error("Error in printing PNFT Edition: ", error);

    // Return error response
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, '::', () => {
  console.log(`Server running on port ${port}, listening on both IPv4 and IPv6`);
});

