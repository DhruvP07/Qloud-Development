import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Qloud1Screen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Qloud 1 Section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Qloud1Screen;
