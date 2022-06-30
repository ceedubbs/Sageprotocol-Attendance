pragma solidity 0.8.15;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract Attendance is AragonApp {
    using SafeMath for uint256;
    bytes32 public constant ATTENDANCE_ROLE = keccak256("ATTENDANCE_ROLE");

    string private constant ERROR_ADDRESS_INVALID = "INVALID ADDRESS";

    event NewAttendance(address participants, uint256 rewardAmount);

 
    function initialize(TokenManager _tokenManager) external onlyInit {
        initialized();
    }
    modifier addressValid(address participant) {
        require(isaddress(participants) == true);
        _;
    }
    function rewardTokens(address participant, uint256 rewardAmount) internal addressValid(address participant) {
        tokenManager.mint(participants, rewardAmount);
    }
}
