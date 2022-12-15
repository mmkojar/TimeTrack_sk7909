import React from 'react'
import { DataTable } from 'react-native-paper';

const Dtheader = ({headtitle}) => {
  return (
    <>
        <DataTable>
            <DataTable.Header style={{backgroundColor:'#91c4f0'}}>
                 {
                    headtitle.map((item,index) => {
                        return <DataTable.Title key={index} textStyle={{fontSize:15}} style={{justifyContent:'center'}}>{item.replace('_',' ')}</DataTable.Title>    
                    })
                }                
            </DataTable.Header>
        </DataTable>
  </>
  )
}

export default Dtheader
