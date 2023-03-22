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
import { getData } from "../actions/login";
import LikeIcon from "react-native-vector-icons/AntDesign";
import ImageNotFoundIcon from "react-native-vector-icons/MaterialIcons";
import ImageModal from "react-native-image-modal";

export default function UrlSpecificProduct({ route, navigation }) {
  const { producturl } = route.params;

  const [extractedData, SetExtractedData]: any = useState("");
  const [isError, SetisError]: any = useState(false);
  const [isLoading, SetisLoading]: any = useState(false);
  const [UserEmail, SetUserEmail]: any = useState(null);
  const [AddtoWatchlistButton, SetAddtoWatchlistButton]: any = useState(true);
  const [ChartScrapeBase64, SetChartScrapeBase64]: any = useState(null);
  const [ChartError, SetChartError]: any = useState(false);
  const [OnlyOnce, SetOnlyOnce]: any = useState(false);

  useEffect(() => {
    GetExtractedData();
    CheckIfProductWatchlist();
  }, []);

  const GetExtractedData = () => {
    SetisLoading(true);
    fetch("http://3.110.124.205:8000/222", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${producturl}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetisLoading(false);
        if (!data) {
          return null;
        }

        if (data.errormessage) {
          SetisError(true);
        }
        SetExtractedData(data);
        getData("user").then((data1) => {
          SetUserEmail(data1);
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
      const linkk = extractedData?.productlink;
      const link = linkk?.split("?");
      FinalLinkk = link[0];
    }
    const data = {
      email: email,
      discountprice: extractedData?.discountprice,
      highestprice: extractedData?.highestprice,
      imageurl: extractedData?.imageurl,
      lowestprice: extractedData?.lowestprice,
      percent: extractedData?.percent,
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

  const GetChartScrapeData = () => {
    if (OnlyOnce == false) {
      // console.log("Trigger");
      const linkk = extractedData?.productlink;
      fetch("http://65.2.40.236:5000/sss", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `${linkk}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          SetOnlyOnce(true);
          if (data.error) {
            SetChartError(true);
            return null;
          }
          // if (!data) {
          //   return null;
          // }
          if (data.scrapdata) {
            SetChartScrapeBase64(data.scrapdata);
          }
        })
        .catch((e) => {
          SetChartError(true);
          // console.log("111111111111");
          console.log(e);
          // console.log("222222222222222");
        });
    }
  };

  const ProductLink = () => {
    if (extractedData != 0 && !isError) {
      const platformm = extractedData?.platform;
      const linkk = extractedData?.productlink;
      const link = linkk?.split("?");
      const FinalLink1 = link[0];
      const FinalLink =
        FinalLink1 + "?tag=jatin170f-21&linkCode=ll1&ref_=as_li_ss_tl";
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
    return extractedData?.features?.map((b: any, i: any) => {
      return (
        <View key={i} style={{ flexDirection: "row", marginVertical: 2 }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>{"\u2022"}</Text>
          </View>
          <View style={{ marginLeft: 4 }}>
            <Text style={{ fontWeight: "600", color: "grey" }}>{b}</Text>
          </View>
        </View>
      );
    });
  };

  const CheckIfProductWatchlist = () => {
    if (!extractedData?.errormessage && UserEmail != null) {
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

  const ChartComponent = () => {
    GetChartScrapeData();
    return (
      <View style={{ height: 170 }}>
        {ChartScrapeBase64 != null ? (
          <ImageModal
            // isTranslucent={false}
            // imageBackgroundColor={"red"}
            // renderToHardwareTextureAndroid={true}
            resizeMode="contain"
            overlayBackgroundColor={"#e32f45"}
            // imageBackgroundColor="#000000"
            style={{
              // width: 350,
              // height: 250,
              width: 350,
              height: 110,
              // marginTop: -75,
            }}
            // modalImageStyle={{ height: 400, width: 200 }}
            source={{
              uri: `data:image/png;base64,${ChartScrapeBase64};`,
            }}
          />
        ) : ChartError == true ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 15 }}>
              <ImageNotFoundIcon
                name="image-not-supported"
                size={30}
                color="grey"
              />
            </View>

            <Text
              style={{
                marginTop: 10,
                fontWeight: "900",
                fontSize: 10,
                color: "grey",
                paddingHorizontal: 50,
              }}
            >
              Sorry Price History for this Product is not Available.
            </Text>
          </View>
        ) : (
          <View>
            <ActivityIndicator
              style={{ marginTop: 15 }}
              color="red"
              size={"large"}
            />
            <Text
              style={{
                marginTop: 5,
                fontWeight: "700",
                fontSize: 10,
                color: "grey",
                paddingHorizontal: 80,
              }}
            >
              This may take some time. Please Wait!
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF9F9" }}>
      {!isLoading ? (
        !isError ? (
          <View
            style={{ alignItems: "center", marginTop: 8, marginBottom: 100 }}
          >
            {extractedData == 0 ? (
              // <ActivityIndicator
              <></>
            ) : (
              <Image
                style={{
                  height: 200,
                  width: 200,
                  resizeMode: "contain",
                  // alignItems: "center",
                }}
                source={{
                  uri: `${extractedData?.imageurl}`,
                }}
              />
            )}

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
              {extractedData?.product}
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
                {extractedData?.price}
              </Text>
              <Text style={{ fontWeight: "400", fontSize: 12, marginTop: 5 }}>
                {/* {extractedData?.percent}% Off */}
                {extractedData?.percent}
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
                {/* {"\u20B9"} */}
                {extractedData?.discountprice}
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
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#e32f45",
                  marginLeft: 8,
                }}
              >
                Price History Graph
              </Text>
              {extractedData != 0 && ChartComponent()}

              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#e32f45",
                    marginLeft: 8,
                    marginTop: -60,
                  }}
                >
                  Specifications
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: -30 }}>
              {Featuress()}
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // marginTop: 200,
              height: 600,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Invalid Link!
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "grey" }}>
              Please Check The Product Link Again.
            </Text>
          </View>
        )
      ) : (
        <ActivityIndicator
          style={{ marginTop: 100 }}
          color="red"
          size={"large"}
        />
      )}

      {extractedData == 0 ? (
        // <ActivityIndicator
        <></>
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
