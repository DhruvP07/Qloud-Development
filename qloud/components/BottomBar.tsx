import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const BottomBar: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/EmailScreen')}>
        <Image source={require('../assets/email.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/MarketplaceScreen')}>
        <Image source={require('../assets/marketplace.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image source={require('../assets/logo.png')} style={styles.icon} /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/ConnectionScreen')}>
        <Image source={require('../assets/connections.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/Myra')}>
        <Image source={require('../assets/myra.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 0,
    borderColor: '#ccc',
    zIndex: 0,
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default BottomBar;
