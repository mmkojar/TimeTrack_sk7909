import React,{ useEffect, useState, memo } from 'react'
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList,Pressable } from 'react-native'
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getGraph } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment';
import Nodatafound from './Reusable/Nodatafound';
import { VictoryPie } from "victory-native";

const AtttendanceChart = ({navigation}) => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.graph)
  
  var graphArr = result && result['GraphValue'];
  const COLORS = ['#b8d8d8','#d5e5a3','#f53e3e6b','#d6c1ab','#F3BB45','#FFD662','#008000','#000080','#800000','#ffa500','#4b0082'];
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  
  let grpresult = [];
    graphArr && graphArr.map((pa,index) => {      
      for(let i in pa) {
        if(pa[i] !== '0' && i !== 'Graph For' && i !== 'Total') {
          grpresult.push(Object.assign({
              x:i,
              y:pa[i],
              name:i,
              color:COLORS[index]
          }))
        }
      }
  });
  let gcolors = [];
  for(var i in grpresult) {
    gcolors.push(grpresult[i].color)
  }
  let legend = [];
  for(var i in grpresult) {
    legend.push(Object.assign({
      id:Math.random().toString(16).slice(2),
      name:grpresult[i].name,
      value:grpresult[i].y,
      symbol:{fill:grpresult[i].color},
      color:grpresult[i].color
    }))
  }
  
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const cmonth = moment(new Date()).format('MMM');
  const cyear = moment(new Date()).format('YYYY');
  const years = [cyear,cyear-1]
  
  const [month,setMonth] = useState(cmonth);
  const [year,setYear] = useState(cyear);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGraph(empcode,month,year));
  }, [month,year])
   
  const { width, height } =  Dimensions.get("window");  
  
  return (
    <ScrollView contentContainerStyle={grpresult.length == 0 && {flex:1}}>
      <View style={theme.container}>
          <View style={styles.filter}>
              <SelectDropdown
                data={months}
                defaultButtonText={cmonth}
                defaultValue={cmonth}
                buttonStyle={{width:'30%',marginLeft:-30,borderRadius:10}}
                dropdownStyle={{borderRadius:10,marginTop:-30}}              
                rowTextStyle={{fontSize:16}}                
                selectedRowStyle={{backgroundColor:theme.colors.primary}}
                selectedRowTextStyle={{color:'#fff'}}
                onSelect={(item) => setMonth(item)}
              />
              <SelectDropdown
                data={years}
                defaultButtonText={cyear}
                defaultValue={cyear}
                buttonStyle={{width:'30%',borderRadius:10}}
                dropdownStyle={{borderRadius:10,marginTop:-30}}
                rowTextStyle={{fontSize:16}}
                selectedRowStyle={{backgroundColor:theme.colors.primary}}
                selectedRowTextStyle={{color:'#fff'}}
                onSelect={(item) => setYear(item)}
              />     
          </View>
          <Text style={{textAlign:'center',marginTop:20,fontSize:16}}>{month}-{year}</Text>
          {
            grpresult.length > 0 ?
            <>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <VictoryPie
                      data={grpresult}
                      colorScale={gcolors}
                      innerRadius={80}
                      radius={({ datum }) => (selectedCategory && selectedCategory == datum.name) ? width * 0.43 : width*0.42 - 10}
                      labelRadius={({ innerRadius }) => innerRadius + 20 }
                      labels={({ datum }) => datum.y}
                      style={{
                        labels: { fontSize: 20,fill:'#fff' },
                        data: {
                          fillOpacity: 0.9, stroke: "#fff", strokeWidth: 3
                        },
                        parent:{
                          ...styles.shadow
                        }
                      }}
                      /* animate={{
                        duration: 1000
                      }} */
                      // width={500}
                      // height={400}
                  />
              </View>
              {/* <ScrollView style={{flex:1}}> */}
                <View>
                  {
                    legend.map((item,index) => {
                      return (
                        <Pressable
                            key={index}
                            style={{
                              // flexDirection: 'row',
                              height: 40,
                              paddingHorizontal:20,
                              borderRadius: 10,
                              backgroundColor: (selectedCategory && selectedCategory === item.name) ? item.color : '#fff'
                            }}                            
                            onPress={() => {
                                setSelectedCategory(item.name)
                            }}                            
                          >
                          <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
                            <View
                                style={{ 
                                  width: 20,
                                  height: 20,                                
                                  backgroundColor: (selectedCategory && selectedCategory == item.name) ? '#fff' : item.color,
                                  borderRadius: 5
                              }}
                            />
                            <Text style={{ marginLeft:10, color: (selectedCategory && selectedCategory == item.name) ? '#fff' : '#000' }}>{item.name}</Text>
                          </View>
                            
                            {/* <View style={{ justifyContent: 'center' }}>
                              <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? '#fff' : '#000' }} >{item.value}</Text>
                            </View> */}
                        </Pressable>
                      )
                    })
                  }
                </View>
              {/* </ScrollView> */}
            </>
            :
            <Nodatafound/>
          }
          
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  filter:{    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  shadow:{
    shadowColor:'#000',
    shadowOffset:{
      width:2,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    // backgroundColor : "#f4f4f4",
    elevation:3,
  }
})
export default memo(AtttendanceChart)
