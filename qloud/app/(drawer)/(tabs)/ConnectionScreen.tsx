import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "@/globalStyles";

const Connection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Product");

  const products = [
    {
      id: 1,
      title: "Calorie Tracking App",
      company: "Calorietracker",
      price: "3499$",
      likes: "739K",
      revenue: "1.26M",
      image: require("../../../assets/conn1.png"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
    {
      id: 2,
      title: "AI Personal Stylist",
      company: "Styliister",
      price: "1999$",
      likes: "500K",
      revenue: "890K",
      image: require("../../../assets/conn2.jpeg"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
    {
      id: 3,
      title: "Eco Friendly Advice",
      company: "GreenGains",
      price: "750$",
      likes: "600K",
      revenue: "2.5M",
      image: require("../../../assets/Conn3.jpeg"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
    {
      id: 4,
      title: "AI Investment App",
      company: "Investcircle",
      price: "23000$",
      likes: "1.2M",
      revenue: "8.5M",
      image: require("../../../assets/conn4.jpg"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
    {
      id: 5,
      title: "AI Chef Recommendation",
      company: "Chefy",
      price: "3999$",
      likes: "2M",
      revenue: "6.7M",
      image: require("../../../assets/conn5.png"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
    {
      id: 6,
      title: "Organize Public Events",
      company: "Buddies",
      price: "2700$",
      likes: "800K",
      revenue: "3.2M",
      image: require("../../../assets/conn6.png"),
      sendImage: require("../../../assets/sendBlack.png"),
      forkImage: require("../../../assets/fork.png"),
    },
  ];

  const categories = [
    { label: "Product", width: 87 },
    { label: "Companies", width: 87 },
    { label: "Services", width: 87 },
    { label: "Retail", width: 64 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.Market}>
        <Text>Marketplace</Text>
        <TouchableOpacity style={styles.sell}>Sell/Raise</TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.search}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.profile}>
            <Image
              source={require("../../../assets/category.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* banner image */}
      <View>
        <Image
          source={require("../../../assets/bannerImage.png")}
          style={{ width: 410, height: 70, borderRadius: 8 }}
        />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.label}
            onPress={() => setActiveCategory(category.label)}
            style={[
              styles.button,
              {
                width: category.width,
                backgroundColor:
                  activeCategory === category.label ? "#000" : "#D9D9D9",
              },
            ]}
          >
            <Text
              style={{
                color: activeCategory === category.label ? "#FFF" : "#000",
              }}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      {/* <ScrollView horizontal style={styles.filters}>
        <Text style={styles.filter}>All</Text>
        <Text style={styles.filter}>Agencies</Text>
        <Text style={styles.filter}>Apps</Text>
        <Text style={styles.filter}>E-commerce</Text>
        <Text style={styles.filter}>Fashion</Text>
      </ScrollView> */}

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productCard,
              hoveredCard === product.id && styles.productCardHover,
            ]}
            onPressIn={() => setHoveredCard(product.id)}
            onPressOut={() => setHoveredCard(null)}
          >
            <View style={{ flexDirection: "column", gap: 8 }}>
              {/* image */}
              <View>
                <Image source={product.image} style={styles.productImage} />
              </View>

              {/* company detail */}
              <View style={{ flexDirection: "column", gap: 2 }}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productCompany}>{product.company}</Text>
                {/* numbers */}
                <View style={styles.productDetails}>
                  <Text style={styles.productLikes}>❤️ {product.likes}</Text>
                  <Text style={styles.productRevenue}>
                    💵 {product.revenue}
                  </Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </View>

              {/* buttons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.button1}>
                  <Image
                    source={product.sendImage}
                    style={{ width: 18, height: 18 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}>
                  <Image
                    source={product.forkImage}
                    style={{ width: 18, height: 18 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: 77,
    height: 42,
    borderRadius: 5,
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 27,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  Market: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 100,
  },
  sell: {
    backgroundColor: "#EEEEEE",
    width: 85,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "column",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "black",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    margin: 10,
    height: 48,
    width: 340,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "none",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  activeCategory: {
    textDecorationLine: "underline",
  },
  filters: {
    paddingVertical: 15,
    backgroundColor: "white",
  },
  filter: {
    marginHorizontal: 10,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "black",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },
  productCard: {
    width: "45%",
    borderRadius: 10,
    padding: 10,
  },
  productCardHover: {
    backgroundColor: "#ddd", // Lighten background on hover
    elevation: 6, // Increase shadow for hover
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productTitle: {
    fontWeight: "bold",
    color: "black",
  },
  productCompany: {
    color: "gray",
    fontSize: 12,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productLikes: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
  productRevenue: {
    color: "green",
    fontSize: 12,
    fontWeight: "bold",
  },
  productPrice: {
    color: "green",
    fontWeight: "bold",
  },
});

export default Connection;
