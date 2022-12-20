import React, { Component } from 'react';

import {
  StyleSheet,
} from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera as Camera } from 'react-native-camera';

const ScanQR = () => {
  
  const  onSuccess = e => {
    console.log('scan obj', e.data)
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      fadeIn={false}
        reactivate={false}
        reactivateTimeout={1000}
      // flashMode={Camera.Constants.FlashMode.torch}
      containerStyle={{alignItems:'center',justifyContent:'center'}}
      cameraStyle={{height:80,width:300}}
    />
  );
}

const styles = StyleSheet.create({
  /* centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  } */
});

export default ScanQR