import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { router, Router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "@/globalStyles";

interface SidebarProps {
  navigation: any;
}

const Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
  navigation = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken"); // Remove token from storage
      router.replace("/Login"); // Redirect to Login screen
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.push("/Profile")}>
          <Image
            source={require("../../assets/profile-icon-9.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={globalStyles.regularTextW}>Marwan Al Asadi</Text>
        <Text style={globalStyles.regularTextW}>@hisroyalfreshness</Text>
      </View>

      {/* Menu Items */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Home")}
          >
            <MaterialIcons name="home" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Files")}
          >
            <MaterialIcons name="folder" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Files</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Community")}
          >
            <MaterialIcons name="folder" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Calendar")}
          >
            <MaterialIcons name="calendar-today" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Calendar</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Mentor")}
          >
            <FontAwesome5 name="chalkboard-teacher" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Mentor</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Team")}
          >
            <MaterialIcons name="group" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Team</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Links")}
          >
            <Entypo name="link" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Links</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Speeches")}
          >
            <Feather name="mic" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Speeches</Text>
          </TouchableOpacity> */}
        </View>

        <View>
          {/* Divider */}
          <View style={styles.divider} />
          {/* Footer Items */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Settings")}
          >
            <MaterialIcons name="settings" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Help")}
          >
            <MaterialIcons name="help-outline" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/Contact")}
          >
            <MaterialIcons name="call" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.push("/SocialMedia")}
          >
            <Entypo name="network" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Social Media</Text>
          </TouchableOpacity>
          // Inside the Logout Button
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Entypo name="login" size={20} color="white" />
            <Text style={globalStyles.regularTextW}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileContainer: {
    
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  handle: {
    color: "#aaa",
  },
  menuContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 200
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 15,
    
  },
});

export default Sidebar;
