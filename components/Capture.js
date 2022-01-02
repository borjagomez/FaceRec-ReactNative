// ./components/Camera.js
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export default function Capture() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [faceDetected, setFaceDetected] = useState(false);
  
  let camera:Camera;
  let photo = null;
  const faceMessage = faceDetected ? 'Face Detected' : 'No Face';

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
  );
}

const styles = StyleSheet.create({
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
});
