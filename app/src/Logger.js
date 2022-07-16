import React from 'react'
import {
  DataView,
  IdentityBadge,
  ContextMenu,
  ContextMenuItem,
  IconPlus,
  TextInput,
  IconCheck,
} from '@aragon/ui'

const AttendenceList = []

function LoggerView({ AttendenceList }) {
    const [addressValue, setAddressValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [numValue, setNumValue] = useState(0)
    return (

        <Split
            primary={
                <><TextInput
                    title={'Address'}
                    value={addressValue}
                    onChange={event => {
                        setAddressValue(event.target.value)
                    } } /><TextInput
                        title={'Name'}
                        value={nameValue}
                        onChange={event => {
                            setNameValue(event.target.value)
                        } } /><TextInput.Number
                        title={'Number of Tokens'}
                        value={numValue}
                        onChange={event => {
                            setNumValue(event.target.value)
                        } } /><Button
                        mode="strong"
                        label="Add"
                        icon={<IconPlus />}
                        onClick={addToList()} /><DataView
                        display="table"
                        fields={['Holder', 'Name']}
                        items={AttendenceList}
                        renderEntry={entryParts}
                        renderEntryActions={entryActions} /></>
            }
    //Text field with instructions - "Type addresses into the text field and press 'add'"
    //text field that says "no one added yet" when array of addresses from dataview is empty
    //TextInput Field with button that adds to dataview that lists addressfields of those already included in attendence count
    //also add names of people

    //use popover showing success message upon submission:
            secondary={
                <Button
                mode="strong"
                label="Submit"
                icon={<IconCheck />}
                onClick={bigSubmit()}
                />
            }
        />
    )
}

function addToList () {
    AttendenceList.unshift([addressValue, nameValue]) //admitedly this might not be the proper way 
    //to get the values of the address and name value fields
    setAddressValue = ""
    setNameValue = ""
}

function bigSubmit() {
    //pass AttendenceList and inputNum to backend
    AttendenceList = []
    setNumValue = ""
    setAddressValue = ""
    setNameValue = ""
}

function entryParts([account, name]) {
    return [<LocalIdentityBadge entity={account} />, name]
  }

export default LoggerView