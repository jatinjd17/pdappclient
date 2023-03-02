import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

function Viewallamazfkcomponent({ category, navigation }) {
  const [extractedData, SetExtractedData]: any = useState("");
  const [pageNo, SetPageNo]: any = useState(1);
  const [triggerNextPage, SettriggerNextPage]: any = useState(false);
  const [TriggerNoProductsAvailable, SetTriggerNoProductsAvailable]: any =
    useState(false);

  useEffect(() => {
    GetExtractedData();
  }, []);

  const item = ({ item }: any) => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            // Linking.openURL(dynamicurl)
            navigation.navigate("specificproductpage", {
              product: item.producttitle,
              price: item.finalprice,
              highestprice: item.highestprice,
              lowestprice: item.lowestprice,
              percent: item.percent,
              platform: item.platform,
              discountprice: item.discountprice,
              category: item.category,
              imageurl: item.imageurl,
              producturl: item.producturl,
              features: item.features,
              // viewalldealtime: dealtimeeee,
              // category: category,
              // dealtimecat: dealtimecat,
              // originalviewalldealtime: viewalldealtimeee,
            })
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
            elevation: 6,
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
                  // borderRadius: 15,
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
                    color: "#73a802",
                    fontWeight: "600",
                    fontSize: 12,
                    borderColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                  }}
                >
                  Lowest Price:
                  <Text style={{ fontWeight: "bold", color: "green" }}>
                    {"\u20B9"}
                    {item.lowestprice}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontWeight: "600",
                    fontSize: 12,
                    marginTop: 8,
                  }}
                >
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

  const GetExtractedData = () => {
    fetch("http://3.110.124.205:8000/111", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/${category}/?page=1&more=true`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
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

  const GetExtractedDataByPage = () => {
    // console.log(pageNo);
    SetPageNo(pageNo + 1);
    fetch("http://3.110.124.205:8000/111", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/${category}/?page=${
          pageNo + 1
        }&more=true`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          SetTriggerNoProductsAvailable(true);
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
    <View style={{ marginBottom: 190 }}>
      {TriggerNoProductsAvailable ? (
        <View style={{ height: "100%" }}>
          <Text
            style={{ textAlign: "center", marginTop: 100, fontWeight: "bold" }}
          >
            No Products Available
          </Text>
        </View>
      ) : extractedData == 0 ? (
        <View style={{ height: "100%" }}>
          <ActivityIndicator
            style={{ marginTop: 30 }}
            color="red"
            size={"large"}
          />
        </View>
      ) : (
        <FlatList
          data={extractedData}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={triggerNextPage && GetExtractedDataByPage}
          onEndReachedThreshold={3}
          ListFooterComponent={triggerNextPage && listfootercomp}
        />
      )}
    </View>
  );
}

export default Viewallamazfkcomponent;
