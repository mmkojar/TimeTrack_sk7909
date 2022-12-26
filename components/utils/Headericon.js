import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { navigate } from '../../services/RootNavigation';


const Headericon = () => {
  return (
        <View>
            <Button onPress={() => {
                navigate('Home');
            }}>
            <FontAwesome5
            name="home"
            size={20}
            color="#fff"
            style={{marginRight:20}}
            />
        </Button>
    </View>
  );
};

export default Headericon;