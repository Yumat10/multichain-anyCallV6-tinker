import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployAnycallV6SenderEthereumRinkeby: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (network.name !== "rinkeby") {
        log("Skipping - not deploying on Rinkeby...")
        return
    }

    log("---deployAnycallV6SenderEthereumRinkeby---")

    log("Deploying Rinkeby sender...")
    const args = [
        "0x273a4fFcEb31B8473D51051Ad2a2EdbB7Ac8Ce02", // Multichain Anycall Rinkeby contract address
        // "0xD7c295E399CA928A3a14b01D760E794f1AdF8990", // Multichain Anycall Fantom contract address
        "0x575D536b97987fD173259264dD539E618d8529E9", // Fantom receiver address
    ]
    const AnycallV6SenderEthereumRinkeby = await deploy(
        "AnycallV6SenderEthereumRinkeby",
        {
            from: deployer,
            args,
            log: true,
            waitConfirmations: 1,
        }
    )

    log("Deployed Rinkeby sender to ", AnycallV6SenderEthereumRinkeby.address)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     console.log("Verifying...")
    //     await verify(AnycallV6SenderEthereumRinkeby.address, args)
    //     log("-------------------------------")
    // }
}

export default deployAnycallV6SenderEthereumRinkeby
deployAnycallV6SenderEthereumRinkeby.tags = ["all", "rinkeby"]
