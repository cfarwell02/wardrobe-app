import { useWardrobe } from "@/context/WardrobeContext"; // ✅ Import the context
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function AddItemScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null); // Color state if needed
  const { addItem } = useWardrobe(); // ✅ Use the context to add items

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
    if (!image || !category || !color) {
      Alert.alert(
        "Missing Info",
        "Please make sure all categories are filled out."
      );
      return;
    }

    const newItem = { image, category, color };
    addItem(newItem); // ✅ Add to global wardrobe context

    // Reset form
    setImage(null);
    setCategory(null);
    setColor(null);
    Alert.alert("Item Saved!", "Your clothing item has been saved.");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Take Photo" onPress={takePhoto} />
        <Button title="Pick from Gallery" onPress={pickImage} />

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker} // 👈 Force visible text for the selected item
          >
            <Picker.Item label="Select a category" value={null} color="#aaa" />
            <Picker.Item label="Shirt" value="shirt" color="#000" />
            <Picker.Item label="Shorts" value="shorts" color="#000" />
            <Picker.Item label="Skirt" value="skirt" color="#000" />
            <Picker.Item label="Pants" value="pants" color="#000" />
            <Picker.Item label="Shoes" value="shoes" color="#000" />
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={color}
            onValueChange={(itemValue) => setColor(itemValue)}
            style={styles.picker} // 👈 Force visible text for the selected item
          >
            <Picker.Item label="Select a color" value={null} color="#aaa" />
            <Picker.Item label="Red" value="red" color="#000" />
            <Picker.Item label="Blue" value="blue" color="#000" />
            <Picker.Item label="Green" value="green" color="#000" />
            <Picker.Item label="Black" value="black" color="#000" />
            <Picker.Item label="White" value="white" color="#000" />
          </Picker>
        </View>

        <Button title="Save Item" onPress={saveItem} />
      </ScrollView>
    </SafeAreaView>
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
    height: 40, // ↓ Lower the height
    fontSize: 14, // ↓ Smaller text
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 8,
    marginTop: 12,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});
