import React from 'react'
import { TextInput } from 'react-native-paper'

const CTextInput = ({style,ktype,multiline,noline,maxl,plholder,val}) => {
  return (
    <TextInput
        style={style && style}
        underlineColor={theme.colors.accent}
        keyboardType={ktype}
        multiline={multiline}
        numberOfLines={noline && noline}
        maxLength={maxl && maxl}
        textAlignVertical="top"
        placeholder={plholder && plholder}
        value={val}
        onChangeText={(val) => setRemark(val)}
    />
  )
}

export default CTextInput
