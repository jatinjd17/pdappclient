import React, { useEffect, useState } from "react";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { deletetrackedproductbyuser } from "../actions/trackproduct";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Trackeduserproducts({ products, username, navigation }) {
  const [visible, setvisible] = useState(false);
  const prourlflipkart = products?.producturl.replace(/-/g, " ").slice(0, -7);
  const prourlamazon = products?.producturl.replace(/-/g, "+").slice(0, -7);
  if (products.platform === "Flipkart") {
    var dynamicurl = `https://www.flipkart.com/search?q=${prourlflipkart}`;
  }
  if (products.platform === "Amazon") {
    var dynamicurl = `https://www.amazon.in/s?k=${prourlamazon}&tag=jatin170f-21`;
  }

  const deleteproduct = (username, productid) => {
    deletetrackedproductbyuser(username, productid)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {}, []);
  return (
    <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
      <TouchableOpacity
        onPress={() => Linking.openURL(dynamicurl)}
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
              {products.platform === "Amazon" && (
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/icons/amazon.png")}
                />
              )}

              {products.platform === "Flipkart" && (
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
                uri: `${products.imageurl}`,
              }}
            />
          </View>
          <View
            style={{
              width: "50%",
              flex: 1,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View style={{ marginBottom: 5, flexDirection: "row" }}>
              <Text
                style={{
                  textAlignVertical: "center",
                  borderWidth: 1,
                  borderColor: "blue",
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  color: "blue",
                }}
              >
                Tracking
              </Text>
              {/* <Button
                title="Untrack"
                onPress={() => {
                  // setvisible(true);
                  //   this.setState({ visible: true });
                  deleteproduct(username, products._id);
                  navigation.replace("settings");
                }} 
              />*/}
              <TouchableOpacity
                onPress={() => {
                  // setvisible(true);
                  //   this.setState({ visible: true });
                  deleteproduct(username, products._id);
                  navigation.replace("settings");
                }}
              >
                <View
                  style={{
                    backgroundColor: "orange",
                    padding: 3,
                    borderRadius: 5,
                    marginLeft: 15,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    // elevation: 6,
                  }}
                >
                  <Icon name="delete-outline" size={29} color="white" />
                </View>
              </TouchableOpacity>

              {/* <Dialog
                visible={visible}
                onTouchOutside={() => {
                  setvisible(false);
                }}
              >
                <DialogContent>{"sad"}</DialogContent>
              </Dialog> */}
            </View>
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
                  {products.price}
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
                  {products.discountprice}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "900", fontSize: 16 }}>
                  {"  "}
                  {products.percent}% Off
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
                  {products.lowestprice}
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
                  {products.highestprice}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 14, fontWeight: "900", marginTop: 8 }}>
          {products.product}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Trackeduserproducts;
