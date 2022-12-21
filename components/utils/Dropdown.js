import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'

const Dropdown = ({data,text,setValue}) => {

    const onSelect = (item) => {
        setValue(item)
    }
    return (
        <SelectDropdown
            data={data}
            defaultButtonText={text}
            buttonStyle={{borderRadius:10,width:'80%'}}
            buttonTextStyle={{fontSize:16}}
            dropdownStyle={{borderRadius:10,marginTop:-30}}
            rowTextStyle={{fontSize:14}}
            onSelect={(item) => onSelect(item)}
            // onBlur={selectHandler}
        />  
    )
}

export default Dropdown
