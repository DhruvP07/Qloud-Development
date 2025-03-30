import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"; // If you need stack navigation inside a drawer
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import HomeScreen from "./HomeScreen"; // HomeScreen in the tabs folder
import Team from "./Team";
import CreateCommunityScreen from "./CreateCommunityScreen";
import CalorieAIScreen from "./CalorieAIScreen";
import TechBrosScreen from "./TechBrosScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// You can use stack navigation for nested screens inside the drawer (optional)
const StackLayout = () => (
  <Stack.Navigator initialRouteName="Team">
    <Stack.Screen name="Team" component={Team} />
    <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen} />
    <Stack.Screen name="CalorieAI" component={CalorieAIScreen} />
    <Stack.Screen name="TechBros" component={TechBrosScreen} />
  </Stack.Navigator>
);

const DrawerLayout = () => {
  return (
    // You might already have a NavigationContainer in your app's root component (like App.tsx)
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Teams" component={StackLayout} />
      <Drawer.Screen name="CreateCommunity" component={CreateCommunityScreen} />
      <Drawer.Screen name="CalorieAI" component={CalorieAIScreen} />
      <Drawer.Screen name="TechBros" component={TechBrosScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
