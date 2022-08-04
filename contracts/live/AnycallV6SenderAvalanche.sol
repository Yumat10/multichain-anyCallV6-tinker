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

error AnycallV6SenderAvalanche_NotOwner();

contract AnycallV6SenderAvalanche {
    // Multichain anycall contract on Avalanche
    address private anycall_contract_Avalanche;

    address private immutable OWNER_ADDRESS;

    // Destination (receiver) contract on Polygon
    address private receiver_contract_polygon;

    event NewMsgRequest(string msg, address destination);

    modifier onlyOwner() {
        if (msg.sender != OWNER_ADDRESS) {
            revert AnycallV6SenderAvalanche_NotOwner();
        }
        _;
    }

    constructor(
        address _anycall_contract_Avalanche,
        address _receiver_contract_polygon
    ) {
        OWNER_ADDRESS = msg.sender;
        anycall_contract_Avalanche = _anycall_contract_Avalanche;
        receiver_contract_polygon = _receiver_contract_polygon;
    }

    function initiateAnycallSimple(string calldata _msg) external onlyOwner {
        emit NewMsgRequest(_msg, receiver_contract_polygon);

        CallProxy anyCallProxy = CallProxy(anycall_contract_Avalanche);

        anyCallProxy.anyCall(
            receiver_contract_polygon,
            abi.encode(_msg),
            address(0), // Placeholder fallback
            137, // Polygon chain ID
            0 // Fee paid on destination chain (Polygon)
        );
    }

    function setAnyCallContractAvalanche(address _new_contract_address)
        external
        onlyOwner
    {
        anycall_contract_Avalanche = _new_contract_address;
    }

    function setReceiverContractPolygon(address _new_contract_address)
        external
        onlyOwner
    {
        receiver_contract_polygon = _new_contract_address;
    }
}
