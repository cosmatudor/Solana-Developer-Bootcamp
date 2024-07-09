import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const tokenMintPubKey = new PublicKey("CapkWiQJypatEjAEgXjM9rY57gHBbD7EWEngXumow9Su")

// source 
const user = getKeypairFromEnvironment("SECRET_KEY")
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintPubKey,
    user.publicKey
)

// destination
const recipient = new PublicKey("8fryW4Zm9MsqN6nXyW6PvbbrjnrWSXaAd3S55zVagb6y")
const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintPubKey,
    recipient
)

const txn = await transfer(
    connection,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    200 * 10 ** 9
)

const link = getExplorerLink("transaction", txn, "devnet")
console.log(`✅Successful Transfer! Check it here: ${link}`)
