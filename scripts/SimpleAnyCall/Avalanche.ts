import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6SenderAvalanche } from "../../typechain-types/live/AnycallV6SenderAvalanche.sol/AnycallV6SenderAvalanche"

type EthersError = {
    reason: unknown
    code: unknown
    transactionHash: unknown
    transaction: unknown
    receipt: unknown
}

async function main() {
    const { deployer } = await getNamedAccounts()
    const AnycallV6SenderAvalanche: AnycallV6SenderAvalanche =
        await ethers.getContract("AnycallV6SenderAvalanche", deployer)
    console.log("Signer: ", deployer)
    console.log("Contract address: ", AnycallV6SenderAvalanche.address)

    console.log("Calling initiateAnycallSimple...")
    const msg = "Hello Wordl from Avalanche"
    const txResponse = await AnycallV6SenderAvalanche.initiateAnycallSimple(msg)
    console.log("Anycall request sent...")
    try {
        await txResponse.wait(3)
        console.log("Msg confirmed!")
    } catch (err) {
        const error = err as EthersError
        console.log(err)
        console.log("------------")
        console.log("Error code: ", error.code)
        console.log("Error reason...")
        console.log(error.reason)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
