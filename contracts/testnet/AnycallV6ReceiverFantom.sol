// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract AnycallV6ReceiverFantom {
    event NewMsg(string msg);
    event Funded(uint256 value);
    event Fallbackmsg(string msg);

    function deposit() public payable {
        emit Funded(msg.value);
    }

    function anyExecute(bytes calldata _data)
        external
        returns (bool success, bytes memory result)
    {
        bytes4 selector = bytes4(_data[:4]);
        if (selector == this.anyExecute.selector) {
            string memory message = abi.decode(_data[4:], (string));
            emit NewMsg(message);
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

    function anyFallback(address to, bytes calldata data) external {
        // require(msg.sender == address(this), "AnycallClient: Must call from within this contract");
        // require(bytes4(data[:4]) == this.anyExecute.selector, "AnycallClient: wrong fallback data");

        // address executor = CallProxy(ANYCALL_CONTRACT_RINKEBY).executor();
        // (address _from, , ) = IAnycallExecutor(executor).context();
        // require(_from == address(this), "AnycallClient: wrong context");

        // string memory message = abi.decode(data[4:], (string));

        // require(peeraddress == to, "AnycallClient: mismatch dest client");

        emit Fallbackmsg(abi.decode(data[4:], (string)));
    }
}
