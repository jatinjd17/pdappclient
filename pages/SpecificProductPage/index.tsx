import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { getData } from "../../actions/login";
import LikeIcon from "react-native-vector-icons/AntDesign";

export default function SpecificProductPage({ route, navigation }) {
  const {
    product,
    price,
    highestprice,
    lowestprice,
    percent,
    platform,
    discountprice,
    category,
    imageurl,
    producturl,
    features,
  } = route.params;

  const [extractedData, SetExtractedData]: any = useState("");
  const [UserEmail, SetUserEmail]: any = useState(null);
  const [AddtoWatchlistButton, SetAddtoWatchlistButton]: any = useState(true);

  useEffect(() => {
    GetExtractedData();
    CheckIfProductWatchlist();
  }, []);

  const GetExtractedData = () => {
    fetch("http://3.110.124.205:8000/222", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/${producturl}.html`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return null;
        }
        SetExtractedData(data);
        getData("user").then((data) => {
          SetUserEmail(data);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const AddtoWatchList = async () => {
    const email = await getData("user");
    let FinalLinkk = "";
    if (!email) {
      navigation.navigate("signin");
      return;
    }

    if (extractedData != 0) {
      const linkk = extractedData.productlink;
      const link = linkk.split("?");
      FinalLinkk = link[0];
    }
    const data = {
      email: email,
      discountprice: discountprice,
      highestprice: extractedData?.highestprice,
      imageurl: imageurl,
      lowestprice: extractedData?.lowestprice,
      percent: percent,
      price: extractedData?.price,
      product: extractedData?.product,
      producturl: FinalLinkk,
    };
    fetch("http://3.110.124.205:8000/666", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return null;
        }
        if (data.success) {
          SetAddtoWatchlistButton(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ProductLink = () => {
    if (extractedData != 0) {
      const platformm = extractedData.platform;
      const linkk = extractedData.productlink;
      const link = linkk.split("?");
      const FinalLink1 = link[0];
      const FinalLink =
        FinalLink1 + "?tag=jatin170f-21&linkCode=ll1&ref_=as_li_ss_tl";

      // SetFinalProductLink(FinalLink);
      //   return link[0];
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            alignItems: "center",
            width: 160,
            // paddingVertical: 4,
            alignSelf: "center",
            borderRadius: 8,
            padding: 10,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 9,
            shadowColor: "orange",
            borderColor: "orange",
          }}
          onPress={() => Linking.openURL(FinalLink)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
            {platformm}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const Featuress = () => {
    if (!features) {
      return extractedData?.features?.map((b: any, i: any) => {
        if (i <= 2) {
          return null;
        }
        return (
          <View key={i} style={{ flexDirection: "row", marginVertical: 2 }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{"\u2022"}</Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: "600", color: "grey" }}>{b}</Text>
            </View>
          </View>
        );
      });
    } else {
      return features.map((b: any, i: any) => {
        if (i <= 2) {
          return null;
        }
        return (
          <View key={i} style={{ flexDirection: "row", marginVertical: 2 }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{"\u2022"}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "600", color: "grey" }}>{b}</Text>
            </View>
          </View>
        );
      });
    }
  };

  const CheckIfProductWatchlist = () => {
    if (extractedData != 0 && UserEmail != null) {
      fetch("http://3.110.124.205:8000/888", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          product: extractedData?.product,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return null;
          }
          if (data.Found) {
            SetAddtoWatchlistButton(false);
          } else {
            SetAddtoWatchlistButton(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return null;
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF9F9" }}>
      <View style={{ alignItems: "center", marginTop: 8, marginBottom: 100 }}>
        <Image
          style={{
            height: 200,
            width: 200,
            resizeMode: "contain",
            // alignItems: "center",
          }}
          source={{
            uri: `${imageurl}`,
          }}
        />
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            fontWeight: "700",
            paddingTop: 10,
            marginBottom: 3,
            textAlign: "center",
            height: 65,
            marginHorizontal: 10,
          }}
        >
          {product}
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
            {price}
          </Text>
          <Text style={{ fontWeight: "400", fontSize: 12, marginTop: 5 }}>
            {percent}% Off
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
            {discountprice}
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
            {extractedData?.lowestprice}
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
            {extractedData?.highestprice}
          </Text>
          <View style={{}}>
            <Icon name="arrow-up-circle" size={29} color="red" />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => AddtoWatchList()}
          disabled={AddtoWatchlistButton ? false : true}
          style={[
            styles.text,
            AddtoWatchlistButton ? styles.bgcolorred : styles.bgcolorgrey,
          ]}
        >
          {AddtoWatchlistButton ? (
            <View
              style={{
                marginTop: -3,
                marginRight: 5,
                justifyContent: "center",
              }}
            >
              <LikeIcon name="heart" size={15} color="white" />
            </View>
          ) : (
            <View
              style={{
                marginTop: -3,
                marginRight: 5,
                justifyContent: "center",
              }}
            >
              <LikeIcon name="heart" size={15} color="red" />
            </View>
          )}

          {AddtoWatchlistButton ? (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                justifyContent: "center",
                verticalAlign: "middle",
                marginTop: -2,
                color: "white",
              }}
            >
              Add To WatchList
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                justifyContent: "center",
                verticalAlign: "middle",
                marginTop: -2,
                color: "white",
              }}
            >
              Added To WatchList
            </Text>
          )}
        </TouchableOpacity>
        {extractedData == 0 ? (
          <ActivityIndicator
            style={{ marginTop: 15 }}
            color="red"
            size={"large"}
          />
        ) : (
          <View style={{ marginTop: 15, marginBottom: 10 }}>
            {ProductLink()}
          </View>
        )}
        <View style={{ paddingHorizontal: 15, marginTop: 5 }}>
          {Featuress()}
        </View>
      </View>

      {extractedData == 0 ? (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          color="red"
          size={"large"}
        />
      ) : (
        <CheckIfProductWatchlist />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 7,

    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 9,
    height: 32,
    marginTop: 5,

    // padding: 6,
  },
  bgcolorred: {
    backgroundColor: "red",
    shadowColor: "red",
    borderColor: "red",
  },
  bgcolorgrey: {
    backgroundColor: "grey",
    shadowColor: "grey",
    borderColor: "grey",
  },
});
