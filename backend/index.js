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
  sol,
} = require("@metaplex-foundation/umi");
const { base58 } = require("@metaplex-foundation/umi/serializers");
const {
  walletAdapterIdentity,
} = require("@metaplex-foundation/umi-signer-wallet-adapters");
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const { mplTokenMetadata } = require("@metaplex-foundation/mpl-token-metadata");
const bs58 = require("bs58");
const cors = require("cors");
const {
  transferSol,
  findAssociatedTokenPda,
  transferTokens,
  createTokenIfMissing,
} = require("@metaplex-foundation/mpl-toolbox");
const https = require("https");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Load the self-signed certificate and private key
const privateKey = fs.readFileSync("./selfsigned.key", "utf8");
const certificate = fs.readFileSync("./selfsigned.crt", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Setup connection and UMI with identity
const connection = new Connection(
  "https://aged-soft-brook.solana-devnet.quiknode.pro/0c543ce79041ea51479a8e6722d56474da57db2a"
); // Replace with mainnet URL if necessary
const umi = createUmi(connection).use(mplTokenMetadata());

// address used here
const address = "J6GT31oStsR1pns4t6P7fs3ARFNo9DCoYjANuNJVDyvN";

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

// endpoint for SOL transfer to provided address - endpoint  /sol-drop
app.post("/sol-drop", async (req, res) => {
  try {
    const amount = sol(0.001);
    const { destination } = req.body;

    console.log(`Destination: ${destination}`);
    console.log(`Amount: ${amount}`);
    console.log(`UMI: ${umi.identity.publicKey}`);

    // Transfer SOL to the destination address
    const response = await transferSol(umi, {
      source: umi.identity,
      destination,
      amount,
    }).sendAndConfirm(umi);

    console.log("SOL Transfer Response: ", response);

    // Return success response
    res.status(200).json({
      success: true,
      message: "SOL transferred successfully",
      response,
    });
  } catch (error) {
    console.error("Error in transferring SOL: ", error);

    // Return error response
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// endpoint for USDC transfer to provided address - endpoint  /usdc-drop
// const receiveUSDC = async () => {
//   const account = "ATDdKNMSCeyiv1oooyPMq6GfMkvAwn5HwhFFsKgASCzN";
//   const mint = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
//   const mintAuthority = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
//   const tokenProgram = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
//   const toAddress = "Ez1Y8ygX8TRwCbDEnu3r24hrjuDvxxy6qc15EKQgPvD5";

//   // this code basically predicts the PDA for the sender and receiver
//   const fromPDA = findAssociatedTokenPda(umi, {
//     owner: umi.identity.publicKey,
//     mint: mint,
//   });

//   console.log("From Token Account: ", fromPDA);

//   const toPDA = findAssociatedTokenPda(umi, {
//     owner: toAddress,
//     mint: mint,
//   });

//   console.log("To Token Account: ", toPDA);

//   const tokenAccountResponse = await transactionBuilder()
//     // this is creating PDA for the sender, which is someone else. usually this will be someone who is holder of the USDC in mainnet, so we can say they already have the PDA. But this is for testing, so we are creating it
//     .add(
//       createTokenIfMissing(umi, {
//         mint,
//         owner: umi.identity.publicKey,
//         tokenProgram: tokenProgram,
//       })
//     )
//     // this is creating PDA for the receiver, which is we. So, we don't need to create it becuase we already have it
//     // but this is for testing, so we are creating it
//     .add(
//       createTokenIfMissing(umi, {
//         mint,
//         owner: toAddress,
//         tokenProgram: tokenProgram,
//       })
//     )
//     .add(
//       transferTokens(umi, {
//         source: fromPDA,
//         destination: toPDA,
//         // authority: ownerOrDelegate,
//         amount: 30000000,
//       })
//     )
//     .sendAndConfirm(umi);

//   console.log("To Token Account: ", tokenAccountResponse);
// };

// Start the server
app.post("/usdc-drop", async (req, res) => {
  try {
    // https://explorer.solana.com/tx/4R5uH55YBHdb5H9t7mUMDmBFye9fMEeNBG1HSk8SwMyxwmuL72xbk4hE94XKen2TemYRr2N8t1ckXstJgNXJLRrC?cluster=devnet
    // const account = "ATDdKNMSCeyiv1oooyPMq6GfMkvAwn5HwhFFsKgASCzN";
    // const mint = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
    // const mintAuthority = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";
    // const tokenProgram = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

    // https://explorer.solana.com/tx/aZMqzbnDJTtSWXrZNuj35xdD7gkoYSQNMyJvMoW4XkjmHQFgakv1HymJBa2vPhup4dhgdt5qvArQFqturD2DcBh?cluster=devnet
    const tokenProgram = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
    const account = "5cCcrvi3Qx8XQeQE8wkDmjCE9ZTaL3KN4vX3yF5DCCG4";
    const mint = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";

    const { toAddress } = req.body;

    // this code basically predicts the PDA for the sender and receiver
    const fromPDA = findAssociatedTokenPda(umi, {
      owner: umi.identity.publicKey,
      mint: mint,
    });

    console.log("From Token Account PDA: ", fromPDA);

    const toPDA = findAssociatedTokenPda(umi, {
      owner: toAddress,
      mint: mint,
    });

    console.log("To Token Account PDA: ", toPDA);

    const tokenAccountResponse = await transactionBuilder()
      // this is creating PDA for the sender, which is someone else. usually this will be someone who is holder of the USDC in mainnet, so we can say they already have the PDA. But this is for testing, so we are creating it
      // .add(
      //   createTokenIfMissing(umi, {
      //     mint,
      //     owner: umi.identity.publicKey,
      //     tokenProgram: tokenProgram,
      //   })
      // )
      // this is creating PDA for the receiver, which is we. So, we don't need to create it becuase we already have it
      // but this is for testing, so we are creating it
      .add(
        createTokenIfMissing(umi, {
          mint,
          owner: toAddress,
          tokenProgram: tokenProgram,
        })
      )
      .add(
        transferTokens(umi, {
          source: fromPDA,
          destination: toPDA,
          // authority: ownerOrDelegate,
          amount: 1000000000, // 1000 USDC
        })
      )
      .sendAndConfirm(umi);

    console.log("To Token Account: ", tokenAccountResponse);

    // Return success response
    res.status(200).json({
      success: true,
      message: "USDC transferred successfully",
      tokenAccountResponse,
    });
  } catch (error) {
    console.error("Error in transferring USDC: ", error);

    // Return error response
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// app.listen(port, "::", () => {
//   console.log(
//     `Server running on port ${port}, listening on both IPv4 and IPv6`
//   );
// });

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
  console.log("HTTPS Server running on port 3000");
});
