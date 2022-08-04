import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6ReceiverPolygon } from "../../typechain-types"

type EthersError = {
    reason: unknown
    code: unknown
    transactionHash: unknown
    transaction: unknown
    receipt: unknown
}

async function main() {
    const { deployer } = await getNamedAccounts()

    const AnycallV6ReceiverPolygon: AnycallV6ReceiverPolygon =
        await ethers.getContract("AnycallV6ReceiverPolygon", deployer)

    console.log("address: ", AnycallV6ReceiverPolygon.address)

    console.log("Calling deposit...")
    const txResponse = await AnycallV6ReceiverPolygon.deposit({
        value: ethers.utils.parseEther("5"),
    })
    console.log("Deposit request sent...")
    try {
        await txResponse.wait(1)
        console.log("deposit confirmed!")
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
