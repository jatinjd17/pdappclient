import { View, Text } from "react-native";
import React from "react";
import UrlSpecificProduct from "../../components/UrlSpecificProductComponent";

export default function UrlSpecificProductPage({ route, navigation }) {
  return (
    <View>
      <UrlSpecificProduct route={route} navigation={navigation} />
    </View>
  );
}
