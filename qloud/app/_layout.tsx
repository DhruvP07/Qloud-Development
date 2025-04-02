import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hide header for index.tsx
          }}
        />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

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
