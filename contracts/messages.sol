// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Message {
    struct Info {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Info[] infos; //dynamic array of type Info struct
    
    address payable  owner;

    constructor()
    {
        owner = payable(msg.sender);
    }

    function Send_Message(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");

        owner.transfer(msg.value);
        infos.push(Info(name, message, block.timestamp, msg.sender));
    } 
    function Get_Message() public view returns (Info[] memory) {
        return infos;
    }
}