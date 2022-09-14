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
  Tag,
} from "@aragon/ui";
import styled from "styled-components";

function App() {
  const { api, appState, path, requestPath } = useAragonApi();
  const { count, isSyncing } = appState;

  const pathParts = path.match(/^\/tab\/([0-9]+)/);
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0;
  const [valueBoxOne, setValueBoxOne] = useState("");
  const [valueBoxTwo, setValueBoxTwo] = useState("");
  const [addresses, setAddress] = useState([]);
  const [rewardAmount, setRewardAmount] = useState("");
  const [visible, setVisible] = useState(false);
  const opener = React.createRef();
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
            onClick={(event) => {
              api.submitAttendance(addresses, rewardAmount).toPromise();
              setVisible(true);
            }}
            ref={opener}
          />
        }
      />
      <Tabs
        items={[<p>New Attendance</p>]}
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
            <Tag
              css={`
                margin-bottom: 10px;
              `}
              mode="indicator"
            >
              Reward Amount: {rewardAmount}
            </Tag>
            {addresses.map((address) => (
              <IdentityBadge entity={address} connectedAccount />
            ))}
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
