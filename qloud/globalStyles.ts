// styles/globalStyles.ts
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  regularTextW: {
    fontFamily: "Inter_400Regular", // Regular weight
    fontSize: 14,
    color: 'white'
  },
  regularText: {
    fontFamily: "Inter_400Regular", // Regular weight
    fontSize: 14,
    color: 'black'
  },
  boldText: {
    fontFamily: "Inter_400Regular",
    fontWeight: "bold", // Makes it bold
    fontSize: 18,
    color: 'white'
  },
  largeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 24, // Larger text
    color: 'white'
  },
});
