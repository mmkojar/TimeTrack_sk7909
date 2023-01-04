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
                        if(headtitle.length == '3') {
                            if(index == '0') {
                            var styles = {justifyContent:'flex-start'};
                            }
                            else if(index == '1') {
                            var styles = {justifyContent:'center'};                  
                            }
                            else {
                            var styles = {justifyContent:'flex-end'};
                            }
                        }
                        else {
                          var styles = {justifyContent:'center'};
                        }
                        return <DataTable.Title key={index} textStyle={{fontSize:size,color:'#000'}} style={styles}>{item.replace('_',' ')}</DataTable.Title>
                    })
                }
            </DataTable.Header>
        </DataTable>
  </>
  )
}

export default Dtheader
