import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import Mobilecard from "./mobilecard";

function HomepagecomponentsNew({ dealtime, navigation }) {
  const [extractedData, SetExtractedData]: any = useState("");

  useEffect(() => {
    GetExtractedData();
  }, []);

  const getAllMobilesHome = (extractedData: any) => {
    if (extractedData != null) {
      return extractedData.map((b: any, i: any) => {
        return (
          <View key={i}>
            <Mobilecard card={b} navigation={navigation} />
          </View>
        );
      });
    } else {
      return null;
    }
  };

  const GetExtractedData = () => {
    fetch("http://13.201.82.250:8000/111", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/price-drops/?price-drop=${dealtime}&more=true`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return null;
        }
        SetExtractedData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {extractedData != 0 ? (
          getAllMobilesHome(extractedData)
        ) : (
          <View>
            <ActivityIndicator
              style={{ marginLeft: 170 }}
              color="red"
              size={"large"}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default HomepagecomponentsNew;
