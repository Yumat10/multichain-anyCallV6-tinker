import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../../helper-hardhat-config"
import verify from "../../utils/verify"

const deployAnycallV6SenderFuji: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (network.name !== "fuji") {
        log("Skipping - not deploying on Fuji...")
        return
    }

    log("---deployAnycallV6SenderFuji---")

    log("Deploying Fuji sender...")
    const args = [
        "0xC10Ef9F491C9B59f936957026020C321651ac078", // Placeholder address
        "0x371b039D798D17cCe6B0c0C5B9Ed0E0a70d6aB2C", // Placeholder address
    ]
    const AnycallV6SenderFuji = await deploy("AnycallV6SenderAvalanche", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: 1,
    })

    log("Deployed Fuji sender to ", AnycallV6SenderFuji.address)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     console.log("Verifying...")
    //     await verify(AnycallV6SenderFuji.address, args)
    //     log("-------------------------------")
    // }
}

export default deployAnycallV6SenderFuji
deployAnycallV6SenderFuji.tags = ["all", "fuji"]
