// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegister {
    //biến đếm userid
    uint256 public userCount;

    //tạo user
    struct User {
        address UserId;
        string UserURI;
        string name;
        bool isExpert;
        bool isExist;
    }

    //mảng chứa các user
    mapping(address => User) public users;

    event Signed(address owner, string UserURI,string name, bool isExpert, bool isExist);

    function creatUser(
        address _userId,
        bool _isExpert,
        string memory _UserURI,  
        string memory _name
    ) external {
        //kiểm tra xem user đã tồn tại chưa này
        require(
            users[_userId].isExist == false,
            "This user has already signed"
        );

        //mỗi lần create thì tăng userCount lên 1
        userCount++;

        //mặc định luôn chưa là chuyên gia
        users[_userId] = User(_userId, _UserURI, _name, false, true);

        emit Signed(_userId, _UserURI,_name, _isExpert, true);
    }

    function ExpertSign(address _userId) external {
        //kiểm tra xem user đã tồn tại hay chưa và là chuyên gia chưa
        require(users[_userId].isExist == true, "You haven't singup yet");
        require(users[_userId].isExpert == false, "You has already an expert");

        //thay đổi thành chuyên gia
        users[_userId].isExpert = true;
    }
}
