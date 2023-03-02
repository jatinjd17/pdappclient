import React from "react";
import { View } from "react-native";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
import Viewallamazfkcomponent from "../../components/viewallamazfkcomponent";

function ViewAllAmazFk({ route, navigation }) {
  const { platform, category } = route.params;
  return (
    <View style={{ backgroundColor: "#F3F7FD" }}>
      <Categoryamazfkdropdown
        navigation={navigation}
        platform={platform}
        category={category}
        home={false}
      />

      <View>
        <Viewallamazfkcomponent category={category} navigation={navigation} />
      </View>
    </View>
  );
}

export default ViewAllAmazFk;
