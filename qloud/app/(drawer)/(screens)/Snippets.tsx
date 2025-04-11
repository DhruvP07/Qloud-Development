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

const Snippets = () => {
  const [investment, setInvestment] = useState(125);
  const [showPopup, setShowPopup] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const [term, setTerm] = useState(6);
  const [revenueShare, setRevenueShare] = useState(6);
  const totalRevenue = monthlyRevenue * term;
  const shareDecimal = revenueShare / 100;
  const durationWeight = term >= 12 ? 1.1 : term >= 6 ? 1.05 : 1;

  const revenueShareTotal = totalRevenue * shareDecimal;
  const finalContribution = revenueShareTotal * durationWeight;

  return (
    <View style={styles.container}>
      <Text style={globalStyles.boldTextW}>Invest</Text>
      <View style={styles.containers}>
        <View style={styles.dcontainer}>
          <View>
            <Image
              source={require("../../../assets/dog.png")}
              style={styles.detailImagea}
            />
          </View>
          <View style={styles.rcontainer}>
            <View style={styles.scontainer}>
              <View style={styles.zcontainer}>
                <Text style={globalStyles.boldTextW}>cabvatest</Text>
                <Text style={globalStyles.regularText}>PelosiTrades</Text>
              </View>

              <View style={styles.zcontainer}>
                <Text style={globalStyles.regularText}>
                  SillyCon Valley, California, USA
                </Text>
                <View style={styles.mcontainer}>
                  <Text style={globalStyles.regularText}>3d Ago</Text>
                  <Text style={globalStyles.regularText}>4 Members</Text>
                </View>
              </View>
            </View>
            <View style={styles.econtainer}>
              <View style={styles.tcontainer}>
                <Image
                  source={require("../../../assets/bdollars.png")}
                  style={styles.fcontainer}
                />
                <Text style={globalStyles.boldTextW}>223k</Text>
              </View>
              <View style={styles.tcontainer}>
                <Image
                  source={require("../../../assets/heart.png")}
                  style={styles.fcontainer}
                />
                <Text style={globalStyles.boldTextW}>44k</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.text}>32 Investors</Text>
        </View>
      </View>
      <View style={styles.containerds}>
        <View style={styles.containerd}>
          <Text style={globalStyles.boldTextW}>Investing</Text>
          <Text style={globalStyles.largeTextB}>
            ${investment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.sliderTe}>
            <Text>0</Text>
            <Text>10,000</Text>
          </View>

          <View style={styles.trackBackground}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              minimumTrackTintColor="#EEEEEE"
              maximumTrackTintColor="#EEEEEE"
              thumbImage={require("../../../assets/thumbSlide.png")}
              value={investment}
              onValueChange={(value) => setInvestment(value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.containera}>
        <View style={styles.containerd}>
          <View style={styles.return}>
            <Text style={globalStyles.boldTextW}>Returns</Text>
            <TouchableOpacity onPress={() => setShowPopup(true)}>
              <Image
                source={require("../../../assets/warning.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <Text style={globalStyles.largeTextB}>
            $
            {finalContribution.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
        <View style={styles.containeru}>
          <TouchableOpacity style={styles.button}>
            <Text style={globalStyles.boldText}>Make offer</Text>
          </TouchableOpacity>
          <Text>4% Transaction Fee</Text>
        </View>
      </View>

      {/* Pop-up Content */}
      {showPopup && (
        <View style={styles.popup}>
          <Text style={globalStyles.boldTextW}>Disclaimer</Text>
          <Text style={styles.popupText}>
            Return estimates are speculative and are not guarantees
          </Text>
          <TouchableOpacity
            onPress={() => setShowPopup(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Close</Text>
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
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    alignItems: "center",
    gap: 16,
  },
  popupText: {
    fontSize: 14,
    alignItems: "center",
    width: 200,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    padding: 6,
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: 300,
    height: 50,
    justifyContent: "center",
  },
  closeText: {
    fontWeight: "bold",
    color: "#000",
  },
  containeru: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  containera: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 11,
    height: 11,
  },
  return: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
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
  containerds: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  containerd: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 32,
  },
  containers: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    alignItems: "center",
  },
  dcontainer: {
    flexDirection: "column",
    gap: 16,
  },
  rcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tcontainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fcontainer: {
    width: 30,
    height: 40,
  },
  zcontainer: {
    flexDirection: "column",
    gap: 4,
  },
  econtainer: {
    flexDirection: "row",
    gap: 12,
  },
  scontainer: {
    flexDirection: "column",
    gap: 12,
  },
  mcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailImagea: {
    width: 400,
    height: 204,
    borderRadius: 12,
  },
  text: {
    textDecorationLine: "underline",
  },
});

export default Snippets;
