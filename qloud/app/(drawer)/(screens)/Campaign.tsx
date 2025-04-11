import { globalStyles } from "@/globalStyles";

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
import { router, useRouter } from "expo-router";
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface FundingData {
  fundingGoal: string;
  setFundingGoal: Dispatch<SetStateAction<string>>;
  deadlineDate: Date;
  setDeadlineDate: Dispatch<SetStateAction<Date>>;
  roiPercentage: number;
  setRoiPercentage: Dispatch<SetStateAction<number>>;
  goalSet: boolean;
  setGoalSet: Dispatch<SetStateAction<boolean>>;
  deadlineSet: boolean;
  setDeadlineSet: Dispatch<SetStateAction<boolean>>;
  roiSet: boolean;
  setRoiSet: Dispatch<SetStateAction<boolean>>;
  setGoalData: (goal: string) => void;
  setDeadlineData: (date: Date) => void;
  setROIData: (roi: number) => void;
}
const Campaign = () => {
  const router = useRouter();
  const [goalSet, setGoalSet] = useState(false);
  const [deadlineSet, setDeadlineSet] = useState(false);
  const [roiSet, setRoiSet] = useState(false);

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
          flexDirection: "column",
          gap: 24,
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: 300
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: 300
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 8,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#616161",
                fontSize: 16,
              }}
            >
              Campaign Funding Goal
            </Text>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#000",
                fontSize: 24,
              }}
            >
              $2000
            </Text>
          </View>
          <View
            style={{
              width: 29,
              height: 29,
              borderRadius: 8,
              backgroundColor: "#EEE",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.push('/FundingCamp') }>
              <Image
                source={require("../../../assets/edit.png")}
                style={{ width: 17, height: 17 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: 300
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 8,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#616161",
                fontSize: 16,
              }}
            >
              Campaign End Date
            </Text>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#000",
                fontSize: 24,
              }}
            >
              8th April(14 Days)
            </Text>
          </View>
          <View
            style={{
              width: 29,
              height: 29,
              borderRadius: 8,
              backgroundColor: "#EEE",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <TouchableOpacity onPress={() => router.push('/Deadline') }>
              <Image
                source={require("../../../assets/edit.png")}
                style={{ width: 17, height: 17 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: 300,
            gap: 40
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 8,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#616161",
                fontSize: 16,
              }}
            >
              %ROI For Investors
            </Text>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                color: "#000",
                fontSize: 24,
              }}
            >
              $30.86
            </Text>
          </View>
          <View
            style={{
              width: 29,
              height: 29,
              borderRadius: 8,
              backgroundColor: "#EEE",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <TouchableOpacity onPress={() => router.push('/Investor') }>
              <Image
                source={require("../../../assets/edit.png")}
                style={{ width: 17, height: 17 }}
              />
            </TouchableOpacity>
          </View>
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
          <Text style={{ color: "#FFF" }}>Publish Your Campaign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Campaign;
