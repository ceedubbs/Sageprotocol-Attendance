

Sage Protocol's Attendance App is an adaptation of 1Hive's Transactions App. It aims to execute multiple token minting actions within one swift proposal.

This ReadMe is also adapted from 1Hive/transactions-app

#### 🔋 Project Stage: Building...

#### 🚨 Security Review Status: pre-audit

The code in this repository has not been audited.

### Initialization

The attendance app does not need any parameter to be initialized.

## How to run Transactions app locally

First make sure that you have node and yarn installed and working. You'll also need to have [Metamask](https://metamask.io) or some kind of web wallet enabled to sign transactions in the browser.

Git clone this branch.

```sh
git clone -b AttendanceVEvmScripts https://github.com/ceedubbs/Sageprotocol-Attendance.git
```

Navigate into the `Sageprotocol-Attendance` directory.

```sh
cd Sageprotocol-Attendance
```
Switch to node version 16.0.0

Install npm dependencies.

```sh
yarn
```

Deploy a dao with Token Manager, and Attendance App installed on your local environment.

```sh
yarn start
```
