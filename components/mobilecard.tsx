import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Linking,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Trackproduct } from "../actions/trackproduct";
import { useNavigation } from "@react-navigation/native";
import Signin from "../pages/signin";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";

function Mobilecard({ card, username, many, navigation }: any) {
  const prourlflipkart = card.producturl.replace(/-/g, " ").slice(0, -7);
  const prourlamazon = card.producturl.replace(/-/g, "+").slice(0, -7);
  if (card.platform === "Flipkart") {
    var dynamicurl = `https://www.flipkart.com/search?q=${prourlflipkart}`;
  }
  if (card.platform === "Amazon") {
    var dynamicurl = `https://www.amazon.in/s?k=${prourlamazon}&tag=jatin170f-21`;
  }

  const [trakpro, settrakpro] = useState([]);

  useEffect(() => {
    settrakpro(many);
  }, [many]);

  const trackpro = async () => {
    if (username) {
      const yeye = {
        username1: username,
        productname1: {
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
          mailsent: false,
        },
      };

      Trackproduct(yeye).then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        if (data.success) {
          console.log(data);
          settrakpro(card.producttitle);
        }
      });

      console.log("issss auttthhhh");
    }
    if (!username) {
      console.log("Nottttt auttthhhh");
      navigation.navigate("signin");
    }
  };
  return (
    <TouchableOpacity
      style={{
        width: 220,
        height: 377,
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
      onPress={() => Linking.openURL(dynamicurl)}
    >
      {/* <View
        style={
          {
            // width: 220,
            // height: 307,
            // backgroundColor: "white",
            // margin: 10,
            // justifyContent: "center",
            // alignItems: "center",
            // borderRadius: 20,
            // paddingHorizontal: 10,
          }
        }
      > */}
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
      <View style={{ flexDirection: "row" }}>
        <View style={{}}>
          <Icon name="arrow-down-circle" size={29} color="green" />
        </View>
        <Text
          style={{
            textAlignVertical: "center",
            paddingHorizontal: 7,
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
            paddingHorizontal: 7,
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
      <View>
        <TouchableOpacity
          style={
            trakpro.includes(card.producttitle) === true
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
          disabled={trakpro.includes(card.producttitle) === true ? true : false}
          onPress={() => {
            trackpro();
            // settrakpro(card.producttitle);
            // console.log(trakpro);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {trakpro.includes(card.producttitle) === true
              ? `Tracking`
              : `Add to Watchlist`}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </TouchableOpacity>

    ///////////////////////////////IIIIMMMMMMPPPPPPPPP\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // <TouchableOpacity style={{}} onPress={() => Linking.openURL(dynamicurl)}>
    //   <View
    //     style={{
    //       alignItems: "center",
    //       marginHorizontal: 10,
    //       overflow: "hidden",
    //       marginVertical: 20,
    //       width: 160,
    //       backgroundColor: "white",
    //       paddingHorizontal: 20,
    //       paddingVertical: 13,
    //       borderRadius: 20,
    //       shadowColor: "black",
    //       shadowOffset: {
    //         width: 0,
    //         height: 10,
    //       },
    //       shadowOpacity: 0.25,
    //       shadowRadius: 3.5,
    //       elevation: 5,
    //       // shadowColor: "black",
    //     }}
    //   >
    //     <Image
    //       style={{
    //         // alignSelf: "stretch",
    //         resizeMode: "contain",
    //         width: 140,
    //         height: 140,
    //         // marginLeft: 1,
    //         // marginRight: 1,
    //         // // padding: 5,
    //         // // marginLeft: 6,
    //         // // marginRight: 6,
    //         // width: 180,
    //         // height: 140,
    //         // // width: 150,
    //         // // height: 120,
    //         // borderRadius: 15,
    //         // resizeMode: "center",
    //         backgroundColor: "white",
    //       }}
    //       source={{
    //         uri: `${card.imageurl}`,
    //       }}
    //     />

    //     <Text
    //       numberOfLines={3}
    //       ellipsizeMode="tail"
    //       style={{
    //         fontSize: 14,
    //         fontWeight: "500",
    //         paddingTop: 10,
    //         marginBottom: 3,
    //       }}
    //     >
    //       {card.producttitle}
    //     </Text>

    //     <View style={{ flex: 1, flexDirection: "row" }}>
    //       <Text
    //         style={{
    //           color: "green",
    //           fontWeight: "bold",
    //           fontSize: 18,
    //           marginBottom: -4,
    //         }}
    //       >
    //         {"\u20B9"}
    //         {card.finalprice}
    //       </Text>

    //       <Text style={{ fontWeight: "400", fontSize: 10 }}>
    //         {card.percent}% Off
    //       </Text>
    //     </View>
    //     <View>
    //       <Text
    //         style={{
    //           color: "red",
    //           fontWeight: "500",
    //           fontSize: 12,
    //           textDecorationLine: "line-through",
    //         }}
    //       >
    //         {"\u20B9"}
    //         {card.discountprice}
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         borderWidth: 1,
    //         padding: 6,
    //         borderColor: "brown",
    //         width: 140,
    //         borderRadius: 10,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           color: "blue",
    //           fontWeight: "600",
    //           fontSize: 12,
    //         }}
    //       >
    //         Low Price:{" "}
    //         <Text style={{ fontWeight: "bold", color: "blue" }}>
    //           {"\u20B9"}
    //           {card.lowestprice}
    //         </Text>
    //       </Text>
    //       <Text style={{ color: "orange", fontWeight: "600", fontSize: 12 }}>
    //         High Price:{" "}
    //         <Text style={{ fontWeight: "bold", color: "orange" }}>
    //           {"\u20B9"}
    //           {card.highestprice}
    //         </Text>
    //       </Text>
    //       {trakpro && (
    //         <TouchableOpacity
    //         // style={{
    //         //   borderRadius: 10,
    //         // }}
    //         >
    //           <Button
    //             color={"#e32f45"}
    //             disabled={
    //               trakpro.includes(card.producttitle) === true ? true : false
    //             }
    //             title={
    //               trakpro.includes(card.producttitle) === true
    //                 ? `Tracking`
    //                 : `Add to Watchlist`
    //             }
    //             onPress={() => {
    //               trackpro();
    //               // settrakpro(card.producttitle);
    //               // console.log(trakpro);
    //             }}
    //           />
    //         </TouchableOpacity>
    //       )}
    //     </View>
    //   </View>
    // </TouchableOpacity>
    ////////////////////////////////////ENDDDDDDDDDDDD\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  );
}

export default Mobilecard;
