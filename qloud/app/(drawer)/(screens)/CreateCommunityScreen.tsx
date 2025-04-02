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
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface SocialLinksState {
  instagram: string;
  linkedin: string;
  discord: string;
  xcom: string;
}

interface ActiveLinksState {
  [key: string]: boolean;
}

interface CommunityMessage {
  id: string;
  profileImage: string;
  communityName: string;
}



const CreateCommunityScreen: React.FC = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState<
    { id: string; uri: string; name: string }[]
  >([]);

  const [communityName, setCommunityName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinksState>({
    instagram: "",
    linkedin: "",
    discord: "",
    xcom: "",
  });

  const [activeLinks, setActiveLinks] = useState<ActiveLinksState>({});
  const [messages, setMessages] = useState<CommunityMessage[]>([]);

  const toggleLink = (platform: string) => {
    setActiveLinks((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const handleSocialSignIn = async (platform: string) => {
    let url = "";
    switch (platform) {
      case "instagram":
        url = "https://www.instagram.com/accounts/login/";
        break;
      case "linkedin":
        url = "https://www.linkedin.com/login";
        break;
      case "discord":
        url = "https://discord.com/login";
        break;
      case "xcom":
        url = "https://twitter.com/login";
        break;
    }
    try {
      await Linking.openURL(url);
      setActiveLinks((prev) => ({ ...prev, [platform]: true }));
      Alert.alert(`${platform} connected successfully!`);
    } catch (error) {
      Alert.alert("Failed to open link");
    }
  };

  const handleSend = () => {
    console.log("Sending message with community name:", communityName);

    const newMessage = {
      id: Date.now().toString(),
      profileImage: images[0]?.uri || "",
      communityName: communityName || "Community",
    };
    setMessages((prev) => [...prev, newMessage]);

    // Navigate and pass params
    router.push({
      pathname: "/(drawer)/(screens)/CommunityMessage",
      params: {
        communityName,
        profileImage: images[0]?.uri || "",
      },
    });
  };

  const handleLinkPresses = (platform: keyof SocialLinksState) => {
    const url = socialLinks[platform];
    if (url) {
      console.log(`Opening ${url}`);
    }
  };

  const handleSave = () => {
    Alert.alert("Community Saved!");
  };

  const renderIcon = (platform: keyof SocialLinksState, iconName: string) => (
    <TouchableOpacity onPress={() => handleSocialSignIn(platform)}>
      <Ionicons
        name={iconName}
        size={32}
        color={activeLinks[platform] ? "#000" : "#ccc"}
      />
    </TouchableOpacity>
  );

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
    </View>
  );

  const renderFilea = ({
    item,
  }: {
    item: { id: string; uri: string; name: string };
  }) => (
    <View style={styles.fileContainer}>
      <Image source={{ uri: item.uri }} style={styles.fileImageq} />
    </View>
  );

  const [images, setImages] = useState<
    { id: string; uri: string; name: string }[]
  >([]);
  const [profileImages, setProfileImages] = useState<
    { id: string; uri: string; name: string }[]
  >([]);

  const handleUploadImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
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
          setImages((prevImages) => [...prevImages, newImage]); // Add image to images state
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the image.");
    }
  };

  const handleUploadProfileImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          const newProfileImage = {
            id: profileImages.length.toString(),
            uri: assets[0].uri,
            name: assets[0].name,
          };
          setProfileImages((prevProfileImages) => [
            ...prevProfileImages,
            newProfileImage,
          ]); // Add image to profileImages state
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the profile image.");
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL: ", err)
    );
  };

  const groupImagesIntoRows = (
    images: { id: string; uri: string; name: string }[],
    rows: number
  ) => {
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
        <View style={styles.containert}>
          <View style={styles.containert}>
            {/* Upload Image Button */}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadImage}
            >
              {images.length > 0 ? (
                <FlatList
                  data={images}
                  keyExtractor={(item) => item.id}
                  renderItem={renderFile}
                  horizontal
                  contentContainerStyle={styles.fileList} // Ensure styling fits inside button
                />
              ) : (
                <View style={styles.imageText}>
                  <Image
                    source={require("../../../assets/add.png")}
                    style={styles.imageTexts}
                  />
                  <Text style={styles.uploadButtonText}>Tap to Add</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Second Upload Profile Image Button */}
            <TouchableOpacity
              style={styles.uploadButtona}
              onPress={handleUploadProfileImage}
            >
              {profileImages.length > 0 ? (
                <FlatList
                  data={profileImages}
                  keyExtractor={(item) => item.id}
                  renderItem={renderFile}
                  horizontal
                  contentContainerStyle={styles.fileList} // Ensure styling fits inside button
                />
              ) : (
                <View style={styles.imageText}>
                  <Image
                    source={require("../../../assets/add.png")}
                    style={styles.imageTexts}
                  />
                  <Text style={styles.uploadButtonText}>Tap to Add</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Community Name Input */}
          <View style={styles.nameinput}>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Your community name"
                value={communityName}
                onChangeText={setCommunityName}
              />
            </View>
            <View>
              {/* Category Selector */}

              <TouchableOpacity
                style={styles.selectedCategory}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.categoryText}>
                  {selectedCategory || "Pick Category"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

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
          <View style={styles.iconContainer}>
            {renderIcon("instagram", "logo-instagram")}
            {renderIcon("linkedin", "logo-linkedin")}
            {renderIcon("discord", "logo-discord")}
            {renderIcon("xcom", "logo-twitter")}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (selectedScreen === "SubmissionScreen") {
    return (
      <View style={styles.containers}>
        <View style={styles.acontainers}>
          <FlatList
            data={[...images, ...profileImages]} // Combine both lists
            keyExtractor={(item) => item.id}
            renderItem={renderFilea}
            contentContainerStyle={{
              gap: 16,
              flexDirection: "column",
            }}
          />
          <View style={styles.aacontainers}>
            <Text style={styles.submittedText}>{communityName}</Text>
            <Text style={styles.submittedText}>{selectedCategory}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSave}>
            <Image
              source={require("../../../assets/save.png")}
              style={styles.detailImagea}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image
              source={require("../../../assets/sent.png")}
              style={styles.detailImagea}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.socialLinksText}>Social Links:</Text>

        <View>
          <FlatList
            data={Object.keys(activeLinks).filter(
              (platform) => activeLinks[platform]
            )}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View>
                <Ionicons
                  name={
                    item === "instagram"
                      ? "logo-instagram"
                      : item === "linkedin"
                      ? "logo-linkedin"
                      : item === "discord"
                      ? "logo-discord"
                      : "logo-twitter"
                  }
                  size={32}
                  color="#000"
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  detailImagea: {
    width: 17,
    height: 17,
  },
  containers: {
    flexDirection: "column",
    gap: 32,
  },
  acontainers: {
    flexDirection: "column",
    gap: 8,
  },
  aacontainers: {
    flexDirection: "column",
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  containert: {
    flexDirection: "column",
    gap: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 10,
    marginBottom: 15,
    width: 300,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 8,
    color: "black",
    justifyContent: "center",
    width: 273,
    height: 123,
  },
  uploadButtona: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 8,
    color: "black",
    width: 150,
    justifyContent: "center",
    height: 150,
  },
  imageText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  imageTexts: {
    width: 30,
    height: 30,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  fileList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fileGrid: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  fileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fileImage: {
    width: 250,
    height: 100,
    borderRadius: 8,
  },
  fileImageq: {
    width: 300,
    height: 200,
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
  nameinput: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  saveButton: {
    backgroundColor: "#D4D4D4",
    padding: 10,
    borderRadius: 8,
  },
  sendButton: {
    borderColor: "#D4D4D4",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
  },
});

export default CreateCommunityScreen;
