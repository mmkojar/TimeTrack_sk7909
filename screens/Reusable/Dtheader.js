import React from 'react'
import { DataTable } from 'react-native-paper';

const Dtheader = ({headtitle}) => {

  let size = headtitle && headtitle.length == '1' ? 18 : 15;
  return (
    <>
        <DataTable>
            <DataTable.Header style={{backgroundColor:'#91c4f0'}}>
                 {
                    headtitle && headtitle.map((item,index) => {
                        return <DataTable.Title key={index} textStyle={{fontSize:size}} style={{justifyContent:'center'}}>{item.replace('_',' ')}</DataTable.Title>    
                    })
                }
            </DataTable.Header>
        </DataTable>
  </>
  )
}

export default Dtheader
