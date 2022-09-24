pragma solidity 0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract Attendance is AragonApp {
    using SafeMath for uint256;
    bytes32 public constant ATTENDANCE_ROLE = keccak256("ATTENDANCE_ROLE");

    string private constant ERROR_ADDRESS_INVALID = "INVALID ADDRESS";
    string private constant ERROR_NOT_MANAGER = "INVALID MANAGER ADDRESS";
    string private constant ERROR_INVALID_REWARD_AMOUNT = "INVALID REWARD AMOUNT";
    TokenManager public tokenManager;

    event Submitted(address indexed entity, address[] participants, uint256 rewardAmount);
    
    function initialize(TokenManager _tokenManager) external onlyInit {
        require(isContract(_tokenManager), ERROR_NOT_MANAGER);
        tokenManager = TokenManager(_tokenManager);
        initialized();
    }
    /**
     *  @notice rewards the amount of tokens designated by `rewardAmount` to the list of participants
     */
    function submitAttendance(address[] participants, uint256 rewardAmount)
        external
        isInitialized
        auth(ATTENDANCE_ROLE)
    {
        for(uint i = 0; i < participants.length; i++ ) {
            require(rewardAmount > 0, ERROR_INVALID_REWARD_AMOUNT);
            tokenManager.mint(participants[i], rewardAmount);
        }
        emit Submitted(msg.sender, participants, rewardAmount);
    }
    function callTokenManagerContract() external view returns(address) {
        return tokenManager;
    }
}