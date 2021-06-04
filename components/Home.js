import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MoviePanel from "./MoviePanel";
import { dataj } from "../constants/data";
const popcorntime = require("popcorntime");
import Constants from "expo-constants";

const Home = ({ navigation }) => {
  // const Moviedata = React.useContext(dataContext);
  const [fetched, setfetched] = React.useState(false);
  const [Moviedata, setMoviedata] = React.useState([dataj]);
  const [Search, setSearch] = React.useState("");
  React.useEffect(() => {
    fetchdata("");
  }, []);
  const fetchdata = (s) => {
    const options = {
      page: 1,
      sortby: "seeds",
      genre: "all",
      q: s, // It is useful to do a search or you can leave it empty
    };
    popcorntime
      .movies(options)
      .then((data) => {
        setfetched(true);
        setMoviedata(data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.Heading}>DISCOVER</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "60%",
              height: 40,
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            <TextInput
              style={{
                width: "80%",
                height: 30,
                width: "90%",
                fontFamily: "Inter_600SemiBold",
                textDecorationLine: "none",
                paddingLeft: 6,
                paddingRight: 6,
              }}
              onChangeText={(val) => setSearch(val)}
            />
            <TouchableOpacity
              onPress={() => {
                fetchdata(Search);
                setSearch("");
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  paddingLeft: 3,
                }}
                source={{
                  uri: "https://img.icons8.com/fluent-systems-regular/20/000000/search.png",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
          {Moviedata.map((item) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => navigation.navigate("MoviePanel", { item })}
              style={{ padding: 8 }}
            >
              <Image
                source={{ uri: item.poster_med }}
                style={styles.imagecontainer}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Heading: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 32,
    color: "#000000",
    padding: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    padding: 32,
  },
  imagecontainer: { width: 125, height: 178, borderRadius: 10 },
});
export default Home;
