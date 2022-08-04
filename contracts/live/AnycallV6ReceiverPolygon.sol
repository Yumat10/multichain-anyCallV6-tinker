// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

error AnycallV6ReceiverPolygon_NotOwner();
error AnycallV6ReceiverPolygon_WithdrawCallFailure();

contract AnycallV6ReceiverPolygon {
    address private immutable OWNER_ADDRESS;

    event NewMsg(string msg);
    event Funded(uint256 value);
    event Fallbackmsg(string msg, address to);

    constructor() {
        OWNER_ADDRESS = msg.sender;
    }

    function deposit() public payable {
        emit Funded(msg.value);
    }

    // FOR TESTING PURPOSES ONLY
    function withdraw() public {
        if (msg.sender != OWNER_ADDRESS) {
            revert AnycallV6ReceiverPolygon_NotOwner();
        }
        uint256 contract_balance = address(this).balance;
        (bool sent, ) = OWNER_ADDRESS.call{value: contract_balance}("");
        if (!sent) {
            revert AnycallV6ReceiverPolygon_WithdrawCallFailure();
        }
    }

    function anyFallback(address to, bytes calldata data) external {
        emit Fallbackmsg(abi.decode(data[4:], (string)), to);
    }

    function anyExecute(bytes calldata _data)
        external
        returns (bool success, bytes memory result)
    {
        bytes4 selector = bytes4(_data[:4]);
        if (selector == this.anyExecute.selector) {
            string memory _msg = abi.decode(_data, (string));
            emit NewMsg(_msg);
            success = true;
            result = "";
        } else if (selector == this.anyFallback.selector) {
            // original data with selector would be passed here if thats the case
            (address to, bytes memory data) = abi.decode(
                _data[4:],
                (address, bytes)
            );
            this.anyFallback(to, data);
        } else {
            return (false, "unknown selector");
        }
        return (true, "");
    }
}
