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
import { router, Router, useRouter } from "expo-router";

const SellorRaise = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={globalStyles.boldTextW}>Sell/Raise</Text>
      <View
        style={{
          width: 263,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          marginTop: 100,
          marginBottom: 100,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../../../assets/discount.png")}
              style={{ width: 31, height: 31 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              Turn ideas into income
            </Text>

            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Sell or raise funds for your business seamlessly with Qloud!
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 300,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <TouchableOpacity
            style={{
              width: 180,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 230,
              backgroundColor: "#E1E1E1",
              borderRadius: 12,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 32,
              }}
            >
              <Image
                source={require("../../../assets/bag.png")}
                style={{ width: 40, height: 40 }}
              />
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: 24,
                  }}
                >
                  Sell An Idea
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: 16,
                    width: 120,
                  }}
                >
                  Completely Sell A Product, Service Or Retail
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 180,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 230,
              backgroundColor: "#E1E1E1",
              borderRadius: 12,
            }}
            onPress={() => router.push("/RaiseFund")}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 32,
              }}
            >
              <Image
                source={require("../../../assets/fund.png")}
                style={{ width: 40, height: 40 }}
              />
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: 24,
                  }}
                >
                  Raise Funds
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: 16,
                    width: 120,
                  }}
                >
                  Raise Funding For Your Business Through Revenue Sharing
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
              color: "#757575",
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
              Selling An Idea
            </Text>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 14 }}
            >
              If you sell your idea (whether it's a product, brand, or
              business), you transfer full rights to the buyer and receive a
              one-time payment.
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
              Raising Funds
            </Text>
            <Text
              style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 14 }}
            >
              When offering ROI-based revenue sharing, you commit to giving your
              investors a return based on their investment. For example, with a
              2x ROI, an investor who puts in $100 will receive $200 over time —
              their original amount plus the promised return.
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

export default SellorRaise;
