import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '@/globalStyles';

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
  
        if (userToken) {
          // Simulate token validation
          const isValidToken = userToken === 'VALID_TOKEN'; // Replace with actual validation logic
  
          if (isValidToken) {
            router.replace('/Home'); // Navigate to Home if token is valid
          } else {
            setErrorMessage('Invalid credentials. Please log in again.');
            await AsyncStorage.removeItem('userToken'); // Clear invalid token
            router.replace('/Login'); // Redirect to login page
          }
        } else {
          router.replace('/Login'); // No token found, go to login
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setErrorMessage('Something went wrong. Please try again.');
        router.replace('/Login'); // Ensure user is redirected to login in case of an error
      } finally {
        setIsLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />
      <Text style={globalStyles.boldText}>Welcome to Qloud</Text>
      <Text style={globalStyles.largeText}>Empowering your business through innovation and technology.</Text>
      
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.ctaButton}>
        <Link href={'/Home'} style={globalStyles.regularText}>Learn More</Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});
