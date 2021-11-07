import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import logo from './assets/rever-logo.jpg';
import * as FaceDetector from 'expo-face-detector';
import Tflite from 'tflite-react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isTfReady, setIsTfReady] = useState(false);

  let camera:Camera;
  let photo = null;
  const faceMessage = faceDetected ? 'Face Detected' : 'No Face';
  let tflite = new Tflite();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      tflite.loadModel({
        model: 'models/mobilefacenet.tflite',
        labels: '',  
        numThreads: 1,
      },
      (err, res) => {
        if(err)
          console.log(err);
        else
          console.log(res);
      });

    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      photo = await camera.takePictureAsync();
    }
  };

  const handleFacesDetected = (event) => {
    if (event.faces.length > 0) {
      const faceY = event.faces[0].bounds.origin.y;
      const faceHeight = event.faces[0].bounds.size.height;
      if (faceY + faceHeight < 300) setFaceDetected(true);
      else setFaceDetected(false);
    } else setFaceDetected(false);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} /> 

      <View>
        <Camera style={styles.camera} type={type} 
          ref={ref => {
            camera = ref;
          }} 
          
          onFacesDetected={handleFacesDetected}
          
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <Text style={styles.label}>{faceMessage}</Text>
      </View>

      <TouchableOpacity
        onPress={takePhoto}
        style={styles.buttonCapture}
        disabled={!faceDetected}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    width: 100,
    height: 100 
  },
  camera: {
    width:300,
    height: 300
  },  
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    width: '100%'
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  label: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },
  buttonCapture: {
    backgroundColor: "#888",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }  
});
