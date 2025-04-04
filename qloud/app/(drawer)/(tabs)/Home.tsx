import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

interface CommunityMessage {
  id: string;
  profileImage: string;
  communityName: string;
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Feed" | "Qloud">("Feed");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [communityName, setCommunityName] = useState("");

  const posts = [
    {
      id: 1,
      username: "@hisroyalfreshness_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "4d",
      content:
        "I just got my team for this business yesterday and this is it so far, let me know what you think",
      likes: "7.8K",
      comments: "233",
      shares: "1.4K",
      image: require("../../../assets/team.jpg"), // Replace with your image path
    },
    {
      id: 2,
      username: "@martineetodayhh_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "3w",
      content: "I made a shoes brand that is based off old money",
      likes: "24K",
      comments: "983",
      shares: "7.9K",
      image: require("../../../assets/shoes.jpg"), // Replace with your image path
    },
    {
      id: 3,
      username: "@designwithme_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "2w",
      content:
        "Just launched my new design portfolio! Check it out and let me know what you think! 🚀",
      likes: "12K",
      comments: "567",
      shares: "3.1K",
      image: require("../../../assets/design.jpg"), // Replace with your image path
    },
    {
      id: 4,
      username: "@codingenthusiast_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "5d",
      content:
        "Developed a React Native app that tracks fitness goals. Feeling pumped! 💪",
      likes: "8.2K",
      comments: "421",
      shares: "2.7K",
      image: require("../../../assets/conn1.png"), // Replace with your image path
    },
    {
      id: 5,
      username: "@foodielove_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "1d",
      content:
        "Discovered the best sushi spot in town. Look at this amazing platter! 🍣",
      likes: "15K",
      comments: "678",
      shares: "4.2K",
      image: require("../../../assets/sushi.jpg"), // Replace with your image path
    },
    {
      id: 6,
      username: "@wanderlustlife_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "1w",
      content:
        "Exploring the hidden beaches of Bali 🌴. This view is absolutely breathtaking!",
      likes: "20K",
      comments: "890",
      shares: "5.6K",
      image: require("../../../assets/bali.jpg"), // Replace with your image path
    },
    {
      id: 7,
      username: "@petparent_",
      profilePic: require("../../../assets/profile-icon-9.png"), // Replace with your image path
      time: "3d",
      content: "Adopted a new puppy today! Meet Max 🐶. Isn’t he the cutest?",
      likes: "18K",
      comments: "1.2K",
      shares: "6.3K",
      image: require("../../../assets/puppy.jpg"), // Replace with your image path
    },
   
  ];

  const userPost = [
    {
      id: 1,
      username: "@user",
      profilePic: require("../../../assets/dog.png"), // Replace with your image path
      input: 'Post an update...'
    },
  ]

  const handleTabPress = (tab: "Feed" | "Qloud") => {
    Animated.spring(new Animated.Value(0), {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => setActiveTab(tab));
  };

  const handlePostStory = () => {
    if (!newStory.trim() && !storyImage) return; // Prevent empty story

    const newStoryObj = {
      id: stories.length + 1,
      profilePic: storyImage || require("../../../assets/profile-icon-9.png"),
      username: "You",
      content: newStory,
      time: "Just now",
    };

    setStories([newStoryObj]); // Set only latest story
    setShowModal(false);
    setNewStory("");
    setStoryImage(null); // Clear selected image
  };

  const [activeStep, setActiveStep] = useState(2); // Current progress step (e.g., 1 for "Foundation", 2 for "Development")

  const animatedValues = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(0.5),
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValues.scale, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues.scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.timing(animatedValues.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (showStory) {
      const timer = setTimeout(() => setShowStory(false), 5000); // Auto-close after 5s
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    startAnimation();
  }, [activeStep]);

  const progressSteps = ["Foundation", "Development", "Launch", "Scale"];
  const [stories, setStories] = useState([
    {
      id: 0,
      profilePic: require("../../../assets/dog.png"),
      username: "You",
      content: "Tap to add your first story!",
      time: "",
    },
  ]);

  const [newStory, setNewStory] = useState<string>(""); // Input value
  const [showStory, setShowStory] = useState(false); // Control story pop-out
  const [currentStory, setCurrentStory] = useState<any | null>(null); // Track current story
  const [storyImage, setStoryImage] = useState<string | null>(null); // Image URI

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          const imageUri = assets[0].uri;
          setStoryImage(imageUri); // Set image for the story
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the file.");
    }
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

