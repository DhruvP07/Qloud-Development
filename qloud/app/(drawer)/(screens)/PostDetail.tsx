import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Correct import

const PostDetail = () => {
  const router = useRouter();  // Get the router instance
  
  // Access query parameters manually
  const { profileImage = '', communityName = '' } = router.query || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Detail</Text>

      {/* Display Community Name */}
      <Text style={styles.communityName}>Community: {communityName}</Text>

      {/* Display Profile Image */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Text>No profile image available</Text>
      )}

      {/* Additional content for PostDetail */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  communityName: {
    fontSize: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Optional: Make it round
    marginBottom: 20,
  },
});

export default PostDetail;
