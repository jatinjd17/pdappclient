import React from "react";
import { Linking, TouchableOpacity, View, Image, Text } from "react-native";

function Viewallcard({ card, navigation }) {
  const prourlflipkart = card.producturl.replace(/-/g, " ").slice(0, -7);
  const prourlamazon = card.producturl.replace(/-/g, "+").slice(0, -7);
  if (card.platform === "Flipkart") {
    var dynamicurl = `https://www.flipkart.com/search?q=${prourlflipkart}`;
  }
  if (card.platform === "Amazon") {
    var dynamicurl = `https://www.amazon.in/s?k=${prourlamazon}&tag=jatin170f-21`;
  }

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() =>
          // Linking.openURL(dynamicurl)
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
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 10,
            overflow: "hidden",
            marginVertical: 20,
            width: 120,
          }}
        >
          <Image
            style={{
              marginLeft: 6,
              marginRight: 6,
              width: 150,
              height: 120,
              borderRadius: 15,
              resizeMode: "contain",
            }}
            source={{
              uri: `${card.imageurl}`,
            }}
          />

          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{ fontSize: 12, paddingTop: 10, marginBottom: 3 }}
          >
            {card.producttitle}
          </Text>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: -4,
              }}
            >
              {"\u20B9"}
              {card.finalprice}
            </Text>

            <Text style={{ fontWeight: "400", fontSize: 10 }}>
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
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              borderColor: "brown",
              width: 120,
            }}
          >
            <Text
              style={{
                color: "lightgreen",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              Low Price:{" "}
              <Text style={{ fontWeight: "bold", color: "green" }}>
                {"\u20B9"}
                {card.lowestprice}
              </Text>
            </Text>
            <Text style={{ color: "red", fontWeight: "600", fontSize: 12 }}>
              High Price:{" "}
              <Text style={{ fontWeight: "bold", color: "red" }}>
                {"\u20B9"}
                {card.highestprice}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Viewallcard;
