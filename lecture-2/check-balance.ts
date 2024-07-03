import "dotenv/config";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet!");
console.log("RPC URL: ", connection.rpcEndpoint)

const keypair = getKeypairFromEnvironment("SECRET_KEY")
const privateKey = bs58.encode(keypair.secretKey);
console.log("Private key: ", privateKey)

const address = "FXDiG257APviGtU1uXS1vvUNEZPHni6ZzM5d4PakdLJV"
const publicKey = new PublicKey(address)
console.log(publicKey.toBase58())

// await airdropIfRequired(connection, publicKey, 2 * LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL);

const balanceInLamport = await connection.getBalance(publicKey);

console.log(`Balance for wallet ${publicKey} is ${balanceInLamport}`);
console.log(`SOL balance is ${balanceInLamport / LAMPORTS_PER_SOL}`)
