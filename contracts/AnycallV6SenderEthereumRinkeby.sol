// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface CallProxy {
    function anyCall(
        address _to,
        bytes calldata _data,
        address _fallback,
        uint256 _toChainID,
        uint256 _flags
    ) external;
}

contract AnycallV6SenderEthereumRinkeby {
    // Multichain anycall contract on Rinkeby
    address private immutable ANYCALL_CONTRACT_RINKEBY;

    address private immutable OWNER_ADDRESS;

    // Destination contract on Fantom testnet
    address private immutable RECEIVER_CONTRACT_FANTOM;

    uint256 public constant TEMP = 51;

    event NewMsgRequest(string msg);

    constructor(
        address _anycall_contract_rinkeby,
        address _receiver_contract_fantom
    ) {
        OWNER_ADDRESS = msg.sender;
        ANYCALL_CONTRACT_RINKEBY = _anycall_contract_rinkeby;
        RECEIVER_CONTRACT_FANTOM = _receiver_contract_fantom;
    }

    function initiateAnycallSimple(string calldata _msg) external {
        emit NewMsgRequest(_msg);

        require(msg.sender == OWNER_ADDRESS, "Only owner can call anycall");

        CallProxy callProxy = CallProxy(ANYCALL_CONTRACT_RINKEBY);

        callProxy.anyCall(
            RECEIVER_CONTRACT_FANTOM,
            abi.encode(_msg),
            address(0), // Placeholder fallback
            4002, // Fantom testnet chain ID
            0 // Fee paid on destination chain (Fantom)
        );
    }
}
