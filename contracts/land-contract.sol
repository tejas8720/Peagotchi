// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract address : 0xb1613CEBFCCE54484aBbB603C0b2B5204B3F4bd2

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {
    uint256 public cost = 1 ether;
    uint256 public maxSupply = 4;
    uint256 public totalSupply = 0;

    struct plot {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        uint256 sizeX;
        uint256 sizeY;
        uint256 sizeZ;
    }

    Plot[] public plots;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        cost = _cost;

        plots.push(
            Plot("Plot 1", address(0x0), -3.5, 1, 5, 5, 1, 5)
        );
        plots.push(Plot("Plot 2", address(0x0), 2, 1, 5, 5, 1, 5));
        plots.push(
            Plot("Plot 3", address(0x0), -3.5, 1, -2, 5, 1, 5)
        );
        plots.push(
            Plot("Plot 4", address(0x0), 2, 1, -2, 5, 1, 5)
        );
    }

    function mint(uint256 _id) public payable {
        uint256 supply = totalSupply;
        require(supply <= maxSupply);
        require(plots[_id - 1].owner == address(0x0));
        require(msg.value >= cost);

        // NOTE: tokenID always starts from 1, but our array starts from 0
        plots[_id - 1].owner = msg.sender;
        totalSupply = totalSupply + 1;

        _safeMint(msg.sender, _id);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        // Update plot ownership
        plots[tokenId - 1].owner = to;

        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        // Update Building ownership
        plots[tokenId - 1].owner = to;

        _safeTransfer(from, to, tokenId, _data);
    }

    // Public View Functions
    function getPlots() public view returns (Plot[] memory) {
        return plots;
    }

    function getPlot(uint256 _id) public view returns (Plot memory) {
        return plots[_id - 1];
    }
}