import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // Correct import for useRoute
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "@/globalStyles";
import { router } from "expo-router";

const StartFunding = () => {
  const fund = [
    {
      id: 1,
      image: require("../../../assets/girlImage.png"),
      title: "Calorie Tracking App",
      company: "Saas",
      detail: "Making clean water accessible through solar tech",
      dollar: "223k",
      like: "42k",
      dollarImage: require("../../../assets/bdollars.png"),
      heartImage: require("../../../assets/heart.png"),
    },
  ];

  const progressSteps = ["Foundation", "Development", "Launch"];

  const handleStepClick = (stepIndex: number) => {
    const updatedSteps = [...activeSteps];
    updatedSteps[stepIndex] = !updatedSteps[stepIndex];
    setActiveSteps(updatedSteps);
  };

  const initialState = Array(progressSteps.length).fill(false);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(
    Array(progressSteps.length).fill(false)
  );

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 32,
      }}
    >
      <Text>Start A funding Campaign</Text>
      {fund.map((funds) => (
        <View
          key={funds.id}
          style={{
            flexDirection: "column",
            gap: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Image source={funds.image} style={{ width: 80, height: 80 }} />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: 18,
                  }}
                >
                  {funds.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  {funds.company}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: 14,
                  }}
                >
                  {funds.detail}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Image
                    source={funds.dollarImage}
                    style={{ width: 16, height: 16 }}
                  />
                  <View>{funds.dollar}</View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Image
                    source={funds.heartImage}
                    style={{ width: 12, height: 9 }}
                  />
                  <View>{funds.like}</View>
                </View>
              </View>
            </View>
          </View>

          {/* active steps here */}
          <View style={styles.progressContainer}>
            {progressSteps.map((step, index) => (
              <View key={index} style={{ alignItems: "center" }}>
                <View style={styles.dotsContainer}>
                  {/* Step Button with Image */}
                  <TouchableOpacity
                    style={[
                      styles.stepButton,
                      activeSteps[index]
                        ? styles.activeButton
                        : styles.inactiveButton,
                    ]}
                    onPress={() => handleStepClick(index)}
                  >
                    <Image
                      source={
                        index === 0
                          ? require("../../../assets/foundation.png")
                          : index === 1
                          ? require("../../../assets/development.png")
                          : require("../../../assets/launch.png")
                      }
                      style={styles.detailImagea}
                    />
                  </TouchableOpacity>

                  {/* Render 3 progress dots between steps */}
                  {index < progressSteps.length - 1 && (
                    <View style={styles.dotGroup}>
                      {[0, 1, 2].map((dot) => (
                        <View
                          key={dot}
                          style={[
                            styles.progressDot,
                            activeSteps[index] && activeSteps[index + 1]
                              ? styles.activeDot
                              : styles.inactiveDot,
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </View>

                {/* Step Text Below Circle/Image */}
                <Text
                  style={{
                    textAlign: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>

          {/* get Started button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              width: 300,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => router.push('/FundingCamp')}
          >
            <Text
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <View
        style={{
          width: 350,
          height: 116,
          backgroundColor: "#EEEEEE",
          borderRadius: 12,
          justifyContent: "center",
          padding: 20,
          gap: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: 16,
            color: "#757575",
          }}
        >
          Overall Sales
        </Text>
        <Text style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 32 }}>
          $12,344
        </Text>
      </View>
      <View
        style={{
          width: 350,
          height: 116,
          backgroundColor: "#EEEEEE",
          borderRadius: 12,
          justifyContent: "center",
          padding: 20,
          gap: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: 16,
            color: "#757575",
          }}
        >
          Sales this Month
        </Text>
        <Text style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 32 }}>
          $12,344
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 50 }}>
        <View
          style={{
            width: 153,
            height: 116,
            backgroundColor: "#EEEEEE",
            borderRadius: 12,
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: 16,
              color: "#757575",
            }}
          >
            User Count
          </Text>
          <Text
            style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 32 }}
          >
            $12,344
          </Text>
        </View>
        <View
          style={{
            width: 153,
            height: 116,
            backgroundColor: "#EEEEEE",
            borderRadius: 12,
            justifyContent: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: 16,
              color: "#757575",
            }}
          >
            Revenue Growth (%)
          </Text>
          <Text
            style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 32 }}
          >
            $12,344
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotGroup: {
    flexDirection: "row",
    gap: 1,
  },
  activeDot: { backgroundColor: "#00A980" },
  inactiveDot: { backgroundColor: "grey" },
  detailImagea: {
    width: 25,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepWrapper: { flexDirection: "row", alignItems: "center" },
  stepButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: { backgroundColor: "#00A980" },
  inactiveButton: { backgroundColor: "#EEEEEE" },
  stepText: { color: "black", fontSize: 12 },

  progressDot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 32,
    marginTop: 50,
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressLine: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
  },

  activeLine: {
    backgroundColor: "#34C759",
  },

  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeCircle: {
    backgroundColor: "#34C759",
    elevation: 5,
    shadowColor: "#34C759",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },

  inactiveCircle: {
    backgroundColor: "#e0e0e0",
  },

  pulseEffect: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(52, 199, 89, 0.5)",
    zIndex: 0,
  },

  progressText: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontSize: 10,
    zIndex: 1,
  },
});

export default StartFunding;
