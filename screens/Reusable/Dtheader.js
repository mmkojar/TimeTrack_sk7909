import React from 'react'
import { DataTable } from 'react-native-paper';

const Dtheader = ({headtitle}) => {

  let size = headtitle && headtitle.length == '1' ? 18 : 15;
  return (
    <>
        <DataTable>
            <DataTable.Header style={{backgroundColor:'#91c4f0',textAlignVertical:'center'}}>
                 {
                    headtitle && headtitle.map((item,index) => {
                        return <DataTable.Title key={index} textStyle={{fontSize:size,color:'#000'}} style={{justifyContent:'center'}}>{item.replace('_',' ')}</DataTable.Title>
                    })
                }
            </DataTable.Header>
        </DataTable>
  </>
  )
}

export default Dtheader
