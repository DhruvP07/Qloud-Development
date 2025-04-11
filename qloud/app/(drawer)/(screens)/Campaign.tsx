import { globalStyles } from "@/globalStyles";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Linking,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";

const Campaign = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 64,
      }}
    >
      <Text>Funding Campaign</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 30,
              borderColor: "#D9D9D9",
              borderWidth: 3,
            }}
          ></View>
          <Text>Goal</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 30,
              borderColor: "#D9D9D9",
              borderWidth: 3,
            }}
          ></View>
          <Text>Deadline</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 30,
              borderColor: "#D9D9D9",
              borderWidth: 3,
            }}
          ></View>
          <Text>%ROI</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 30,
              borderColor: "#D9D9D9",
              borderWidth: 3,
            }}
          ></View>
          <Text>Publish Campaign</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: 24,
            textAlign: "center",
            width: 310,
          }}
        >
          Review Your Campaign
        </Text>
        <Text>How Long Before Your Investors Start Seeing Returns</Text>
       
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 68,
            height: 50,
            backgroundColor: "#E1E1E1",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => router.push("/Deadline")}
        >
          <Image source={require("../../../assets/left.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 145,
            height: 50,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => router.push("/Campaign")}
        >
          <Text style={{ color: "#FFF" }}>Review Campaign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Campaign;
