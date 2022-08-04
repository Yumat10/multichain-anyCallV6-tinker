import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6SenderAvalanche } from "../../typechain-types/live/AnycallV6SenderAvalanche.sol/AnycallV6SenderAvalanche"

async function main() {
    const { deployer } = await getNamedAccounts()

    const AnycallV6SenderAvalanche: AnycallV6SenderAvalanche =
        await ethers.getContract("AnycallV6SenderAvalanche", deployer)

    const newPolygonContractAddress =
        "0x343D4CC938769F1E7Cd77A2C4855b9823133Fd4e"
    const txResponse =
        await AnycallV6SenderAvalanche.setReceiverContractPolygon(
            newPolygonContractAddress
        )

    try {
        await txResponse.wait(3)
        console.log("Contract address confirmed!")
    } catch (error) {
        console.log(error)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
