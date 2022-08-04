import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import "solidity-coverage"
import { HardhatUserConfig } from "hardhat/types"

// Ethereum
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby"
// Polygon
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "https://polygon"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon"
// Avalanche
const AVALANCHE_RPC_URL = process.env.AVALANCHE_RPC_URL || "https://avalanche"
const FUJI_RPC_URL = process.env.FUJI_RPC_URL || "https://avalanche"

const PROD_PRIVATE_KEY = process.env.PROD_PRIVATE_KEY || "0xkey"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const FANTOM_MNEMONIC = process.env.FANTOM_MNEMONIC || "mnemonic"
const HH_0_PRIVATE_KEY = process.env.HH_0_PRIVATE_KEY || "0xkey"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.10",
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        rinkeby: {
            chainId: 4,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        fantomtest: {
            chainId: 4002,
            url: "https://rpc.testnet.fantom.network",
            accounts: [PRIVATE_KEY],
            live: false,
            saveDeployments: true,
            gasMultiplier: 2,
        },
        polygon: {
            chainId: 137,
            url: POLYGON_RPC_URL,
            accounts: [PROD_PRIVATE_KEY],
        },
        // Polygon testnet
        mumbai: {
            chainId: 80001,
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY, HH_0_PRIVATE_KEY],
        },
        avalanche: {
            chainId: 43114,
            url: AVALANCHE_RPC_URL,
            accounts: [PROD_PRIVATE_KEY],
        },
        fuji: {
            chainId: 43113,
            url: FUJI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    mocha: {
        timeout: 300 * 1000,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}

export default config
