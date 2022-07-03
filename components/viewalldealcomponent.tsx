import React, { useEffect, useState } from "react";
import {
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { viewalldealcataction } from "../actions/viewall";
import Mobilecard from "./mobilecard";
import Categorydropdown from "./categorydropdown";
import { isAuth } from "../actions/login";
import { trackallproductsuser, Trackproduct } from "../actions/trackproduct";

function ViewallDealcomponent({
  dealtime,
  category,
  navigation,
  dealtimecat,
  originalviewalldealtime,
}) {
  const [mobiles, setMobiles]: any = useState([]);
  const [pro, setpro] = useState([]);
  const [username, setusername] = useState("");
  let many = [];

  useEffect(() => {
    isAuth().then((data) => {
      if (data) {
        setusername(data.username);
        blogs(data.username);
      }
    });
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
                    color: "blue",
                    fontWeight: "600",
                    fontSize: 12,
                    borderColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                  }}
                >
                  Lowest Price:
                  <Text style={{ fontWeight: "bold", color: "blue" }}>
                    {"\u20B9"}
                    {item.lowestprice}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: "orange",
                    fontWeight: "600",
                    fontSize: 12,
                    paddingTop: 8,
                  }}
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
          <View>
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
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 190 }}>
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
