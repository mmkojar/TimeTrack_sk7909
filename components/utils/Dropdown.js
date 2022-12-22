import React from 'react'
import { withTheme } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'


const Dropdown = ({theme,data,text,setValue,style}) => {

    const onSelect = (item) => {
        setValue(item)
    }
    const styleobj = {
        backgroundColor:theme.colors.accent,
        borderTopRightRadius:6,
        borderTopLeftRadius:6,
        height:45,
        width: style && style.width,
        marginBottom: style && style.marginBottom
    }
    return (
        <SelectDropdown
            data={data}
            defaultButtonText={text}
            buttonStyle={styleobj}
            buttonTextStyle={{fontSize:16}}
            dropdownStyle={{borderRadius:10,marginTop:-30}}
            rowTextStyle={{fontSize:14}}
            onSelect={(item) => onSelect(item)}            
            // onBlur={selectHandler}
        />  
    )
}

export default withTheme(Dropdown)
