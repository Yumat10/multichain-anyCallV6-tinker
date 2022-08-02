import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6SenderEthereumRinkeby } from "../typechain-types"

type EthersError = {
    reason: unknown
    code: unknown
    transactionHash: unknown
    transaction: unknown
    receipt: unknown
}

async function main() {
    const { deployer } = await getNamedAccounts()
    const AnycallV6SenderEthereumRinkeby: AnycallV6SenderEthereumRinkeby =
        await ethers.getContract("AnycallV6SenderEthereumRinkeby", deployer)
    console.log("address: ", AnycallV6SenderEthereumRinkeby.address)

    const temp = (await AnycallV6SenderEthereumRinkeby.TEMP()).toString()

    console.log("temp is: ", temp)

    console.log("Calling initiateAnycallSimple...")
    const msg = "Hello Wordl from Rinkeby"
    // const gas = ethers.utils.parseUnits("0.001", "ether")
    // console.log("Fee sent: ", gas.toString())
    const txResponse =
        await AnycallV6SenderEthereumRinkeby.initiateAnycallSimple(msg)
    console.log("Anycall request sent...")
    try {
        await txResponse.wait(1)
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