  return (
    <View style={styles.container}>
      {/* Tabs for feed and Qloud*/}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabPress("Feed")}
          style={[styles.tab, activeTab === "Feed" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Feed" && styles.activeTabText,
            ]}
          >
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("Qloud")}
          style={[styles.tab, activeTab === "Qloud" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Qloud" && styles.activeTabText,
            ]}
          >
            Qloud
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed Section */}
      {activeTab === "Feed" && (
        <>
          <ScrollView contentContainerStyle={styles.feedContainer}>
            {/* user story including default user stories reel and our own add to story reel */}
            <ScrollView horizontal style={styles.stories}>
              {/* User’s "Add Story" Button */}
              <TouchableOpacity
                style={styles.story}
                onPress={() => {
                  if (stories.length > 0) {
                    setCurrentStory(stories[0]); // Show the latest story
                    setShowStory(true);
                  } else {
                    setShowModal(true); // Open story creation modal
                  }
                }}
              >
                <Image
                  source={
                    stories.length > 0
                      ? { uri: stories[0].profilePic } // Show latest story image
                      : require("../../../assets/dog.png") // Default placeholder
                  }
                  style={styles.storyImage}
                />
                <TouchableOpacity
                  style={styles.fab}
                  onPress={() => setShowModal(true)}
                >
                  <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
                <Text>{stories.length > 0 ? "Your Story" : "Add Story"}</Text>
              </TouchableOpacity>

              {/* render story */}
              <Modal visible={showStory} transparent animationType="fade">
                <TouchableOpacity
                  onPress={() => setShowStory(false)}
                  style={styles.modalBackdrop}
                >
                  <View style={styles.modalContent}>
                    {currentStory && (
                      <>
                        <Image
                          source={currentStory.profilePic}
                          style={styles.modalProfileImage}
                        />
                        <Text style={styles.username}>
                          {currentStory.username}
                        </Text>
                        <Text style={styles.time}>{currentStory.time}</Text>
                        <Text style={styles.content}>
                          {currentStory.content}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Render Default Posts */}
              {posts.map((post) => (
                <TouchableOpacity key={post.id} style={styles.story}>
                  <Image source={post.profilePic} style={styles.storyImage} />
                  <Text style={styles.storyText}>
                    {post.username.split("@")[1]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* reel default posts */}
            {posts.map((post) => (
              <View key={post.id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={post.profilePic} style={styles.profileImage} />
                  <View>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.time}>{post.time}</Text>
                  </View>
                </View>
                <Text style={styles.content}>{post.content}</Text>
                <Image source={post.image} style={styles.postImage} />
                <View style={styles.postFooter}>
                  <Text style={styles.bottom}>❤️ {post.likes}</Text>
                  <Text style={styles.bottom}>💬 {post.comments}</Text>
                  <Text style={styles.bottom}>🔄 {post.shares}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* create story */}
          <Modal visible={showModal} animationType="slide" transparent>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>New Idea</Text>
              </View>
              <View style={styles.modalBody}>
                <View style={styles.inputRow}>
                  <View style={styles.inputCow}>
                    {" "}
                    <Image
                      source={require("../../../assets/profile-icon-9.png")}
                      style={styles.modalProfileImage}
                    />
                    <TextInput
                      placeholder="Update the world?"
                      placeholderTextColor="#aaa"
                      style={styles.input}
                      multiline
                    />
                  </View>

                  {storyImage && (
                    <Image
                      source={{ uri: storyImage }}
                      style={styles.fileImage}
                    />
                  )}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity>
                    <Text style={styles.icon}>
                      <Icon name="camera" size={24} color="white" />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.icon}>
                      <Icon name="image" size={24} color="white" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.post}>
                  <View style={styles.posta}>
                    {/* Upload Image Icon */}
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={handleUpload}
                    >
                      <Ionicons name="image-outline" size={24} color="#666" />
                    </TouchableOpacity>

                    {/* Camera Icon */}
                    <TouchableOpacity style={styles.iconButton}>
                      <Ionicons name="camera-outline" size={24} color="#666" />
                    </TouchableOpacity>

                    {/* link Icon */}
                    <TouchableOpacity style={styles.iconButton}>
                      <Image source={require("../../../assets/link.png")} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.postButton}
                    onPress={handlePostStory}
                  >
                    <Text style={styles.postButtonText}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </>
      )}

      {/* qloud tab */}
      {activeTab === "Qloud" && (
        <View style={styles.qloudContainer}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <View style={styles.progress}>
            {progressSteps.map((step, index) => (
              <View style={styles.stepContainer} key={index}>
                {/* Line between steps */}
                {index !== 0 && (
                  <View
                    style={[
                      styles.progressLine,
                      index <= activeStep && styles.activeLine,
                    ]}
                  />
                )}
                {/* Animated Circle */}
                <TouchableOpacity
                  style={[
                    styles.progressCircle,
                    index <= activeStep
                      ? styles.activeCircle
                      : styles.inactiveCircle,
                  ]}
                  onPress={() => setActiveStep(index)}
                >
                  {index === activeStep ? (
                    <Animated.View
                      style={[
                        styles.pulseEffect,
                        {
                          transform: [{ scale: animatedValues.scale }],
                          opacity: animatedValues.opacity,
                        },
                      ]}
                    />
                  ) : null}
                  <Text style={styles.progressText}>{step}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%", // Set width of the modal
    height: 700, // Set height of the modal
    padding: 20, // Add padding inside the modal
    backgroundColor: "white", // Background color of the modal content
    borderRadius: 10, // Rounded corners
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  modalProfileImage: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    borderRadius: 50, // Make the image circular
    marginBottom: 15, // Add spacing below the image
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
  posta: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    flexDirection: "row",
    bottom: 400,
    gap: 150,
  },
  iconButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  stories: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  story: {
    alignItems: "center",
    marginHorizontal: 10,
    position: "relative",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#f77",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  postsContainer: {
    paddingHorizontal: 10,
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#111",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  content: {
    marginVertical: 10,
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    color: "#555",
  },
  bottom: {
    fontWeight: 600,
  },
  fab: {
    position: "absolute",
    bottom: 18,
    right: 0,
    backgroundColor: "#0195F5",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  fabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Aligns items vertically
    marginBottom: 18,
    position: "relative",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center", // Centers text horizontally
    flex: 1, // Ensures the text takes up all the available space
  },
  cancelText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1,
    justifyContent: "space-between",
  },
  inputCow: {
    flexDirection: "row",
  },
  inputRow: {
    flexDirection: "column",
    gap: 24,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
    height: 150,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: -150,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  postButton: {
    backgroundColor: "#757575",
    borderRadius: 30,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",

    width: 100,
    height: 55,
  },
  postButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  tabText: {
    color: "gray",
    fontSize: 16,
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  feedContainer: {
    paddingHorizontal: 10,
  },
  qloudContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeCircle: {
    backgroundColor: "#34C759",
    elevation: 5,
    shadowColor: "#34C759",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  inactiveCircle: {
    backgroundColor: "#e0e0e0",
  },
  progressText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 10,
    zIndex: 1,
  },
  progressLine: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
  },
  activeLine: {
    backgroundColor: "#34C759",
  },
  pulseEffect: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(52, 199, 89, 0.5)",
    zIndex: 0,
  },
});

export default Home;
