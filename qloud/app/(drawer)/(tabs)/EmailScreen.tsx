import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const EmailScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../../assets/background.png')} // Replace with your background image
      style={styles.background}
      blurRadius={8} // Adds a blur effect
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          We're working hard to bring you this feature. Stay tuned!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Link href="/Home" style={styles.buttonText}>
            Back to Home
          </Link>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'none',
  },
});

export default EmailScreen;
