// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract AnycallV6ReceiverFantom {
    event NewMsg(string msg);

    function deposit() public payable {}

    function anyExecute(bytes memory _data)
        external
        returns (bool success, bytes memory result)
    {
        string memory _msg = abi.decode(_data, (string));
        emit NewMsg(_msg);
        return (true, "");
    }
}
