import { useRef, useState } from "react"
import {
   Alert,
   Button,
   Image,
   StyleSheet,
   Text,
   TouchableOpacity,
   useWindowDimensions,
   View,
} from "react-native"

import { router } from "expo-router"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"

import { Ionicons } from "@expo/vector-icons"

import { useThemeColor } from "@/presentation/theme/components/hooks/useThemeColor"
import { useCameraStore } from "@/presentation/store/useCameraStore"

export default function CameraScreen() {
   const { addSelectedImage } = useCameraStore()

   const [facing, setFacing] = useState<CameraType>("back")
   const [cameraPermission, requestCameraPermission] = useCameraPermissions()
   const [mediaPermission, requestMediaPermission] =
      MediaLibrary.usePermissions()

   const [selectedImage, setSelectedImage] = useState<string>()

   const cameraRef = useRef<CameraView>(null)

   const onRequestPermissions = async () => {
      try {
         const { status: cameraPermissionStatus } =
            await requestCameraPermission()

         if (cameraPermissionStatus != "granted") {
            Alert.alert(
               "Lo siento",
               "Necesitamos permisos a la cámara para tomar fotos"
            )
         }

         const { status: mediaPermissionStatus } =
            await requestMediaPermission()

         if (mediaPermissionStatus != "granted") {
            Alert.alert("Lo siento", "Necesitamos permisos a la galería")
         }
      } catch (error) {
         console.log(error)
         Alert.alert("Error", "No se pudo obtener los permisos")
         throw new Error(`${error}`)
      }
   }

   if (!cameraPermission) {
      // Camera permissions are still loading.
      return <View />
   }

   if (!cameraPermission.granted || !mediaPermission?.granted) {
      // Camera permissions are not granted yet.
      return (
         <View style={styles.container}>
            <Text style={styles.message}>
               We need your permission to show the camera
            </Text>
            <Button onPress={onRequestPermissions} title="grant permission" />
         </View>
      )
   }

   const onShutterButtonPress = async () => {
      if (!cameraRef.current) return

      const picture = await cameraRef.current.takePictureAsync({
         quality: 0.7,
      })

      // console.log(picture)

      setSelectedImage(picture?.uri)
      if (picture?.uri) return
   }

   const onReturnCancel = () => {
      // TODO: Limpiar el estado

      router.dismiss()
   }

   const onPictureAccepted = async () => {
      if (!selectedImage) return

      await MediaLibrary.createAssetAsync(selectedImage)

      addSelectedImage(selectedImage)

      router.dismiss() //Para cerrar la pantalla actual y regresar donde estabamos
   }

   const onPictureCancel = () => {
      //Retake photo
      setSelectedImage(undefined)
   }

   const onPickImages = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ["images"],
         // allowsEditing: true,
         aspect: [4, 3], // ancho, alto
         quality: 0.5,
         allowsMultipleSelection: true,
         selectionLimit: 5
      })


      if(result.canceled) return
      
      result.assets.forEach(e => addSelectedImage(e.uri))

      router.dismiss()
      // addSelectedImage(result.assets.map( (e) => e.uri))
   }

   function toggleCameraFacing() {
      setFacing((current) => (current === "back" ? "front" : "back"))
   }

   if (selectedImage) {
      return (
         <View style={styles.container}>
            <Image source={{ uri: selectedImage }} style={styles.camera} />
            <ConfirmImageButton onPress={onPictureAccepted} />
            <RetakeImageButton onPress={onPictureCancel} />
            <ReturnCancelButton onPress={onReturnCancel} />
         </View>
      )
   }

   return (
      <View style={styles.container}>
         <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <ShutterButton onPress={onShutterButtonPress} />
            <FlipCameraButton onPress={toggleCameraFacing} />
            <ReturnCancelButton onPress={onReturnCancel} />
            {/* TODO: Redirigir a la galeria para seleccionar foto*/}
            <GalleryButton onPress={onPickImages}/>
         </CameraView>
      </View>
   )
}

// Custom Components

const ShutterButton = ({ onPress = () => {} }) => {
   const dimensions = useWindowDimensions()
   const primaryColor = useThemeColor({}, "primary")

   return (
      <TouchableOpacity
         onPress={onPress}
         style={[
            styles.shutterButton,
            {
               position: "absolute",
               bottom: 30,
               left: dimensions.width / 2 - 32,
               borderColor: primaryColor,
            },
         ]}
      ></TouchableOpacity>
   )
}

const FlipCameraButton = ({ onPress = () => {} }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
         <Ionicons name="camera-reverse-outline" size={30} color={"white"} />
      </TouchableOpacity>
   )
}

const GalleryButton = ({ onPress = () => {} }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
         <Ionicons name="images-outline" size={30} color={"white"} />
      </TouchableOpacity>
   )
}

const ReturnCancelButton = ({ onPress = () => {} }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
         <Ionicons name="arrow-back-outline" size={30} color={"white"} />
      </TouchableOpacity>
   )
}

const ConfirmImageButton = ({ onPress = () => {} }) => {
   const dimensions = useWindowDimensions()
   const primaryColor = useThemeColor({}, "primary")

   return (
      <TouchableOpacity
         onPress={onPress}
         style={[
            styles.shutterButton,
            {
               position: "absolute",
               bottom: 30,
               left: dimensions.width / 2 - 32,
               borderColor: primaryColor,
            },
         ]}
      >
         <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
      </TouchableOpacity>
   )
}

const RetakeImageButton = ({ onPress = () => {} }) => {
   return (
      <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
         <Ionicons name="close-outline" size={30} color={"white"} />
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
   },
   message: {
      textAlign: "center",
      paddingBottom: 10,
   },
   camera: {
      flex: 1,
   },
   buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
   },
   button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
   },
   text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
   },

   shutterButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: "white",
      borderColor: "red",
      borderWidth: 4,
      justifyContent: "center",
      alignItems: "center",
   },

   flipCameraButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: "#17202A",
      position: "absolute",
      bottom: 40,
      right: 32,
      justifyContent: "center",
      alignItems: "center",
   },

   galleryButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: "#17202A",
      position: "absolute",
      bottom: 40,
      left: 32,
      justifyContent: "center",
      alignItems: "center",
   },

   returnCancelButton: {
      width: 50,
      height: 50,
      borderRadius: 32,
      backgroundColor: "#17202A",
      position: "absolute",
      top: 42,
      left: 10,
      justifyContent: "center",
      alignItems: "center",
   },
})
