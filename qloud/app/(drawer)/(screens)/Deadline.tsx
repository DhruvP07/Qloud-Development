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
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { router, Router, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-date-picker";

import moment from "moment";

const Deadline = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleCancel = () => {
    setDatePickerVisibility(false);
  };

  const daysUntil = Math.ceil(
    (selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

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
          Set Your Deadline
        </Text>
        <Text>By When Do You Need The Funding</Text>
      </View>

      {/* calendar */}
      <View>
        {/* Your layout with button and calendar icon */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={{
              width: 222,
              height: 52,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EEEEEE",
              borderRadius: 12,
            }}
          >
            <Text>When You Expect To Hit Goals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 50,
              height: 52,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EEEEEE",
              borderRadius: 12,
            }}
            onPress={() => setIsOpen(true)} // Show date picker
          >
            <Image
              source={require("../../../assets/calendar.png")}
              style={{ width: 18, height: 15 }}
            />
          </TouchableOpacity>
        </View>

        {/* Campaign End Date Info */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          <Text
            style={{ fontFamily: "Inter", fontWeight: "400", fontSize: 18 }}
          >
            Campaign End Date
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {selectedDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}{" "}
            ({daysUntil} Days)
          </Text>
        </View>

        {/* Web modal date picker */}
        {Platform.OS === "web" && isOpen && (
          <Modal
            transparent
            animationType="fade"
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 24,
                  borderRadius: 10,
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Select Date
                </Text>
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setSelectedDate(newDate);
                  }}
                  style={{
                    padding: 8,
                    borderRadius: 4,
                    fontSize: 16,
                    borderColor: "#ccc",
                    borderWidth: 1,
                  }}
                />
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setIsOpen(false)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      backgroundColor: "#E1E1E1",
                      borderRadius: 6,
                    }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsOpen(false)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      backgroundColor: "#000",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: "#FFF" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
          onPress={() => router.push("/FundingCamp")}
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
          onPress={() => router.push("/Investor")}
        >
          <Text style={{ color: "#FFF" }}>Set Investor Returns</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Deadline;
