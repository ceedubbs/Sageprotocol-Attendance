import React, { useState } from "react";
import { useAragonApi } from "@aragon/api-react";
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  textStyle,
  TextInput,
  Split,
  IdentityBadge,
  Popover,
} from "@aragon/ui";
import styled from "styled-components";

import { toDecimals, getTokenHandler } from "../lib/token-utils";

import { createMintEVMScript } from "../lib/evmscripts-utils";

import votingAbi from "../abi/Voting.json";

function App() {
  const { installedApps, api, path, requestPath } = useAragonApi();
  const { count, isSyncing } = appState;

  const tokenManager = installedApps.filter(
    ({ name }) => name.toLowerCase() === "tokens"
  );

  const voting = installedApps.filter(
    ({ name }) => name.toLowerCase() === "voting"
  );

  const mintTokens = async (transactionItems) => {
    const tokenHandler = await getTokenHandler(api, tokenManager.appAddress);
    const decimals = await tokenHandler.decimals().toPromise();
    const mintings = transactionItems.map((item) => ({
      address: item.address,
      amount: toDecimals(item.amount, decimals),
    }));

    /* Putting each of the submissions into mappings */
    console.log(transactionItems, mintings);

    const votingHandler = api.external(votingApp.appAddress, votingAbi);
    /*
    Seems to be where the voting aspect comes
    */
    const evmScript = await createMintEVMScript(
      mintings,
      tokenManager.appAddress
    );
    /*
    It's as simple as passing in two fields, address, amounts and token manager address
    */

    return new Promise((resolve, reject) => {
      votingHandler.newVote(evmScript, "Mint Tokens").subscribe(() => {
        resolve();
      });
      // How does this part work?
    });
  };

  const pathParts = path.match(/^\/tab\/([0-9]+)/);
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0;
  const [valueBoxOne, setValueBoxOne] = useState("");
  const [valueBoxTwo, setValueBoxTwo] = useState("");
  const [addresses, setAddress] = useState([]);
  const [rewardAmount, setRewardAmount] = useState("");
  const opener = React.createRef();
  //let sidePanel = document.querySelector("#sidePanel");

  function transferItemsCreator(addresses, rewardAmount) {
    var transferItems = addresses.map((item) => ({
      ...transferItems,
      address: item,
      amount: rewardAmount,
    }));
    mintTokens(transferItems);
  }

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Attendence"
        secondary={
          <Button
            mode="strong"
            label="Submit Attendence"
            icon={<IconPlus />}
            onClick={transferItemsCreator(addresses, rewardAmount)}
          />
        }
      />
      <Tabs
        items={[<p> Reward Amount: {rewardAmount} </p>]}
        selected={pageIndex}
        onChange={(index) => requestPath(`/tab/${index + 1}`)}
      />
      <Split
        primary={
          <Box
            css={`
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: start;
              height: ${50 * GU}px;
              ${textStyle("title4")};
            `}
          >
            Enter Participant Address
            <Buttons>
              <TextInput
                value={valueBoxOne}
                onChange={(event) => {
                  setValueBoxOne(event.target.value);
                  console.log(valueBoxOne);
                }}
              />
              <Button
                label="Submit"
                onClick={(event) => {
                  if (valueBoxOne) {
                    setAddress((oldArray) => [...oldArray, valueBoxOne]);
                  } else {
                    console.error("Invalid Input");
                  }
                  setValueBoxOne("");
                }}
              />
            </Buttons>
            Reward Amount
            <Buttons>
              <TextInput
                value={valueBoxTwo}
                onChange={(event) => {
                  setValueBoxTwo(event.target.value);
                  console.log(valueBoxTwo);
                }}
              />
              <Button
                label="Submit"
                onClick={(event) => {
                  valueBoxTwo > 0
                    ? setRewardAmount(valueBoxTwo)
                    : console.error("Reward Invalid");
                  console.log(`Reward Amount:${rewardAmount}`);
                  setValueBoxTwo("");
                }}
              />
            </Buttons>
          </Box>
        }
        secondary={
          <Box id="sidePanel" heading="Addresses">
            <IdentityBadge entity={transactions.address} connectedAccount />
            <IdentityBadge entity={transactions.amount} connectedAccount />
          </Box>
        }
      />
    </Main>
  );
}

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin: 20px;
`;

export default App;
