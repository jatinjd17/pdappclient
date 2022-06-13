import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { getSearchdataaction } from "../../actions/search";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Search() {
  const [query, setquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);

  const clearInput = () => {
    setquery("");
    setsearchdata([]);
  };

  const item = ({ item }: any) => {
    const prourl = item.producturl.replace(/-/g, " ").slice(0, -7);
    return (
      <View style={{ marginHorizontal: 6 }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.flipkart.com/search?q=${prourl}`)
          }
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
                    source={require("../../assets/icons/amazon.png")}
                  />
                )}

                {item.platform === "Flipkart" && (
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../../assets/icons/fk.png")}
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
                }}
              >
                <Text
                  style={{
                    color: "lightgreen",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Lowest Price:
                  <Text style={{ fontWeight: "bold", color: "green" }}>
                    {"\u20B9"}
                    {item.lowestprice}
                  </Text>
                </Text>
                <Text style={{ color: "red", fontWeight: "600", fontSize: 12 }}>
                  Highest Price:
                  <Text style={{ fontWeight: "bold", color: "red" }}>
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
    <View style={{ marginBottom: 140 }}>
      <View
        style={{
          flexDirection: "row",

          width: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              backgroundColor: "white",
              padding: 7,
              paddingVertical: 9,
              borderRadius: 10,
              marginLeft: 9,
              borderColor: "red",
              borderWidth: 1,
            }}
            value={query}
            placeholder="Search Deals"
            placeholderTextColor={"red"}
            onChangeText={(text) => {
              setquery(text);
              console.log(query);
              if (!text) {
                setsearchdata([]);
              }
              if (text) {
                getSearchdataaction(text)
                  .then((data) => {
                    setsearchdata(data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            marginRight: 8,
          }}
        >
          {query.length === 0 ? (
            <View
              style={{
                padding: 17,
                backgroundColor: "red",
                borderRadius: 10,
              }}
            >
              <FontAwesome name="search" color="white" />
            </View>
          ) : (
            <TouchableOpacity onPress={clearInput}>
              <View
                style={{
                  padding: 17,
                  backgroundColor: "red",
                  borderRadius: 10,
                }}
              >
                <FontAwesome name="times" color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss} accessible={true}>
        <FlatList
          data={searchdata}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Search;
