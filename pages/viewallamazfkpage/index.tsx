import React from "react";
import { View } from "react-native";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
import Viewallamazfkcomponent from "../../components/viewallamazfkcomponent";

function ViewAllAmazFk({ route, navigation }) {
  const { platform, category } = route.params;
  return (
    <View>
      <Categoryamazfkdropdown
        navigation={navigation}
        platform={platform}
        category={category}
        home={false}
      />
      <Viewallamazfkcomponent platform={platform} category={category} />
    </View>
  );
}

export default ViewAllAmazFk;
