import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../../helper-hardhat-config"
import verify from "../../utils/verify"

const deployAnycallV6SenderAvalanche: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (network.name !== "avalanche") {
        log("Skipping - not deploying on Avalanche...")
        return
    }

    log("---deployAnycallV6SenderAvalanche---")

    log("Deploying Avalanche sender...")
    const args = [
        "0xC10Ef9F491C9B59f936957026020C321651ac078", // Multichain Anycall Avalanche contract address
        "0x343D4CC938769F1E7Cd77A2C4855b9823133Fd4e", // Polygon receiver address
    ]
    const AnycallV6SenderAvalanche = await deploy("AnycallV6SenderAvalanche", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: 1,
    })

    log("Deployed Avalanche sender to ", AnycallV6SenderAvalanche.address)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        console.log("Verifying...")
        await verify(AnycallV6SenderAvalanche.address, args)
        log("-------------------------------")
    }
}

export default deployAnycallV6SenderAvalanche
deployAnycallV6SenderAvalanche.tags = ["all", "avalanche"]
