import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemInstruction, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log(sender.publicKey.toBase58())

const receiver = new PublicKey("78GrhiJ38yQNmhUxEXCRUZvP4LZbz4y31SFiUC4TjSVA");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

const balanceSender = await connection.getBalance(sender.publicKey)
const balanceReceiver = await connection.getBalance(receiver)
console.log(`Sender's balance is ${balanceSender / LAMPORTS_PER_SOL} SOL`)
console.log(`Receiver's balance is ${balanceReceiver / LAMPORTS_PER_SOL} SOL`)
console.log("---------------------------")

const txn = new Transaction()
const instruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.2 * LAMPORTS_PER_SOL
});
txn.add(instruction)

const instruction2 = createMemoInstruction("Mersi de KFC!")
txn.add(instruction2)

const signature = await sendAndConfirmTransaction(connection, txn, [sender]);
console.log(`✅ Transaction confirmed. Signature: ${signature}`)



