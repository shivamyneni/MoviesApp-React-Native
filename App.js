import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import MoviePanel from "./components/MoviePanel";
import { dataj } from "./constants/data";
const popcorntime = require("popcorntime");
//import { AppLoading } from "expo-app-loading";
import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  useFonts as useOswaldFonts,
  Oswald_600SemiBold,
} from "@expo-google-fonts/oswald";

export default function App() {
  const Stack = createStackNavigator();
  // const [fetched, setfetched] = React.useState(false);
  // const [Moviedata, setMoviedata] = React.useState([dataj]);
  let [interFontsLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  let [oswaldFontsLoaded] = useOswaldFonts({
    Oswald_600SemiBold,
  });

  if (!interFontsLoaded || !oswaldFontsLoaded) return <></>;
  else
    return (
      <>
        <StatusBar translucent={false} style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MoviePanel" component={MoviePanel} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
