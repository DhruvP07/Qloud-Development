import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './drawer/Sidebar'; // Import Sidebar component
import BottomBar from '../components/BottomBar'; // Import BottomBar component
import HomeScreen from './index'; // Replace with actual paths
import NotificationsScreen from './(tabs)/NotificationsScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import SettingsScreen from './(tabs)/SettingsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerIcon = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    <Image
      source={require('../assets/profile-icon-9.png')}
      style={styles.icon}
    />
  </TouchableOpacity>
);

const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Drawer Navigator */}
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        screenOptions={({ navigation }) => ({
          headerLeft: () => <CustomDrawerIcon navigation={navigation} />,
          headerShown: true, // Ensure the header is visible
        })}
      >
        {/* Add your screens here */}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    ...StyleSheet.absoluteFillObject, // Makes the Drawer.Navigator fill the screen
    zIndex: 2, // Ensure the drawer is on top
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensures BottomBar is below the drawer
    paddingBottom: 20,
  },
  icon: {
    width: 34, // Adjust the width of the image
    height: 34, // Adjust the height of the image
    marginLeft: 12, // Add some padding for alignment
    resizeMode: 'contain', // Ensure the image scales properly
  },
});

export default Layout;
