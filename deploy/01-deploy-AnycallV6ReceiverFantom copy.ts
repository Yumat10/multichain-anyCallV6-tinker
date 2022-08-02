import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

// Deployed to 0x575D536b97987fD173259264dD539E618d8529E9

const deployAnycallV6ReceiverFantom: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---deployAnycallV6ReceiverFantom---")

    if (network.name !== "fantomtest") {
        log("Skipping - not deploying on fantomtest...")
        return
    }

    log("Deploying Fantom receiver...")
    const AnycallV6ReceiverFantom = await deploy("AnycallV6ReceiverFantom", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })

    log("Deployed Fantom receiver to ", AnycallV6ReceiverFantom.address)
}

export default deployAnycallV6ReceiverFantom
deployAnycallV6ReceiverFantom.tags = ["all", "fantom"]
