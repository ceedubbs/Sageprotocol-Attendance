//This should probably be the App.js file

import React from 'react'
import { Main, Header, Button} from '@aragon/ui'

import TokenInfoBox from './TokenInfoBox'
import OwnershipDistributionBox from './OwnershipDistributionBox'

function App() {
    const [visible, setVisible] = useState(false)
    const opener = React.createRef()

    return (
      <Main>
        <Header
        primary={
          <>
            Attendence
            <Tag mode="identifier"> /*insert token abbreviation Capital Letters*/ </Tag> 
          </>
        }
        />
        <Split
        primary={<LoggerView tokenHolders={token.holders} />} //change this line up to use loggerView
        secondary={
          <>
            <TokenInfoBox supply={token.supply} />
            <OwnershipDistributionBox
              supply={token.supply}
              tokenHolders={token.holders}
            />
          </>
        }
      />
      <Popover
        title="Submitted!"
        visible={visible}
        opener={opener.current}
        onClose={() => setVisible(false)}
      >
        Popover
      </Popover>
      </Main>
    )
  }

/* We want 1 unique page here:

1. An expandable list (this will technically be an array) which you can input wallet addresses
2. A box to input the proposed amount of tokens to give
3. Submit button that links to backend to create proposal to give those wallet addresses a certain amount of tokens each
4. OnClick we want a success message of sorts (sidepanel perhaps)

Note: on the side we want to take the two boxes from the tokens example

*/