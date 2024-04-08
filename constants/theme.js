import { Dimensions } from "react-native";

const { height, width } = Dimensions.get('window')

const COLORS = {
    primary: "#2A4D50",
    secondary: "#DDF0FF",
    tertiary: "#FF7754",

    gray: "#83829A",
    gray2: "#C1C0C8",

    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    greenBamboo: "#006442",
    greenGossip : '#87D37C',
    greenJungle : '#26C281',
    greenOcean : '#4DAF7C',
    lightWhite: "#FAFAFC",
    lowWhite : '#C3C2C2',

    // Pie Chart Color
    orange : '#f56905',
    blue : '#59a4ff',
    yellow : '#faf441',
    purple : '#a441fa'
};
  
  
const SIZES = {
xSmall: 10,
small: 12,
medium: 16,
large: 20,
xLarge: 24,
xxLarge: 44,
height,
width
};
  
  
const SHADOWS = {
small: {
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
},
medium: {
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
},
};

export { COLORS, SIZES , SHADOWS };