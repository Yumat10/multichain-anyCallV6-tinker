import { run } from "hardhat"

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Contract verified...")
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(error)
        }
    }
}

export default verify
