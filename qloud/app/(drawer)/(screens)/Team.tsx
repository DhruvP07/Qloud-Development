import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the stack navigator
type RootStackParamList = {
  Home: undefined;
  CreateCommunity: undefined;
  CalorieAIScreen: undefined; // Add screen here
  TechBrosScreen: undefined;  // Add screen here
  TeamDetails: { teamId: string };
};


// Define the type for the `navigation` prop in the `Team` screen
type TeamScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface TeamProps {
  navigation: TeamScreenNavigationProp;
}

const categories = ["Tech", "Finance", "E-Commerce", "Fashion"];
const trendingTeams = [
  { id: "1", name: "Calorie.AI", members: 12, image: require("../../../assets/connections.png"), link: "CalorieAIScreen" },
  { id: "2", name: "Tech Bro's", members: 18, image: require("../../../assets/connections.png"), link: "TechBrosScreen" },
];


const Team: React.FC<TeamProps> = ({ navigation }) => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTeamImage, setNewTeamImage] = useState("");

const handleJoinTeam = (link: keyof RootStackParamList) => {
  navigation.navigate(link); // This will now be type-safe
};


  const handleCreateTeam = () => {
    if (!newTeamName || !newCategory || !newTeamImage) {
      Alert.alert("Error", "Please fill all the fields to create a team.");
      return;
    }
    Alert.alert("Success", `Community '${newTeamName}' created successfully!`);
    setNewTeamName("");
    setNewCategory("");
    setNewTeamImage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JOIN TEAM</Text>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category} style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>TRENDING</Text>

      {/* Trending Teams */}
      <View style={styles.teamList}>
        {trendingTeams.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamCard}
            onPress={() => handleJoinTeam(team.link)} // Pass the ID instead of name
          >
            <Image source={team.image} style={styles.teamImage} />
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.teamMembers}>{team.members} members</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Community Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateCommunity")}
      >
        <Text style={styles.createButtonText}>Create Community</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  categoryContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap", // Ensure categories wrap to the next line
  },
  category: {
    margin: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    textAlign: "center",
  },
  categoryText: {
    fontSize: 16,
    color: "#fff",
  },
  teamList: {
    paddingTop: 10,
  },
  teamCard: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#222",
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  teamMembers: {
    fontSize: 14,
    color: "#aaa",
  },
  createButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Team;
