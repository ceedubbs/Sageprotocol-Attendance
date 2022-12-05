import React, { useState } from "react";
import { useAragonApi } from "@aragon/api-react";
import {
  Box,
  Button,
  GU,
  Header,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  textStyle,
  TextInput,
  Split,
  IdentityBadge,
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

  const opener = React.createRef();
  const [projectTitle, setProjectTitle] = useState("");
  const [valueBoxOne, setValueBoxOne] = useState("");
  const [valueBoxTwo, setValueBoxTwo] = useState("");
  const [info, setInfo] = useState([]);
  const [visible, setVisible] = useState(false);
  //let sidePanel = document.querySelector("#sidePanel");
  if (path === "/tab/2") {
    return (
      <Main>
        {isSyncing && <SyncIndicator />}
        <Header
          primary="Attendance"
          secondary={
            <Button
              mode="strong"
              label="Submit Attendence"
              icon={<IconPlus />}
              onClick={(event) => {
                //api.displayValue(parseInt(value)).toPromise();
                //setValue("");
                setVisible(true);
              }}
              ref={opener}
            />
          }
        />
        <Tabs
          items={["Introduction", "Attendance", "Projects", "New Template"]}
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
              <Grids>
                <TextInput
                  value={valueBoxOne}
                  onChange={(event) => {
                    setValueBoxOne(event.target.value);
                    console.log(valueBoxOne);
                  }}
                />
              </Grids>
              Reward Amount
              <Grids>
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
                    if (valueBoxOne && valueBoxTwo > 0) {
                      setInfo((oldArray) => [
                        ...oldArray,
                        { address: valueBoxOne, rewardAmount: valueBoxTwo },
                      ]);
                      setValueBoxOne("");
                      setValueBoxTwo("");
                    } else if (!valueBoxOne) {
                      console.error("Invalid Input");
                    } else if (!valueBoxTwo) {
                      console.error("Reward Invalid");
                    }
                  }}
                ></Button>
              </Grids>
            </Box>
          }
          secondary={
            <Box heading="Addresses">
              {info.map((info) => (
                <React.Fragment>
                  <IdentityBadge entity={info.address} connectedAccount />
                  <Tag mode="indicator">{info.rewardAmount}</Tag>
                </React.Fragment>
              ))}
            </Box>
          }
        />
      </Main>
    );
  }
  if (path === "/tab/3") {
    return (
      <Main>
        {isSyncing && <SyncIndicator />}
        <Header primary="New Project Contribution" />
        <Tabs
          items={["Introduction", "Attendance", "Projects", "New Template"]}
          selected={pageIndex}
          onChange={(index) => requestPath(`/tab/${index + 1}`)}
        />
        <Split
          primary={
            <Box
              css={`
                display: flex;
                justify-content: space-between;
                height: ${50 * GU}px;
                ${textStyle("title4")};
              `}
            >
              <div
                css={`
                  display: flex;
                  justify-content: start;
                  ${textStyle("title4")};
                `}
              >
                <Projects>
                  Project title
                  <TextInput
                    value={projectTitle}
                    onChange={(event) => {
                      setProjectTitle(event.target.value);
                    }}
                  />
                </Projects>
                <Projects>
                  Project Description
                  <TextInput
                    value={projectTitle}
                    multiline="true"
                    onChange={(event) => {
                      setProjectTitle(event.target.value);
                    }}
                  />
                </Projects>
                <Projects>
                  Add a Contributor
                  <TextInput
                    value={projectTitle}
                    onChange={(event) => {
                      setProjectTitle(event.target.value);
                    }}
                  />
                </Projects>
              </div>
            </Box>
          }
          secondary={<Box heading="Addresses"></Box>}
        />
      </Main>
    );
  }
  if (path === "/tab/4") {
    return (
      <Main>
        {isSyncing && <SyncIndicator />}
        <Header primary="Create New Template" />
        <Tabs
          items={["Introduction", "Attendance", "Projects", "New Template"]}
          selected={pageIndex}
          onChange={(index) => requestPath(`/tab/${index + 1}`)}
        />
        <Box
          css={`
            display: flex;
            align-items: start;
            justify-content: start;
            text-align: start;
            height: ${50 * GU}px;
            ${textStyle("title4")};
          `}
        ></Box>
      </Main>
    );
  }
  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header primary="Contribution Portal" />
      <Tabs
        items={["Introduction", "Attendance", "Projects", "New Template"]}
        selected={pageIndex}
        onChange={(index) => requestPath(`/tab/${index + 1}`)}
      />
      <Box>
        <div
          css={`
            display: column;
            flex: column;
            align-items: center;
            align-content: space-around;
            justify-content: space-around;
            text-align: start;
            width: 50%;
          `}
        >
          <h1
            css={`
              ${textStyle("title2")};
              padding: ${5 * GU}px;
            `}
          >
            Sage's Contribution Rulesheet
          </h1>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            css={`
              ${textStyle("body2")};
              padding: ${5 * GU}px;
            `}
          >
            {" "}
            This Organization's Rulesheet{" "}
          </a>
          <p
            css={`
              ${textStyle("body1")};
              padding: ${5 * GU}px;
            `}
          >
            Please create contributions based on the rulesheet established by
            the community, or else punishments will be enforced
          </p>
        </div>
      </Box>
    </Main>
  );
}

const Grids = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin: 20px;
`;
const Projects = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 40px;
  margin: 20px;
`;

export default App;
