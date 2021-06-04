import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "expo-clipboard";
const { width, height } = Dimensions.get("window");

const MoviePanel = ({ route }) => {
  const Moviedata = route.params;
  const magnet = Moviedata.item.torrents.items[0].torrent_magnet;
  let text = "";
  const getcopied = async () => {
    text = Clipboard.getStringAsync();
    return text;
  };
  return (
    <View style={styles.container}>
      {console.log(Moviedata.item)}
      <View style={styles.topContainer}>
        <Image
          source={{ uri: Moviedata.item.poster_big }}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.flexRow}>
          <Text style={[styles.year, styles.textWhite]}>
            {Moviedata.item.year}
          </Text>
          <Text style={[styles.textWhite, styles.genres]}>
            {Moviedata.item.genres.join(" | ")}
          </Text>
        </View>
        <View>
          <Text style={[styles.textWhite, styles.title]}>
            {Moviedata.item.title}
          </Text>
          <View style={[styles.flexRow, styles.flexEnd]}>
            <Text style={[styles.textWhite, styles.imdbScore]}>
              {Moviedata.item.rating}
            </Text>
            <Text style={[styles.textWhite, styles.imdbScoreOverall]}>/10</Text>
            <Text style={[styles.textWhite, styles.imdb]}>IMDb</Text>
          </View>
          <Text style={[styles.textWhite, styles.desc]} numberOfLines={6}>
            {Moviedata.item.description}
          </Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(
                Moviedata.item.torrents.items[0].torrent_magnet
              );
              getcopied().then((x) =>
                ToastAndroid.show("Copied to Clipboard", ToastAndroid.LONG)
              );
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={{
                uri: "https://img.icons8.com/android/26/ffffff/magnet.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={["transparent", "#00000080", "#000000", "#000000"]}
        style={styles.linearGradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContainer: { height: (height - 100) / 2, width },
  image: {
    width,
    height: height - 200,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 25,
    position: "relative",
    zIndex: 10,
  },
  flexRow: { flexDirection: "row" },
  textWhite: { color: "#ffffff" },
  year: { fontFamily: "Inter_600SemiBold" },
  genres: {
    marginLeft: 10,
    fontFamily: "Inter_600SemiBold",
    color: "#ffffff90",
  },
  linearGradient: {
    height: height,
    width,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 6,
  },
  flexEnd: { alignItems: "flex-end" },
  imdbScore: { fontFamily: "Inter_600SemiBold", fontSize: 18 },
  imdbScoreOverall: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#ffffff80",
  },
  imdb: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 18,
    marginLeft: 10,
    color: "#ffba00",
  },
  desc: { marginTop: 10, fontFamily: "Inter_400Regular" },
  title: {
    fontFamily: "Oswald_600SemiBold",
    fontSize: 48,
    textTransform: "uppercase",
    lineHeight: 56,
    marginVertical: 20,
  },
});
export default MoviePanel;
