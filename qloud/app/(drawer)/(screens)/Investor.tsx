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
import Slider from "@react-native-community/slider";

const Investor = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [investment, setInvestment] = useState(125);

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
          How Much Do Your Investors Earn in Returns?
        </Text>
        <Text>%ROI For Your Investors</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              color: "#000",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            How does this work?
          </Text>
          <TouchableOpacity onPress={() => setShowPopup(true)}>
            <Image
              source={require("../../../assets/warning.png")}
              style={{ width: 14, height: 14 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* slider */}
      <View style={styles.containerds}>
        <View style={styles.containerd}>
          <Text style={globalStyles.boldTextW}>ROI %</Text>
          <Text style={globalStyles.largeTextB}>
            {investment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.sliderTe}>
            <Text>1.1x</Text>
            <Text>3.0</Text>
          </View>

          <View style={styles.trackBackground}>
            <Slider
              style={styles.slider}
              minimumValue={1.1}
              maximumValue={3.0}
              minimumTrackTintColor="#EEEEEE"
              maximumTrackTintColor="#EEEEEE"
              thumbImage={require("../../../assets/thumbSlide.png")}
              value={investment}
              onValueChange={(value) => setInvestment(value)}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 8}}>
          <View
            style={{
              width: 71,
              height: 50,
              backgroundColor: "#EEE",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: 'row',
              gap: 4
            }}
          >
            <Image source={require('../../../assets/minus.png')} style={{width: 20, height: 20}}/>
            <Text>0.1x</Text>
          </View>
          <View
            style={{
              width: 71,
              height: 50,
              backgroundColor: "#EEE",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: 'row',
              gap: 4
            }}
          >
            <Image source={require('../../../assets/added.png')}  style={{width: 20, height: 20}}/>
            <Text>0.1x</Text>
          </View>
        </View>

        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Inter', fontWeight: 400, fontSize: 16}}>Investor ROI</Text>
            <Text style={{fontFamily: 'Inter', fontWeight: 700, fontSize: 24}}>126% ROI</Text>
        </View>
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

      {/* Pop-up Content */}
      {showPopup && (
        <View style={styles.popup}>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
              fontSize: 24,
              alignItems: "center",
              textAlign: "center",
              width: 220,
            }}
          >
            How does Selling and %ROI work?
          </Text>
          <View>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 18 }}
            >
              How Does % ROI Work?
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 18 }}
            >
              1.2x Return (20% Gain)
            </Text>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 14 }}
            >
              Invest $100 → Get $120
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 18 }}
            >
              1.5x Return (50% Gain)
            </Text>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 14 }}
            >
              Invest $100 → Get $150
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{ fontFamily: "Inter", fontWeight: "700", fontSize: 18 }}
            >
              2.0x Return (100% Gain)
            </Text>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 14 }}
            >
              Invest $100 → Get $200
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowPopup(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderTe: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 250,
  },
  sliderContainer: {
    width: 400,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
  },
  trackBackground: {
    width: 300,
    height: 12, // This controls the visible height of the "track"
    borderRadius: 6,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
  },
  slider: {
    width: 300,
    height: 30, // This increases touch area
    backgroundColor: "#EEEEEE",
  },
  containerd: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  containerds: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  popup: {
    position: "absolute",
    width: 350,
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    alignItems: "center",
    gap: 32,
  },
  closeButton: {
    alignItems: "center",
    padding: 6,
    backgroundColor: "#000",
    borderRadius: 20,
    width: 300,
    height: 50,
    justifyContent: "center",
  },
  closeText: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
export default Investor;
