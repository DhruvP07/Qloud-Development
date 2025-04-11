import { globalStyles } from "@/globalStyles";
import React, { useEffect, useState } from "react";
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
  Animated,
} from "react-native";
import { router, Router, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const FundingCamp = () => {
  const [expectedFunding, setExpectedFunding] = useState("");
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 84,
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
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 24 }}>
          Set Your Goal
        </Text>
        <Text>How Much Money You Expect To Raise</Text>
      </View>

      {/* Input Field */}
      <TextInput
        style={{
          width: 222,
          height: 52,
          paddingHorizontal: 16,
          backgroundColor: "#EEEEEE",
          borderRadius: 12,
          textAlign: "center",
          fontSize: 16,
        }}
        placeholder="Enter funding amount"
        keyboardType="numeric"
        value={expectedFunding}
        onChangeText={setExpectedFunding}
      />

      {/* Display Raised Value */}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 18 }}>
          Raising
        </Text>
        <Text style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 24 }}>
          ${expectedFunding || "0"}
        </Text>
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
          onPress={() => router.push("/StartFunding")}
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
          onPress={() => router.push("/Deadline")}
        >
          <Text style={{ color: "#FFF" }}>Set Deadlines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FundingCamp;
