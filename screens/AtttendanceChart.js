import React,{ useEffect, useState, memo } from 'react'
import { View, FlatList, StyleSheet, ScrollView, BackHandler,Dimensions } from 'react-native'
// import { TextInput, DataTable, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getGraph } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import SelectDropdown from 'react-native-select-dropdown'
// import { Doughnut } from 'react-chartjs-2/dist';
import moment from 'moment';
import { ProgressChart } from "react-native-chart-kit";

const AtttendanceChart = ({navigation}) => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.graph)

  const dispatch = useDispatch();

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const cmonth = moment(new Date()).format('MMM');
  const cyear = moment(new Date()).format('YYYY');
  const years = [cyear,cyear-1]

  
  
  // function handleBackButtonClick() {
  //   navigation.goBack();
  //   return true;
  // }

  
  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // return () => {
    //   BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    // };
    // dispatch(getGraph(empcode));
    // console.log(result);
  }, [month,year])
    const [month,setMonth] = useState(cmonth);
    const [year,setYear] = useState(cyear);
   
    /* const dohnurtdata = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }; */
    const screenWidth = Dimensions.get("window").width;
    const data = {
      labels: ["Swim", "Bike", "Run","a","b"], // optional
      data: [0.4, 0.6, 0.8,0.2,0.2]
    };
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      // backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
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
                buttonStyle={{width:'30%',marginLeft:-30,borderRadius:10}}
                dropdownStyle={{borderRadius:10,marginTop:-30}}              
                rowTextStyle={{fontSize:16}}
                onSelect={(item) => setMonth(item)}
                // onBlur={selectHandler}
              />
              <SelectDropdown
                data={years}
                defaultButtonText={cyear}
                buttonStyle={{width:'30%',borderRadius:10}}
                dropdownStyle={{borderRadius:10,marginTop:-30}}
                rowTextStyle={{fontSize:16}}
                onSelect={(item) => setYear(item)}
                // onBlur={selectHandler}
              />     
          </View>
          <View style={{flex:1,justifyContent:'center',marginTop:100}}>
            {/* <Doughnut data={dohnurtdata} /> */}
            <ProgressChart
              data={data}
              width={screenWidth}
              height={300}
              chartConfig={chartConfig}
              // accessor={"population"}
              // backgroundColor={"transparent"}
              // strokeWidth={10}
              // radius={10}
              // hideLegend={false}              
            />
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
