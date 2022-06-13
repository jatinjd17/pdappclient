import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { viewalldealcataction } from "../actions/viewall";
import Mobilecard from "./mobilecard";
import Categorydropdown from "./categorydropdown";

function ViewallDealcomponent({
  dealtime,
  category,
  navigation,
  dealtimecat,
  originalviewalldealtime,
}) {
  const [mobiles, setMobiles]: any = useState([]);

  useEffect(() => {
    Mob();
  }, []);

  const Mob = async () => {
    const all: any = await getallMobiless();
    if (all) {
      setMobiles(all);
    }
  };

  const getallMobiless = async () => {
    return viewalldealcataction({ dealtime, category }).then((data) => {
      if (!data) {
        return false;
      } else {
        console.log(data);
        return { m: data };
      }
    });
  };

  const getAllMobilesHome = (mobiless: any) => {
    if (mobiless != null) {
      return mobiless.map((b: any, i: any) => {
        return (
          <View key={i}>
            <Mobilecard card={b} />
          </View>
        );
      });
    } else {
      return null;
    }
  };

  const item = ({ item }: any) => {
    const prourlflipkart = item.producturl.replace(/-/g, " ").slice(0, -7);
    const prourlamazon = item.producturl.replace(/-/g, "+").slice(0, -7);
    if (item.platform === "Flipkart") {
      var dynamicurl = `https://www.flipkart.com/search?q=${prourlflipkart}`;
    }
    if (item.platform === "Amazon") {
      var dynamicurl = `https://www.amazon.in/s?k=${prourlamazon}`;
    }
    return (
      <View style={{ marginHorizontal: 6 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(dynamicurl)}
          style={{
            backgroundColor: "white",
            marginVertical: 2,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "50%" }}>
              <View style={{ position: "absolute", zIndex: 100 }}>
                {item.platform === "Amazon" && (
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../assets/icons/amazon.png")}
                  />
                )}

                {item.platform === "Flipkart" && (
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../assets/icons/fk.png")}
                  />
                )}
              </View>
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
                  uri: `${item.imageurl}`,
                }}
              />
            </View>
            <View
              style={{
                width: "50%",
                flex: 1,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: 20,
                      color: "green",
                    }}
                  >
                    {"\u20B9"}
                    {item.finalprice}
                  </Text>
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "red",
                      fontSize: 12,
                      fontWeight: "500",
                      marginLeft: 10,
                    }}
                  >
                    {"\u20B9"}
                    {item.discountprice}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: "900", fontSize: 16 }}>
                    {"  "}
                    {item.percent}% Off
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  padding: 6,
                  borderColor: "brown",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "blue",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Lowest Price:
                  <Text style={{ fontWeight: "bold", color: "blue" }}>
                    {"\u20B9"}
                    {item.lowestprice}
                  </Text>
                </Text>
                <Text
                  style={{ color: "orange", fontWeight: "600", fontSize: 12 }}
                >
                  Highest Price:
                  <Text style={{ fontWeight: "bold", color: "orange" }}>
                    {"\u20B9"}
                    {item.highestprice}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 14, fontWeight: "900", marginTop: 8 }}>
            {item.producttitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Categorydropdown
        category={category}
        navigation={navigation}
        dealtimecat={dealtimecat}
        originalviewalldealtime={originalviewalldealtime}
      />

      {mobiles == 0 ? (
        <ActivityIndicator
          style={{ marginTop: 30 }}
          color="red"
          size={"large"}
        />
      ) : (
        <FlatList
          data={mobiles.m}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

export default ViewallDealcomponent;
