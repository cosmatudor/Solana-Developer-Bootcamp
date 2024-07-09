import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const user = getKeypairFromEnvironment("SECRET_KEY")

console.log("Connected!")

const tokenMint = await createMint(connection, user, user.publicKey, null, 9)
const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`Token Mint: ${link}`)

// CapkWiQJypatEjAEgXjM9rY57gHBbD7EWEngXumow9Su