import { AbiCoder } from "@ethersproject/abi"
import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6ReceiverFantom } from "../typechain-types"

type EthersError = {
    reason: unknown
    code: unknown
    transactionHash: unknown
    transaction: unknown
    receipt: unknown
}

async function main() {
    const { deployer } = await getNamedAccounts()
    const AnycallV6ReceiverFantom: AnycallV6ReceiverFantom =
        await ethers.getContract("AnycallV6ReceiverFantom", deployer)
    console.log("address: ", AnycallV6ReceiverFantom.address)

    console.log("Calling anyExecute...")

    const msg = new AbiCoder().encode(["string"], ["Sample _msg"])
    const txReceipt = await AnycallV6ReceiverFantom.anyExecute(msg)
    await txReceipt.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
