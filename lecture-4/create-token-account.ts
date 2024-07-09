import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const user = getKeypairFromEnvironment("SECRET_KEY")

const tokenMintPubKey = new PublicKey("CapkWiQJypatEjAEgXjM9rY57gHBbD7EWEngXumow9Su")

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    user,
    tokenMintPubKey,
    user.publicKey
)

console.log("Token account address: ", tokenAccount.address.toBase58())

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet")
console.log(`Created Token Account ${link}`)
                                                
// 7xwnph4Yfo2i3GDMw2QcvVPd4ReCekF5PkgSW47uZZXy
