import React from 'react'
import { withTheme } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Dropdown = ({theme,data,text,refval,setValue,style,disable}) => {

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
            ref={refval&&refval}
            disabled={disable ? disable : false}
            data={data}
            defaultButtonText={`${text ? text : "--Select--"}`}
            /* renderDropdownIcon={isOpened => {
                return <FontAwesome5 name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }} */
            buttonStyle={styleobj}
            buttonTextStyle={{fontSize:16,fontFamily:'VarelaRound-Regular'}}
            dropdownStyle={{borderRadius:10,marginTop:-30}}
            rowTextStyle={{fontSize:14,fontFamily:'VarelaRound-Regular'}}
            selectedRowStyle={{backgroundColor:theme.colors.primary}}
            selectedRowTextStyle={{color:'#fff'}}
            onSelect={(item) => onSelect(item)}
            // onBlur={selectHandler}
        />  
    )
}

export default withTheme(Dropdown)
