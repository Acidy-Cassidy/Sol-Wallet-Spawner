const web3 = require('@solana/web3.js');
const bs58 = require('bs58');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createNewWallet() {
    const newWallet = web3.Keypair.generate();
    return newWallet;
}

async function generateWallets(count) {
    let wallets = [];
    for (let i = 0; i < count; i++) {
        const wallet = await createNewWallet();
        wallets.push(wallet);
    }
    return wallets;
}

async function main() {
    rl.question('Enter the number of wallets to create: ', async (numWallets) => {
        const walletsCount = parseInt(numWallets);
        if (isNaN(walletsCount) || walletsCount <= 0) {
            console.log('Invalid number of wallets.');
            rl.close();
            return;
        }

        try {
            const wallets = await generateWallets(walletsCount);
            wallets.forEach((wallet, index) => {
                console.log(`Wallet ${index + 1}:`);
                console.log(`- Public Key: ${wallet.publicKey.toBase58()}`);
                console.log(`- Private Key: ${bs58.encode(wallet.secretKey)}`);
                console.log('-----------------------------------');
            });
        } catch (error) {
            console.error(error);
        } finally {
            rl.close();
        }
    });
}

main();
