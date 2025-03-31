import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// Import the screens
import CalorieAIScreen from "./CalorieAIScreen";
import TechBrosScreen from "./TechBrosScreen";
import CreateCommunityScreen from "./CreateCommunityScreen";

const categories = ["Tech", "Finance", "E-Commerce", "Fashion"];
const trendingTeams = [
  { id: "1", name: "Calorie.AI", members: 12, image: require("../../../assets/connections.png"), link: "CalorieAIScreen" },
  { id: "2", name: "Tech Bro's", members: 18, image: require("../../../assets/connections.png"), link: "TechBrosScreen" },
];

const Team: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  const handleNavigate = (screen: string) => {
    setSelectedScreen(screen);
  };

  const handleBack = () => {
    setSelectedScreen(null);
  };

  if (selectedScreen === "CalorieAIScreen") {
    return (
      <View style={styles.container}>
        <CalorieAIScreen />
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selectedScreen === "TechBrosScreen") {
    return (
      <View style={styles.container}>
        <TechBrosScreen />
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selectedScreen === "CreateCommunityScreen") {
    return (
      <View style={styles.container}>
        <CreateCommunityScreen />
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
            onPress={() => handleNavigate(team.link)}
          >
            <Image source={team.image} style={styles.teamImage} />
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.teamMembers}>{team.members} members</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Community Button */}
      <TouchableOpacity style={styles.createButton} onPress={() => handleNavigate("CreateCommunityScreen")}>
        <Text style={styles.createButtonText}>+ Create a Community</Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  category: {
    margin: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
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
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#ff4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Team;
