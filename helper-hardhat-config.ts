import { ethers } from "ethers"

export interface networkConfigItem {
    name?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    4: {
        name: "rinkeby",
        blockConfirmations: 6,
    },
    31337: {
        name: "hardhat",
    },
    4002: {
        name: "fantomtest",
    },
}

export const developmentChains = ["hardhat", "localhost"]
