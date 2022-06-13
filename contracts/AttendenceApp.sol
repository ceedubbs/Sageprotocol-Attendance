pragma solidity 0.8.14;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract Attendance is AragonApp {
    bytes32 public constant ATTENDANCE_ROLE = keccak256("ATTENDANCE_ROLE");
}
