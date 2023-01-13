import React,{ useEffect, useState, memo } from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
// import { TextInput, DataTable, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getGraph } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import SelectDropdown from 'react-native-select-dropdown'
// import { Doughnut } from 'react-chartjs-2/dist';
import moment from 'moment';
import { BarChart } from "react-native-chart-kit";
import { Card, Text } from 'react-native-paper';
import Nodatafound from './Reusable/Nodatafound';
import { VictoryPie, VictoryTheme } from "victory-native";
import { Svg } from 'react-native-svg';

const AtttendanceChart = ({navigation}) => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.graph)
  
  var graphArr = result && result['GraphValue'];
  const COLORS = ['#b8d8d8','#d5e5a3','#f53e3e6b','#d6c1ab','#F3BB45','#FFD662'];
// console.log(graphArr);
  let paresult = [];
    graphArr && graphArr.map((pa,index) => {
      for(let i in pa) {
        if(pa[i] !== '0' && i !== 'Graph For' && i !== 'Total') {
          paresult.push(Object.assign({
              x:i,
              y:pa[i],
              color:COLORS[index % COLORS.length]
            }))
        }
      }
    });
    console.log(paresult);
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
   
    // const screenWidth = Dimensions.get("window").width;
    const { width, height } =  Dimensions.get("window");
   /*  const data = {
      labels: Object.keys(paresult),
      datasets: [
        {
          data: Object.values(paresult)
        }
      ]
    };
    const chartConfig = {
      backgroundGradientFrom: "#fff",
      // backgroundGradientFromOpacity: 1,
      backgroundGradientTo: "#fff",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,      
      // strokeWidth: 10, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    }; */
  return (
    // <ScrollView>
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
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            {/* <Svg width={width} height={height}> */}
              <VictoryPie              
                  data={paresult}
                  colorScale={COLORS}
                  innerRadius={70}
                  labelRadius={({innerRadius}) => (width*0.4 + innerRadius)/2.5}                  
                  style={{ 
                    labels: { fill: "white", fontSize: 16 },
                    data: {
                      fillOpacity: 0.9, stroke: "#fff", strokeWidth: 1
                    },
                  }}
                  animate={{
                    duration: 2000
                  }}
                  width={400}
                  height={height}
                  // theme={VictoryTheme.material}
                />
              {/* </Svg> */}
            </View>
            <View style={{alignItems:'center'}}>
              {
                 paresult.map((item,index) => {
                  return  (
                    <View key={index}>
                        <Text>{item.x} <Text>{item.y}</Text></Text>
                    </View>
                  )
                })
              }
            </View>
            {
              //   Object.keys(paresult).length > 0 ?
              //   <View style={{flex:1,justifyContent:'center'}}>
              //     <Card elevation={3}>
              //       <BarChart
              //         data={data}
              //         width={screenWidth}
              //         height={400}
              //         // fromZero={true}
              //         chartConfig={chartConfig}
              //         // yAxisLabel="No Of Days"
              //         />
              //       </Card>
              //   </View>
              // :
              // <Nodatafound />
              
            }
            
      </View>
    // </ScrollView>
  )
}
const styles = StyleSheet.create({
  filter:{    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
  }
})
export default memo(AtttendanceChart)
