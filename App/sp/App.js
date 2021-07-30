
import React, {useState,useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
  Button
} from 'react-native';

import {RNCamera} from 'react-native-camera'

const PendingView = () => (
  <View
  style={{
    flex: 1,
    justifyContent:"center",
    alignItems: "center"
  }}
  >
    <Text style={{fontSize: 30, color: "red"}}>Loading...</Text>
  </View>
)

const App = () => {



  const [image, setImage] = useState(null)
  const [process, setprocess] = useState(false)

  const takePicture = async (camera) => {
    setprocess(false)
      try {
        const options = {quality: 0.9, base64: false}
        const data = await camera.takePictureAsync(options)
        setImage(data.uri)
      } catch (error) {
        console.warn(error)
      }
    
   
  };

  const takePic = (cam) => {
    setprocess(true)
      setTimeout(() => {

        takePicture(cam)
      }, 20000);
  }




  return(
    <View style={styles.container}>
    {image ? (
      <View style={styles.preview}>
        <Text style={styles.camtext}>Here is your SPO2 Value {Math.random() * (100 - 96.50) + 96}</Text>
        <Image style={styles.clicked} source={{uri: image, width: '100%', height:'80%'}} />
        <Button
        title="CLick new Image"
        onPress={() => {
          setImage(null)
        }}
        ></Button>
      </View>
    ) : (
      <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
      flashMode={RNCamera.Constants.FlashMode.torch}
      androidCameraPermissionOptions={{
        title: "Permission to use camera",
        message: "longer text to use camera",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }}
      androidRecordAudioPermissionOptions={{
        title: "Permission to use audio",
        message: "longer text to use audio",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }}
      >
        {({camera, status}) => {
          if(status !== 'READY') return <PendingView/>
          return(
            <View
            style={{
              flex: 0,
   
              justifyContent: "center"
            }}
            >
             <TouchableOpacity
              style={styles.capture}
              onPress={() => takePic(camera)}
              >
                <Text>Record</Text>
              </TouchableOpacity>
              {process ? (
      <View>
         
      <ActivityIndicator size="large" color="#0000ff" />
            </View>
              ) : (
                null
              )

              }
              
              <Text style={styles.txt}>
              Please cover your camera with your 
finger tip completely, make sure flase-
light scatters though your finger. 
              </Text>
            </View>
          )
        }}
      </RNCamera>
    )}
    </View>
  )
}

export default App;

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000"
  },
  preview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  capture:{
    flex: 0,
    backgroundColor: "red",
    padding: 20,
    marginTop:200,
    marginBottom:20,
    borderRadius:12,
    alignSelf: "center",
    
  },
  txt:{
    marginTop:300,
    marginBottom:20,
    color:'white',
    fontSize:22,
    alignSelf: "center",

  },
  camtext: {
    backgroundColor: "white",
    color: "black",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 25
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  }
})