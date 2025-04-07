import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Import icons
import { router, Router, useRouter } from "expo-router";
import { globalStyles } from "@/globalStyles";

interface SidebarProps {
  navigation: any;
}

const { height, width } = Dimensions.get("window");

// Define the height of the header and bottom bar
const HEADER_HEIGHT = 56; // Approximate height of the header
const TAB_BAR_HEIGHT = 60; // Approximate height of the bottom bar
const REEL_HEIGHT = 850;

// Sample data for videos and user details
const reelsData = [
  {
    id: "1",
    videoUrl: require("../../../assets/videos/reel1.mp4"),
    username: "@User1",
    caption: "Check out this amazing view! 🌄",
    likes: 1200,
    comments: 739,
    shares: 45,
    avatar: "https://www.example.com/avatar1.jpg",
  },
  {
    id: "2",
    videoUrl: require("../../../assets/videos/reel2.mp4"),
    username: "@User2",
    caption: "Dancing into the weekend 💃🎉",
    likes: 3200,
    comments: 1400,
    shares: 78,
    avatar: "https://www.example.com/avatar2.jpg",
  },
  {
    id: "3",
    videoUrl: require("../../../assets/videos/reel3.mp4"),
    username: "@User3",
    caption: "A moment to remember 🏞️✨",
    likes: 500,
    comments: 200,
    shares: 10,
    avatar: "https://www.example.com/avatar3.jpg",
  },
  {
    id: "4",
    videoUrl: require("../../../assets/videos/reel4.mp4"),
    username: "@User4",
    caption: "Fitness goals 💪🔥",
    likes: 3200,
    comments: 1400,
    shares: 78,
    avatar: "https://www.example.com/avatar4.jpg",
  },
  {
    id: "5",
    videoUrl: require("../../../assets/videos/reel5.mp4"),
    username: "@User5",
    caption: "Nature never ceases to amaze 🌳🌊",
    likes: 1200,
    comments: 739,
    shares: 45,
    avatar: "https://www.example.com/avatar5.jpg",
  },
];

const Marketplace: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(
    reelsData.map((reel) => ({ id: reel.id, liked: false, count: reel.likes }))
  );
  const flatListRef = useRef<FlatList>(null);
  const navigation = useRouter();
  const [popped, setPopped] = useState(false);

  const handleScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / REEL_HEIGHT);
    setCurrentIndex(index);
  };

  const toggleLike = (id: string) => {
    setLikes((prevLikes) =>
      prevLikes.map((like) =>
        like.id === id
          ? {
              ...like,
              liked: !like.liked,
              count: like.liked ? like.count - 1 : like.count + 1,
            }
          : like
      )
    );
  };

  const renderReelItem = ({
    item,
    index,
  }: {
    item: (typeof reelsData)[0];
    index: number;
  }) => {
    const likeState = likes.find((like) => like.id === item.id);

    return (
      <View style={[styles.reelContainer, { height: REEL_HEIGHT }]}>
        <Video
          source={item.videoUrl}
          resizeMode={ResizeMode.COVER}
          shouldPlay={currentIndex === index}
          isLooping
          style={styles.video}
        />
        {/* Bottom-left: User Info and Caption */}
        <View style={styles.bottomLeftOverlay}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => navigation.push("/Profile")}>
              <Image
                source={require("../../../assets/profile-icon-9.png")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.username}>{item.username}</Text>
          </View>

          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        {/* Right-side: Like, Comment, Share */}
        <View style={styles.rightOverlay}>
          <TouchableOpacity
            onPress={() => setPopped(!popped)}
            style={{ alignItems: "center" }}
          >
            <Image
              source={require("../../../assets/dollars.png")}
              style={styles.dollarsImage}
            />
            <Text style={styles.iconLabel}>{likeState?.count}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <AntDesign
              name={likeState?.liked ? "heart" : "hearto"}
              size={28}
              color={likeState?.liked ? "red" : "white"}
            />
            <Text style={styles.iconLabel}>{likeState?.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
            <Text style={styles.iconLabel}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="arrow-redo-outline" size={28} color="white" />
            <Text style={styles.iconLabel}>{item.shares}</Text>
          </TouchableOpacity>
        </View>

        {popped && (
          <View style={styles.popUpContainer}>
            <Text style={globalStyles.boldTextW}>Invest in canvatest</Text>
            <Text style={globalStyles.regularText}>Team</Text>
            <View style={styles.profileContainer}>
              <View style={styles.wContainer}>
                <Image
                  source={require("../../../assets/profile-man.png")}
                  style={styles.pImage}
                />
                <Text style={globalStyles.regularText}>Martin</Text>
                <Text style={globalStyles.regularText}>CEO</Text>{" "}
              </View>

              <View>
                <Image
                  source={require("../../../assets/profile-man.png")}
                  style={styles.pImage}
                />
                <Text style={globalStyles.regularText}>Martin</Text>
                <Text style={globalStyles.regularText}>CEO</Text>{" "}
              </View>
              <View>
                <Image
                  source={require("../../../assets/profile-man.png")}
                  style={styles.pImage}
                />
                <Text style={globalStyles.regularText}>Martin</Text>
                <Text style={globalStyles.regularText}>CEO</Text>{" "}
              </View>
            </View>
            <TouchableOpacity style={styles.invest} onPress={() => navigation.push("../(screens)/Snippets")}>          
              <Text style={globalStyles.regularTextW}>Invest</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        ref={flatListRef}
        data={reelsData}
        renderItem={renderReelItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={REEL_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  invest: {
    width: 324,
    height: 52,
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  pImage: {
    width: 60,
    height: 60,
  },
  wContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  popUpContainer: {
    position: "absolute",
    bottom: 0, // distance above the icon
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    zIndex: 10,
    width: 450,
    height: 250,
    gap: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  popUpText: {
    color: "white",
    fontSize: 14,
  },

  iconLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  dollarsImage: {
    width: 20,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  list: {
    flex: 1,
  },
  reelContainer: {
   
    position: "relative",
  },
  video: {
    height: "100%",
    width: "100%",
  },
  bottomLeftOverlay: {
    position: "absolute",
    bottom: 100,
    left: 10,
    width: "60%",
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  caption: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  rightOverlay: {
    position: "absolute",
    right: 16,
    bottom: 100,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    gap: 16,
  },

  actionButton: {
    marginBottom: 20,
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
});

export default Marketplace;
