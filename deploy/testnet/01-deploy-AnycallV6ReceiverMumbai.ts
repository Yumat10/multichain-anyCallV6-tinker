import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

// Deployed to 0x575D536b97987fD173259264dD539E618d8529E9

const deployAnycallV6ReceiverMumbai: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---deployAnycallV6ReceiverMumbai---")

    if (network.name !== "mumbai") {
        log("Skipping - not deploying on mumbai testnet...")
        return
    }

    log("deployer: ", deployer)

    log("Deploying Mumbai receiver...")
    const AnycallV6ReceiverPolygon = await deploy("AnycallV6ReceiverPolygon", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })

    log("Deployed Mumbai receiver to ", AnycallV6ReceiverPolygon.address)
}

export default deployAnycallV6ReceiverMumbai
deployAnycallV6ReceiverMumbai.tags = ["all", "mumbai"]
