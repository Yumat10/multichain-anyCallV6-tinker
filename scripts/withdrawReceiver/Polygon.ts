import { ethers, getNamedAccounts } from "hardhat"
import { AnycallV6ReceiverPolygon } from "../../typechain-types"

async function main() {
    const { deployer } = await getNamedAccounts()

    console.log("deployer: ", deployer)

    const AnycallV6ReceiverPolygon: AnycallV6ReceiverPolygon =
        await ethers.getContract("AnycallV6ReceiverPolygon", deployer)

    console.log("address: ", AnycallV6ReceiverPolygon.address)

    console.log("Calling withdraw...")
    const txResponse = await AnycallV6ReceiverPolygon.withdraw()
    console.log("Withdraw request sent...")
    try {
        await txResponse.wait(1)
        console.log("withdraw confirmed!")
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
