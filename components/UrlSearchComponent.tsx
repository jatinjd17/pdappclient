import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";

export default function UrlSearchComponent({ navigation }) {
  const [text, setText] = useState("");

  const onChangeText = (newText) => {
    setText(newText);

    // https://dl.flipkart.com/s/Ac4jl9uuuN
  };

  const onSubmit = () => {
    let encoded = encodeURIComponent(text);

    const LinkforURLSearch = "https://www.pricebefore.com/search/?q=" + encoded;

    console.log(LinkforURLSearch);

    navigation.navigate("urlspecificproductpage", {
      producturl: LinkforURLSearch,
    });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 20,
        // borderWidth: 0.3,
        borderColor: "grey",
        shadowColor: "#e32f45",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 8,
      }}
    >
      <View
        // style={styles.container}
        style={{ width: "80%" }}
      >
        <TextInput
          // style={styles.input}
          style={{
            height: 80,
            borderColor: "gray",
            // borderWidth: 1,
            padding: 6,
            borderRadius: 20,
            backgroundColor: "white",
          }}
          onChangeText={onChangeText}
          value={text}
          multiline={true}
          numberOfLines={20}
          placeholder="Put your Product Link"
          // placeholderTextColor={"#FFFEFF"}
        />
      </View>
      <View style={{ width: "20%" }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#e32f45",
            height: 60,
            width: 55,
            marginTop: 10,
            borderRadius: 10,
            // borderWidth: 1,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 8,
          }}
          onPress={() => {
            onSubmit();
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            <Icon name="search" size={40} color="white" />
          </Text>

          {/* <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              textAlign: "center",
              marginTop: 10,
              color: "#9389FF",
            }}
          >
            GO
          </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "80%",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});
