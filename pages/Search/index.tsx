import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Search({ navigation }) {
  const [query, setquery]: any = useState("");
  const [extractedData, SetExtractedData]: any = useState("");
  const [pageNo, SetPageNo]: any = useState(1);
  const [triggerNextPage, SettriggerNextPage]: any = useState(false);

  const clearInput = () => {
    setquery("");
  };

  useEffect(() => {}, []);

  const item = ({ item }: any) => {
    return (
      <View style={{ marginHorizontal: 8, marginVertical: 6 }}>
        <TouchableOpacity
          onPress={
            () =>
              navigation.navigate("specificproductpage", {
                product: item.producttitle,
                price: item.finalprice,
                // highestprice: item.highestprice,
                // lowestprice: item.lowestprice,
                percent: item.percent,
                platform: item.platform,
                discountprice: item.discountprice,
                category: item.category,
                imageurl: item.imageurl,
                producturl: item.producturl,
                // viewalldealtime: dealtimeeee,
                // category: category,
                // dealtimecat: dealtimecat,
                // originalviewalldealtime: viewalldealtimeee,
              })
            // Linking.openURL(`https://www.flipkart.com/search?q=${prourl}`)
          }
          style={{
            backgroundColor: "white",
            marginVertical: 2,
            borderRadius: 15,
            padding: 10,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
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
                marginTop: 40,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: 22,
                      color: "green",
                    }}
                  >
                    {/* {"\u20B9"} */}
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
                <View style={{ alignItems: "flex-end", marginLeft: -10 }}>
                  <Text style={{ fontWeight: "900", fontSize: 10 }}>
                    {"  "}
                    {item.percent}
                  </Text>
                </View>
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

  const GetExtractedData = (text) => {
    fetch("http://13.201.82.250:8000/333", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/search/?q=${text}&page=1`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          SettriggerNextPage(false);
          return null;
        }
        if (!data) {
          SettriggerNextPage(false);
          return null;
        }
        SettriggerNextPage(true);
        SetExtractedData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GetExtractedDataByPage = (text) => {
    // console.log(pageNo);
    SetPageNo(pageNo + 1);
    fetch("http://13.201.82.250:8000/333", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/search/?q=${text}&page=${pageNo + 1}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          SettriggerNextPage(false);
          return null;
        }
        if (!data) {
          SettriggerNextPage(false);
          return null;
        }
        SettriggerNextPage(true);
        SetExtractedData([...extractedData, ...data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const listfootercomp = () => {
    return <ActivityIndicator size={"large"} />;
  };

  return (
    <View style={{ marginBottom: 140 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 10,
          borderColor: "red",
          borderWidth: 1,
          marginHorizontal: 12,
          padding: 4,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              padding: 7,
              paddingVertical: 9,
              marginLeft: 9,
            }}
            value={query}
            placeholder="Search Products"
            placeholderTextColor={"red"}
            onChangeText={(text) => {
              setquery(text);
              // console.log(query);
              if (!text) {
              }
              if (text) {
                GetExtractedData(text);
              }
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            marginRight: 6,
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
          data={extractedData}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => triggerNextPage && GetExtractedDataByPage(query)}
          onEndReachedThreshold={4}
          ListFooterComponent={triggerNextPage && listfootercomp}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Search;
