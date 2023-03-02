import React, { useEffect, useState } from "react";
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
  Button,
  ActivityIndicator,
} from "react-native";
import { getSearchdataaction } from "../../actions/search";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { isAuth } from "../../actions/login";
import { trackallproductsuser, Trackproduct } from "../../actions/trackproduct";

function Search({ navigation }) {
  const [query, setquery]: any = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [pro, setpro] = useState([]);
  const [username, setusername] = useState("");
  const [extractedData, SetExtractedData]: any = useState("");
  const [pageNo, SetPageNo]: any = useState(1);
  const [triggerNextPage, SettriggerNextPage]: any = useState(false);
  let many = [];

  const clearInput = () => {
    setquery("");
    setsearchdata([]);
  };

  useEffect(() => {
    isAuth().then((data) => {
      if (data) {
        setusername(data.userr);
        blogs(data.userr);
      }
    });
  }, []);

  const blogs = async (username) => {
    const all: any = await allBlogs(username);
    if (all) {
      all.forEach((prod) => {
        many.push(prod.product);
      });
      setpro(many);
    }
  };

  const allBlogs = (username) => {
    return trackallproductsuser(username).then((data) => {
      if (!data) {
        return false;
      } else {
        console.log(data);
        return data.trackedproducts;
      }
    });
  };

  const trackpro = async (item) => {
    if (username) {
      const yeye = {
        username1: username,
        productname1: {
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
          mailsent: false,
        },
      };

      console.log(yeye);

      Trackproduct(yeye).then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        if (data.success) {
          console.log(data);
          // setpro(item.producttitle);
          setpro([...pro, item.producttitle]);

          // settrakpro(card.producttitle);
        }
      });

      console.log("issss auttthhhh");
    }
    if (!username) {
      console.log("Nottttt auttthhhh");
      navigation.navigate("signin");
    }
  };

  const item = ({ item }: any) => {
    const prourl = item.producturl.replace(/-/g, " ").slice(0, -7);
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

              {/* <View
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
                    paddingTop: 8,
                  }}
                >
                  Highest Price:
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    {"\u20B9"}
                    {item.highestprice}
                  </Text>
                </Text>
              </View> */}
            </View>
          </View>

          <Text style={{ fontSize: 14, fontWeight: "900", marginTop: 8 }}>
            {item.producttitle}
          </Text>
          {/* <View>
            {pro && (
              <Button
                color={"#e32f45"}
                disabled={
                  pro.includes(item.producttitle) === true ? true : false
                }
                title={
                  pro.includes(item.producttitle) === true
                    ? `Tracking`
                    : `Add to Watchlist`
                }
                onPress={() => {
                  trackpro(item);
                  // setpro;
                  // settrakpro(card.producttitle);
                  // console.log(trakpro);
                }}
              />
            )}
          </View> */}
          {/* ?????????????????NEW>>>>>>>>>???????????????? */}
          {/* <View>
            <TouchableOpacity
              style={
                pro.includes(item.producttitle) === true
                  ? {
                      backgroundColor: "grey",
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                    }
                  : {
                      backgroundColor: "#e32f45",
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                    }
              }
              disabled={pro.includes(item.producttitle) === true ? true : false}
              onPress={() => {
                trackpro(item);
                // setpro(item.producttitle);
                // console.log(pro);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {pro.includes(item.producttitle) === true
                  ? `Tracking`
                  : `Add to Watchlist`}
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* ?????????????????NEWEnd>>>>>>>>>???????????????? */}
        </TouchableOpacity>
      </View>
    );
  };

  const GetExtractedData = (text) => {
    fetch("http://3.110.124.205:8000/333", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/search/?q=${text}&page=1`,
      }),
      // body: JSON.stringify({
      //   url: `https://www.pricebefore.com/price-drops/?category=laptops&price-drop=${dealtime}&more=true`,
      // }),
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
        console.log("4444444444444444444444444444");
        console.log(data);
        console.log("55555555555555555555");
        SettriggerNextPage(true);
        SetExtractedData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GetExtractedDataByPage = (text) => {
    console.log(pageNo);
    SetPageNo(pageNo + 1);
    fetch("http://3.110.124.205:8000/333", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/search/?q=${text}&page=${pageNo + 1}`,
      }),
      // body: JSON.stringify({
      //   url: `https://www.pricebefore.com/price-drops/?category=laptops&price-drop=${dealtime}&more=true`,
      // }),
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
        console.log("4444444444444444444444444444");
        console.log(data);
        console.log("55555555555555555555");
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
          // width: "100%",
          marginTop: 10,
          borderRadius: 10,
          borderColor: "red",
          borderWidth: 1,
          marginHorizontal: 12,
          padding: 4,
          // marginRight: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              // backgroundColor: "white",
              padding: 7,
              paddingVertical: 9,
              // borderRadius: 10,
              marginLeft: 9,
              // borderColor: "red",
              // borderWidth: 1,
            }}
            value={query}
            placeholder="Search Products"
            placeholderTextColor={"red"}
            onChangeText={(text) => {
              setquery(text);
              console.log(query);
              if (!text) {
                setsearchdata([]);
              }
              if (text) {
                GetExtractedData(text);
                // setsearchdata(text)
                // getSearchdataaction(text)
                //   .then((data) => {
                //     setsearchdata(data);
                //   })
                //   .catch((e) => {
                //     console.log(e);
                //   });
              }
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            // marginRight: 8,
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
