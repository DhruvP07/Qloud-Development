import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import Sidebar from './drawer/Sidebar'; // Import Sidebar component
import BottomBar from '../components/BottomBar'; // Import BottomBar component
import HomeScreen from './index'; // Replace with actual paths
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

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
      <Stack>
        <Stack.Screen name = "(tabs)" options  = {{headerShown: false}} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 34, // Adjust the width of the image
    height: 34, // Adjust the height of the image
    marginLeft: 12, // Add some padding for alignment
    resizeMode: 'contain', // Ensure the image scales properly
  },
});

export default Layout;
