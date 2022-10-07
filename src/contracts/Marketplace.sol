// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "../../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";




contract Marketplace is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
        bool check;
    }

    struct ItemHistory{
        uint itemId;
        string eventName;
        uint price;
        address from;
        address to;
        uint time;
    }

    mapping(uint => ItemHistory[]) public itemTracks;

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor() {
        feeAccount = payable(msg.sender);
        feePercent = 1;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price, address _seller) external nonReentrant {
        if (_price > 0)
        {
            // transfer nft to marketplace
            _nft.transferFrom(msg.sender, address(this), _tokenId);

             // emit Offered event
            emit Offered(
                itemCount,
                address(_nft),
                _tokenId,
                _price,
                _seller
            );
        }
        //require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(_seller),
            false, 
            false
        );
       
    }

    function purchaseItem(uint _itemId, address _buyer) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            _buyer
        );

        //change seller to buyer
        items[_itemId].seller = payable(_buyer);
    }
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }

    function getItemCount() view public returns(uint){
        return itemCount;
    }

    function Checked(uint _itemId) external {
        //kiểm tra xem đã tồn tại chưa

        //thay đổi thành đã được xác nhận
        items[_itemId].check = true;
    }

    function addHistory( uint _itemId, string memory _eventName, uint _price, address _from, address _to, uint _time) public {
        itemTracks[_itemId].push(ItemHistory(_itemId, _eventName, _price, _from, _to, _time));
    }
}