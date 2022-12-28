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
import { Text } from 'react-native-paper';
import Nodatafound from './Reusable/Nodatafound';

const AtttendanceChart = ({navigation}) => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.graph)

  var graphArr = result && result['GraphValue'];

  let paresult = {};
    graphArr && graphArr.map((pa) => {
      for(let i in pa) {
        if(pa[i] !== '0' && i !== 'Graph For' && i !== 'Total') {
            Object.assign(paresult,pa)
        }
      }
    });
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
   
    const screenWidth = Dimensions.get("window").width;
    const data = {
      labels: Object.keys(paresult),
      datasets: [
        {
          data: Object.values(paresult)
        }
      ]
    };
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      // backgroundGradientFromOpacity: 1,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      // strokeWidth: 10, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
  return (
    <ScrollView>
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
          <View style={{flex:1,justifyContent:'center',marginVertical:50}}>
            {
              Object.keys(paresult).length > 0 ?
              <BarChart
                data={data}
                width={screenWidth}
                height={400}
                fromZero={true}
                chartConfig={chartConfig}
              />
              :
              <Nodatafound />
            }
            
          </View>         
      </View>
    </ScrollView>
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
