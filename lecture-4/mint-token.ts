import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const user = getKeypairFromEnvironment("SECRET_KEY")
const tokenMintPubKey = new PublicKey("CapkWiQJypatEjAEgXjM9rY57gHBbD7EWEngXumow9Su")
const tokenAccountPubKey = new PublicKey("7xwnph4Yfo2i3GDMw2QcvVPd4ReCekF5PkgSW47uZZXy")

const txSign = await mintTo(
    connection,
    user,
    tokenMintPubKey,
    tokenAccountPubKey,
    user, 
    1000 * 10 ** 9, 
)

const link = getExplorerLink("transaction", txSign, "devnet")
console.log(`✅Successful Minting Transaction! Check it here: ${link}`)