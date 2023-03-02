import React from "react";
import { View } from "react-native";
import ViewallDealcomponent from "../../components/viewalldealcomponent";

function ViewAll({ route, navigation }) {
  const { viewalldealtime, category, dealtimecat, originalviewalldealtime } =
    route.params;

  console.log(viewalldealtime);

  return (
    <View style={{ backgroundColor: "#FFF9F9" }}>
      <ViewallDealcomponent
        dealtime={viewalldealtime}
        category={category}
        navigation={navigation}
        dealtimecat={dealtimecat}
        originalviewalldealtime={originalviewalldealtime}
      />
    </View>
  );
}

export default ViewAll;
