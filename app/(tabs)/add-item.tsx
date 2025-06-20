import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function AddItemScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<
    { image: string; category: string | null }[]
  >([]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraStatus.status !== "granted" ||
        mediaStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permission Required",
          "Camera and media library permissions are required to use this feature."
        );
      }
    })();
  }, []);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveItem = () => {
    if (!image || !category) {
      Alert.alert(
        "Missing Info",
        "Please take or pick a photo and select a category."
      );
      return;
    }

    const newItem = { image, category };
    setSavedItems([...savedItems, newItem]);

    //Reset form
    setImage(null);
    setCategory(null);
    Alert.alert("Item Saved!", "Your clothin item has been saved.");
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      <Button title="Pick from Gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={{ marginTop: 20 }}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          placeholder={{ label: "Select a category", value: null }}
          items={[
            { label: "Shirt", value: "shirt" },
            { label: "Shorts", value: "shorts" },
            { label: "Skirt", value: "skirt" },
            { label: "Pants", value: "pants" },
            { label: "Shoes", value: "shoes" },
          ]}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 16,
    alignSelf: "center",
  },
  picker: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});
