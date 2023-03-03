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
  const COLORS = ['#0adf09','#ff0000','#f4f6f2','#ffff00','#078383','#ff8f48','#006400','#000080','#800000','#ffa500','#4b0082'];
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  
  let grpresult = [];
    graphArr && graphArr.map((pa,index) => {      
      for(let i in pa) {
        if(pa[i] !== '0' && i !== 'Graph For' && i !== 'Total') {
          grpresult.push(Object.assign({
              x:i,
              y:Number(pa[i]),
              name:i,
              color:COLORS[index]
          }))
        }
      }
  });
  let gcolors = [];
  for(var i in grpresult) {
    if(grpresult[i].x == 'Present') {
      grpresult[i].color = '#0adf09'
    }
    else if(grpresult[i].x == 'Absent') {
      grpresult[i].color = '#f17676'
    }
    else if(grpresult[i].x == 'OD') {
      grpresult[i].color = '#d3d3d3'
    }
    else if(grpresult[i].x == 'Leave') {
      grpresult[i].color = '#ffff00'
    }
    else if(grpresult[i].x == 'Coff') {
      grpresult[i].color = '#9090f1'
    }
    else if(grpresult[i].x == 'Holiday') {
      grpresult[i].color = '#fccd77'
    }
    else if(grpresult[i].x == 'WeekOff') {
      grpresult[i].color = '#ffbfcd'
    }
    else if(grpresult[i].x == 'WFH') {
      grpresult[i].color = '#00fefa'
    }
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
                      innerRadius={70}
                      radius={({ datum }) => (selectedCategory && selectedCategory == datum.name) ? width * 0.43 : width*0.42 - 10}
                      labelRadius={({ innerRadius }) => innerRadius + 20 }
                      labels={({ datum }) => datum.y}
                      style={{
                        labels: { fontSize: 18,fill:'#000' },
                        data: {
                          fillOpacity: 0.8, stroke: "#fff", strokeWidth: 3
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
                <View style={{flex:1,flexDirection:'row',flexWrap: 'wrap'}}>
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
