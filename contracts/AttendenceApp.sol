pragma solidity 0.8.15;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract Attendance is AragonApp {
    using SafeMath for uint256;
    bytes32 public constant ATTENDANCE_ROLE = keccak256("ATTENDANCE_ROLE");

    string private constant ERROR_ADDRESS_INVALID = "INVALID ADDRESS";
    string private constant ERROR_NOT_MANAGER = "INVALID MANAGER ADDRESS";
    string private constant ERROR_NO_ATTENDANCE_ROLE = "NO ATTENDANCE ROLE";git

    event NewAttendance(address participant, uint256 rewardAmount);

    address[] participantlist;
    TokenManager public tokenManager;

    function initialize(TokenManager _tokenManager) external onlyInit {
        require(isContract(_tokenManager), ERROR_NOT_MANAGER);
        tokenmanager = _tokenmanager;
        initialized();
    }

    modifier addressValid(address participant) {
        require(isaddress(participant) == true, ERROR_ADDRESS_INVALID);
        _;
    }

    function chooseParticipant(address participant)
        public
        addressValid(participant)
    {
        participantlist.push(participant);
    }

    function rewardTokens(address participant, uint256 rewardAmount)
        internal
        auth(ATTENDANCE_ROLE)
    {
        tokenManager.mint(participant[index], rewardAmount);
    }
}
