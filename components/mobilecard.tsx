import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";

function Mobilecard({ card, navigation }: any) {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      style={{
        width: 220,
        // height: 377,
        height: 350,
        backgroundColor: "white",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
      // onPress={() => Linking.openURL(dynamicurl)}
      onPress={() =>
        navigation.navigate("specificproductpage", {
          product: card.producttitle,
          price: card.finalprice,
          highestprice: card.highestprice,
          lowestprice: card.lowestprice,
          percent: card.percent,
          platform: card.platform,
          discountprice: card.discountprice,
          category: card.category,
          imageurl: card.imageurl,
          producturl: card.producturl,
          features: card.features,
          // viewalldealtime: dealtimeeee,
          // category: category,
          // dealtimecat: dealtimecat,
          // originalviewalldealtime: viewalldealtimeee,
        })
      }
    >
      <Image
        style={{
          height: 140,
          width: 140,
          resizeMode: "contain",
          // alignItems: "center",
        }}
        source={{
          uri: `${card.imageurl}`,
        }}
      />
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={{
          fontSize: 14,
          fontWeight: "500",
          paddingTop: 10,
          marginBottom: 3,
          textAlign: "center",
          height: 65,
        }}
      >
        {card.producttitle}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            fontSize: 23,
            fontWeight: "900",
            paddingTop: 10,
            marginLeft: 33,
            textAlign: "center",
            color: "green",
          }}
        >
          {"\u20B9"}
          {card.finalprice}
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 12, marginTop: 5 }}>
          {card.percent}% Off
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: "red",
            fontWeight: "500",
            fontSize: 12,
            textDecorationLine: "line-through",
          }}
        >
          {"\u20B9"}
          {card.discountprice}
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{}}>
          <Icon name="arrow-down-circle" size={29} color="green" />
        </View>
        <Text
          style={{
            textAlignVertical: "center",
            paddingHorizontal: 5,
            color: "green",
          }}
        >
          {"\u20B9"}
          {card.lowestprice}
        </Text>
        <Icon1 name="drag-vertical-variant" size={29} color="black" />
        <Text
          style={{
            textAlignVertical: "center",
            paddingHorizontal: 5,
            color: "red",
          }}
        >
          {"\u20B9"}
          {card.highestprice}
        </Text>
        <View style={{}}>
          <Icon name="arrow-up-circle" size={29} color="red" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Mobilecard;
