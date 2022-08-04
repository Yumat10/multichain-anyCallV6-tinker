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

    function executor() external view returns (address);
}

interface IAnycallExecutor {
    function context()
        external
        returns (
            address from,
            uint256 fromChainID,
            uint256 nonce
        );
}

contract AnycallV6SenderEthereumRinkeby {
    // Multichain anycall contract on Rinkeby
    address private immutable ANYCALL_CONTRACT_RINKEBY;

    address private immutable OWNER_ADDRESS;

    // Destination contract on Fantom testnet
    address private immutable RECEIVER_CONTRACT_FANTOM;

    uint256 public constant TEMP = 51;

    event NewMsgRequest(string msg);
    event AnycallRequest(
        address indexed anycallContract,
        address indexed _to,
        bytes _data,
        address _fallback,
        uint256 _toChainID,
        uint256 _flags
    );
    event Fallbackmsg(string msg);

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

        emit AnycallRequest(
            ANYCALL_CONTRACT_RINKEBY,
            RECEIVER_CONTRACT_FANTOM,
            abi.encode(_msg),
            address(0),
            4002,
            0
        );

        callProxy.anyCall(
            RECEIVER_CONTRACT_FANTOM,
            abi.encode(_msg),
            address(0), // Placeholder fallback
            4002, // Fantom testnet chain ID
            0 // Fee paid on destination chain (Fantom)
        );
    }

    function anyFallback(address to, bytes calldata data) external {
        // require(msg.sender == address(this), "AnycallClient: Must call from within this contract");
        // require(bytes4(data[:4]) == this.anyExecute.selector, "AnycallClient: wrong fallback data");

        address executor = CallProxy(ANYCALL_CONTRACT_RINKEBY).executor();
        (address _from, , ) = IAnycallExecutor(executor).context();
        // require(_from == address(this), "AnycallClient: wrong context");

        string memory message = abi.decode(data[4:], (string));

        // require(peeraddress == to, "AnycallClient: mismatch dest client");

        emit Fallbackmsg(message);
    }
}
