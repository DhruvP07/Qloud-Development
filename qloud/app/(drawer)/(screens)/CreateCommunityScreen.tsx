import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Linking
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "react-native";

const CreateCommunityScreen: React.FC = () => {
  const [files, setFiles] = useState<
    { id: string; uri: string; name: string }[]
  >([]);
  const [images, setImages] = useState<
    { id: string; uri: string; name: string }[]
  >([]);
  const [communityName, setCommunityName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
    discord: "",
    xcom: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("CreateCommunityScreen"); // Track the current screen

  const categories = ["Technology", "Art", "Music", "Gaming"];

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false); // Close the modal after selecting a category
  };

  const [selsocialLinks, setSelsocialLinks] = useState<string[]>([]);

  const handleUpload = async (type: "image" | "file") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === "image" ? "image/*" : "*/*", // Different file types based on selection
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          const newFile = {
            id: files.length.toString(),
            uri: assets[0].uri,
            name: assets[0].name,
          };
          if (type === "image") {
            setImages((prevImages) => [...prevImages, newFile]);
          } else {
            setFiles((prevFiles) => [...prevFiles, newFile]);
          }
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the file.");
    }
  };

  const handleSubmit = () => {
    if (!communityName || !selectedCategory) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    // Switch to the submission view
    setSelectedScreen("SubmissionScreen");

    const validSocialLinks = Object.values(socialLinks).filter(Boolean); // Filter out any empty strings
    setSelsocialLinks(validSocialLinks);
  };

  const handleBack = () => {
    // Switch back to the form view
    setSelectedScreen("CreateCommunityScreen");
  };

  const renderFile = ({
    item,
  }: {
    item: { id: string; uri: string; name: string };
  }) => (
    <View style={styles.fileContainer}>
      <Image source={{ uri: item.uri }} style={styles.fileImage} />
      {/* <Text style={styles.fileName}>{item.name}</Text> */}
    </View>
  );

  const handleUploadImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Set the type to image only
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          const newImage = {
            id: images.length.toString(),
            uri: assets[0].uri,
            name: assets[0].name,
          };
          setImages((prevImages) => [...prevImages, newImage]); // Add image to state
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the image.");
    }
  };

  // Upload Profile Image handler (for profile image)
  const handleUploadProfileImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Set the type to image only
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          // Handle the profile image upload (just an example here)
          Alert.alert(
            "Profile Image Uploaded",
            `Profile image: ${assets[0].name}`
          );
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the profile image.");
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL: ", err));
  };

  const groupImagesIntoRows = (images: { id: string; uri: string; name: string }[], rows: number) => {
    const grouped: { id: string; uri: string; name: string }[][] = [];
    
    for (let i = 0; i < images.length; i += rows) {
      grouped.push(images.slice(i, i + rows));
    }
    
    return grouped;
  };

  const groupedImages = groupImagesIntoRows(images, 2); 
  if (selectedScreen === "CreateCommunityScreen") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Community</Text>

        {/* First Upload Image Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadImage}
        >
          <Text style={styles.uploadButtonText}>Upload General Image</Text>
        </TouchableOpacity>

        {/* Second Upload Profile Image Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadProfileImage}
        >
          <Text style={styles.uploadButtonText}>Upload Profile Image</Text>
        </TouchableOpacity>

        {/* Render Uploaded Images */}
        <FlatList
    data={groupedImages}
    keyExtractor={(item, index) => index.toString()} // You can change this to something unique in your data
    renderItem={({ item }) => (
      <View style={styles.rowContainer}>
        {item.map((image) => (
          <Image key={image.id} source={{ uri: image.uri }} style={styles.fileImage} />
        ))}
      </View>
    )}
    contentContainerStyle={styles.fileGrid}
  />

        {/* Community Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Your community name"
          value={communityName}
          onChangeText={setCommunityName}
        />

        {/* Category Selector */}
        <Text style={styles.label}>Select Category:</Text>
        <TouchableOpacity
          style={styles.selectedCategory}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.categoryText}>
            {selectedCategory || "Select a category..."}
          </Text>
        </TouchableOpacity>

        {/* Modal for selecting category */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => handleSelectCategory(item)}
                  >
                    <Text style={styles.categoryItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Social Links */}
        <TextInput
          style={styles.input}
          placeholder="Instagram Link"
          value={socialLinks.instagram}
          onChangeText={(text) =>
            setSocialLinks({ ...socialLinks, instagram: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="LinkedIn Link"
          value={socialLinks.linkedin}
          onChangeText={(text) =>
            setSocialLinks({ ...socialLinks, linkedin: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Discord Link"
          value={socialLinks.discord}
          onChangeText={(text) =>
            setSocialLinks({ ...socialLinks, discord: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="X.com Link"
          value={socialLinks.xcom}
          onChangeText={(text) =>
            setSocialLinks({ ...socialLinks, xcom: text })
          }
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (selectedScreen === "SubmissionScreen") {
    return (
      <View style={styles.containers}>
      {/* Render Images vertically */}
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderFile}
      />

      <Text style={styles.submittedText}>
        Community Name: {communityName}
      </Text>
      <Text style={styles.submittedText}>
        Category: {selectedCategory}
      </Text>

      <Text style={styles.socialLinksText}>Social Links:</Text>

      <View>
        {selsocialLinks && selsocialLinks.length > 0 ? (
          selsocialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(link)}
              
            >
              <Text>{link}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No social links available</Text>
        )}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  containers: {
    height: 600,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  fileGrid: {
    justifyContent: "center",
    flex:1,
    flexDirection: 'column'
  },
  fileContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  fileImage: {
    width: 250,
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  fileName: {
    fontSize: 14,
    textAlign: "center",
  },
  categorySelector: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "blue",
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "column", 
    justifyContent: "center", 

  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  categoryItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedCategory: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  submittedDataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  submittedDataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  submittedFilesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  submittedText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  socialLinksText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  socialLinksContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  socialLinkButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
  },
  socialLinkText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateCommunityScreen;
