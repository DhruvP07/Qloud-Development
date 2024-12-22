import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Marketplace: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Market Section</Text>
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

export default Marketplace;
