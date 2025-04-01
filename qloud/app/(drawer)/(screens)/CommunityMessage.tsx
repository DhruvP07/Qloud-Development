import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"; // Correct import for useRoute

// Define the interface for the expected parameters
interface PostDetailParams {
  communityName: string;
  profileImage: string;
  onBack: () => void;
}

const CommunityDetails = [
  {
    id: 1,
    image: require("../../../assets/profile-man.png"),
    name: "Kane",
    description:
      "This is just a test what do you guys think about my business that I am currently working on, please give me feedback’s on the snippet on my profile. Thank you.",
    social: "@kanemane",
  },
  {
    id: 2,
    image: require("../../../assets/profile-man.png"),
    name: "Kane",
    description:
      "This is just a test what do you guys think about my business that I am currently working on, please give me feedback’s on the snippet on my profile. Thank you.",
    social: "@kanemane",
  },
  {
    id: 3,
    image: require("../../../assets/profile-man.png"),
    name: "Kane",
    description:
      "This is just a test what do you guys think about my business that I am currently working on, please give me feedback’s on the snippet on my profile. Thank you.",
    social: "@kanemane",
  },
  {
    id: 4,
    image: require("../../../assets/profile-man.png"),
    name: "Kane",
    description:
      "This is just a test what do you guys think about my business that I am currently working on, please give me feedback’s on the snippet on my profile. Thank you.",
    social: "@kanemane",
  },
  {
    id: 5,
    image: require("../../../assets/profile-man.png"),
    name: "Kane",
    description:
      "This is just a test what do you guys think about my business that I am currently working on, please give me feedback’s on the snippet on my profile. Thank you.",
    social: "@kanemane",
  },
];

const progressSteps = ["Foundation", "Development", "Launch"];

