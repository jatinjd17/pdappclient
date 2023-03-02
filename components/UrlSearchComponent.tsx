import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";

export default function UrlSearchComponent({ navigation }) {
  const [text, setText] = useState("");

  const onChangeText = (newText) => {
    setText(newText);
  };

  const onSubmit = () => {
    let encoded = encodeURIComponent(text);

    const LinkforURLSearch = "https://www.pricebefore.com/search/?q=" + encoded;

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
      <View style={{ width: "80%" }}>
        <TextInput
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
        </TouchableOpacity>
      </View>
    </View>
  );
}
