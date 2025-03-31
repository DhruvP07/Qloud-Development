import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CommunityMessage: React.FC = () => {
  const route = useRoute();
  const { communityName, profileImage } = route.params as { communityName: string, profileImage: string };

  return (
    <View>
      <Text>Community Name: {communityName}</Text>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={{ width: 100, height: 100 }} />
      ) : (
        <Text>No profile image available</Text>
      )}
    </View>
  );
};

export default CommunityMessage;
