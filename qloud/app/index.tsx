import { Text, View, StyleSheet } from 'react-native';
import BottomBar from '@/components/BottomBar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Qloud</Text>
      <View style={styles.flowContainer}>
        <View style={styles.flowItem}><Text>Foundation</Text></View>
        <View style={styles.flowItem}><Text>Development</Text></View>
        <View style={styles.flowItem}><Text>Launch</Text></View>
        <View style={styles.flowItem}><Text>Scale</Text></View>
      </View>
      {/* BottomBar always visible */}
      <View style={styles.bottomBarContainer}>
          <BottomBar/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  flowItem: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2, // Ensures BottomBar is below the drawer
    paddingBottom: 20,
  },
});
