import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../../helper-hardhat-config"
import verify from "../../utils/verify"

// Deployed to 0x00ac07eddeeCF343Ce659219bC6d846d6f5D2f75

const deployAnycallV6ReceiverPolygon: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---deployAnycallV6ReceiverPolygon---")

    if (network.name !== "polygon") {
        log("Skipping - not deploying on polygon...")
        return
    }

    log("deployer: ", deployer)

    const args: string[] = []

    log("Deploying Polygon receiver...")
    const AnycallV6ReceiverPolygon = await deploy("AnycallV6ReceiverPolygon", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: 1,
    })

    log("Deployed Polygon receiver to ", AnycallV6ReceiverPolygon.address)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        console.log("Verifying...")
        await verify(AnycallV6ReceiverPolygon.address, args)
        log("-------------------------------")
    }
}

export default deployAnycallV6ReceiverPolygon
deployAnycallV6ReceiverPolygon.tags = ["all", "polygon"]