// The PostDetail component for rendering the details
const PostDetail: React.FC<PostDetailParams> = ({
  communityName,
  profileImage,
  onBack,
}) => {
  const initialState = Array(progressSteps.length).fill(false);
  const [activeSteps, setActiveSteps] = useState<boolean[][]>([
    [...initialState],
    [...initialState],
    [...initialState],
    [...initialState],
    [...initialState],
  ]);

  const handleStepClick = (sectionIndex: number, stepIndex: number) => {
    const updatedSteps = [...activeSteps];
    updatedSteps[sectionIndex] = [...updatedSteps[sectionIndex]];
    updatedSteps[sectionIndex][stepIndex] =
      !updatedSteps[sectionIndex][stepIndex];
    setActiveSteps(updatedSteps);
  };

  const renderProgressSection = (sectionIndex: number) => (
    <View style={styles.progressContainer}>
      {progressSteps.map((step, index) => (
        <View key={index}>
          <View style={styles.dotsContainer}>
            <TouchableOpacity
              style={[
                styles.stepButton,
                activeSteps[sectionIndex][index]
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handleStepClick(sectionIndex, index)}
            >
              <Image
                source={
                  index === 0
                    ? require("../../../assets/foundation.png")
                    : index === 1
                    ? require("../../../assets/development.png")
                    : require("../../../assets/launch.png")
                }
                style={styles.detailImagea}
              />
            </TouchableOpacity>

            {index < progressSteps.length - 1 && (
              <View
                style={[
                  styles.progressDot,
                  activeSteps[sectionIndex][index] &&
                  activeSteps[sectionIndex][index + 1]
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            )}
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttongs}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image
            source={require("../../../assets/left.png")}
            style={styles.arrowImage}
          />
        </TouchableOpacity>
        <View style={styles.buttongw}>
          <Text>{communityName}</Text>
        </View>
      </View>

      <View style={styles.detailWhole}>
        <View style={styles.details}>
          {CommunityDetails.map((details) => (
            <View key={details.id}>
              <View style={styles.containerD}>
                <Image source={details.image} style={styles.detailImage} />
                <View style={styles.containerW}>
                  <Text>{details.name}</Text>
                  <Text>{details.social}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        {/* Progress Steps Section */}
        <View style={styles.detailEvery}>
          {renderProgressSection(0)}
          {renderProgressSection(1)}
          {renderProgressSection(2)}
          {renderProgressSection(3)}
          {renderProgressSection(4)}
        </View>
      </View>
    </View>
  );
};

// The CommunityMessage component where user clicks the arrow to reveal the PostDetail
const CommunityMessage: React.FC = () => {
  // Local state to manage whether the post details should be shown
  const [showPostDetail, setShowPostDetail] = useState(false);

  // Get dynamic values from the route using useRoute
  const route = useRoute();
  const { communityName, profileImage } = route.params as {
    communityName: string;
    profileImage: string;
  };

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleNavigateToPostDetail = () => {
    setShowPostDetail(true); // Show PostDetail
  };

  const handleBackToCommunityMessage = () => {
    setShowPostDetail(false);
  };

  return (
    <View style={styles.container}>
      {/* Conditionally render PostDetail or CommunityMessage */}
      {showPostDetail ? (
        <PostDetail
          communityName={communityName}
          profileImage={profileImage}
          onBack={handleBackToCommunityMessage} // Pass back handler
        />
      ) : (
        <View style={styles.wholeContainer}>
          <View style={styles.columnContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Text>No profile image available</Text>
            )}
            <View style={styles.rowContainer}>
              <Text style={styles.communityName}>{communityName}</Text>

              {/* Right Arrow Button to toggle PostDetail */}
              <TouchableOpacity
                onPress={handleNavigateToPostDetail}
                style={styles.arrowContainer}
              >
                <Image
                  source={require("../../../assets/arrow.png")}
                  style={styles.arrowImage}
                />
              </TouchableOpacity>
            </View>
          </View>{" "}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButtonA}>
              <Text style={styles.createButtonTextA}>All</Text>
            </TouchableOpacity>
            {["General", "Wins", "Exclusives"].map((label, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.buttons,
                  label === "General" && styles.generalButton,
                  label === "Wins" && styles.winButton,
                  label === "Exclusives" && styles.exButton,
                  hoveredButton === label && styles.hoverButton, // Apply hover effect
                ]}
                onPressIn={() => setHoveredButton(label)}
                onPressOut={() => setHoveredButton(null)}
              >
                <Text
                  style={[
                    styles.createButtonText,
                    hoveredButton === label && styles.hoverText, // Change text color
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.details}>
            {CommunityDetails.map((details) => (
              <View key={details.id}>
                <View style={styles.containerD}>
                  <Image source={details.image} style={styles.detailImage} />
                  <View style={styles.containerR}>
                    <Text>{details.name}</Text>
                    <Text>{details.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepWrapper: { flexDirection: "row", alignItems: "center" },
  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: { backgroundColor: "#00A980" },
  inactiveButton: { backgroundColor: "#EEEEEE" },
  stepText: { color: "black", fontSize: 12 },

  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  activeDot: { backgroundColor: "#00A980" },
  inactiveDot: { backgroundColor: "grey" },
  buttongs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 100,
    paddingBottom: 20,
  },
  buttongw: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  hoverButton: {
    backgroundColor: "#FFFFFF",
  },
  hoverText: {
    color: "#000000",
  },
  buttons: {
    height: 44,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  exButton: {
    width: 112,
  },
  winButton: {
    width: 60,
  },
  generalButton: {
    width: 79,
  },
  generalButtonText: {
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  createButton: {
    width: 55,
    height: 44,
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  createButtonA: {
    width: 55,
    height: 44,
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  createButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  createButtonTextA: {
    color: "#FFF",
    fontWeight: "bold",
  },
  detailEvery: {
    flexDirection: "column",
    gap: 20,
  },
  detailWhole: {
    flexDirection: "row",
    gap: 10,
  },
  details: {
    flexDirection: "column",
    gap: 30,
  },
  detailImage: {
    width: 47,
    height: 47,
  },
  detailImagea: {
    width: 25,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wholeContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 30,
  },
  containerD: {
    flexDirection: "row",
    gap: 8,
  },
  containerW: {
    flexDirection: "column",
    gap: 4,
    width: 100,
  },
  containerR: {
    flexDirection: "column",
    gap: 4,
    width: 350,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  columnContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 25,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  communityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 50, // Round the image
  },
  arrowContainer: {},
  arrow: {
    fontSize: 30, // Adjust the size of the arrow
  },
  arrowImage: {
    width: 24,
    height: 24,
  },
});

export default CommunityMessage;
