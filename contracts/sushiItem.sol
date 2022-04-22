//sushiItem.sol
//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


import "./token/ERC1155/ERC1155.sol";
import "./utils/Counters.sol";
import "./utils/Strings.sol";

contract SushiItem is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    //ネタの文字列を数字で表す
    uint256 public constant TUNA = 0;
    uint256 public constant SALMON = 1;
    uint256 public constant TOROTAKU = 2;
    uint256 public constant TAMAGO = 3;
    uint256 public constant UNI = 4;

    string baseMetadataURIPrefix;
    string baseMetadataURISuffix;

    //デプロイ時に一度だけ呼ばれるconstructor
    constructor() ERC1155("") {
        baseMetadataURIPrefix = "https://firebasestorage.googleapis.com/v0/b/solidity-sandbox.appspot.com/o/erc1155example%2Fmetadata%2F";
        baseMetadataURISuffix = ".json?alt=media";

        // TUNE -> 0
        // tokenId0を100個発行する
        // デフォルトの所有者はmsg.sender()＝コントラクトをデプロイした人間

        _mint(msg.sender, TUNA, 100, "");
        _mint(msg.sender, SALMON, 100, "");
        _mint(msg.sender, TOROTAKU, 100, "");
        _mint(msg.sender, TAMAGO, 100, "");
        _mint(msg.sender, UNI, 100, "");
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(_id),
            baseMetadataURISuffix
        ));
    } 

    function mint(uint256 _tokenId, uint256 _amount) public {
        _mint(msg.sender, _tokenId, _amount, "");
    }

    function mintBatch(uint256[] memory _tokenIds, uint256[] memory _amounts) public {
        _mintBatch(msg.sender, _tokenIds, _amounts, "");
    }

    function setBaseMetadataURI(string memory _prefix, string memory _suffix) public {
        baseMetadataURIPrefix = _prefix;
        baseMetadataURISuffix = _suffix;
    }
}

