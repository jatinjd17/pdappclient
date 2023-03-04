import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Mobilecard from "./mobilecard";

function MobilecomponentNew({ category, navigation }) {
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
    // console.log(category);
    fetch("http://3.110.124.205:8000/111", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // url: `https://www.pricebefore.com/price-drops/?category=${category}&more=true`,
        url: `https://www.pricebefore.com/${category}/?page=1&more=true`,
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
      {extractedData == 0 ? (
        <ActivityIndicator
          style={{ marginLeft: 170 }}
          color="red"
          size={"large"}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {getAllMobilesHome(extractedData)}
        </ScrollView>
      )}
    </View>
  );
}

export default MobilecomponentNew;
