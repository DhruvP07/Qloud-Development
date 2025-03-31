// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack"; // If you need stack navigation inside a drawer
// import { Link, NavigationContainer } from "@react-navigation/native";

// // Import screens
// import HomeScreen from "./HomeScreen"; // HomeScreen in the tabs folder
// import Team from "./Team";
// import CreateCommunityScreen from "./CreateCommunityScreen";
// import CalorieAIScreen from "./CalorieAIScreen";
// import TechBrosScreen from "./TechBrosScreen";
// import Files1 from "./Files";
// import Calendar from "./Calendar";
// import MentorPathway from "./Mentor";
// import LinksScreen from "./Links";
// import Speeches from "./Speeches";
// import Settings from "./Settings";
// import HelpCenter from "./Help";
// import Contact from "./Contact";
// import SocialMedia from "./SocialMedia";
// import Login from "./Login";

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// // You can use stack navigation for nested screens inside the drawer (optional)
// const StackLayout = () => (
//   <Stack.Navigator initialRouteName="Team">
//     <Stack.Screen name="Team" component={Team} />
//     <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen} />
//     <Stack.Screen name="CalorieAI" component={CalorieAIScreen} />
//     <Stack.Screen name="TechBros" component={TechBrosScreen} />
//   </Stack.Navigator>
// );

// const DrawerLayout = () => {
//   return (
//     // You might already have a NavigationContainer in your app's root component (like App.tsx)
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Teams" component={StackLayout} />
//       <Drawer.Screen name="CreateCommunity" component={CreateCommunityScreen} />
//       <Drawer.Screen name="CalorieAI" component={CalorieAIScreen} />
//       <Drawer.Screen name="TechBros" component={TechBrosScreen} />
//       <Drawer.Screen name="File" component={Files1} />
//       <Drawer.Screen name="Calendar" component={Calendar} />
//       <Drawer.Screen name="MentorPathway" component={MentorPathway} />
//       <Drawer.Screen name="LinksScreen" component={LinksScreen} />
//       <Drawer.Screen name="Speeches" component={Speeches} />
//       <Drawer.Screen name="Settings" component={Settings} />
//       <Drawer.Screen name="HelpCenter" component={HelpCenter} />
//       <Drawer.Screen name="Contact" component={Contact} />
//       <Drawer.Screen name="SocialMedia" component={SocialMedia} />
//       <Drawer.Screen name="Login" component={Login} />

//     </Drawer.Navigator>
//   );
// };

// export default DrawerLayout;
