import React from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
import Mobilecomponent from "../../components/mobilecomponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function AmazonHome({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const CategoryBlock = ({ categoryTitle, Platform, CategoryName }) => (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 3 }}>
            {categoryTitle}
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              onPress={() =>
                navigation.navigate("viewall", {
                  platform: Platform,
                  category: CategoryName,
                })
              }
              style={{
                flex: 1,
                textAlign: "right",
                justifyContent: "center",
                paddingTop: 7,
                paddingRight: 5,
                fontWeight: "500",
                color: "#13a0bf",
                textDecorationLine: "underline",
              }}
            >
              View More {`->`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {refreshing ? (
        <ActivityIndicator size={"large"} color="red" />
      ) : (
        // <Text>Loading...</Text>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Text>
            <Mobilecomponent platform={Platform} category={CategoryName} />
          </Text>
        </ScrollView>
      )}
    </View>
  );
  return (
    <View>
      <Categoryamazfkdropdown
        navigation={navigation}
        platform={"amazon"}
        category={""}
        home={true}
      />
      <ScrollView
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 100 }}>
          <CategoryBlock
            categoryTitle={"Mobiles"}
            Platform={"amazon"}
            CategoryName={"mobiles"}
          />
          <CategoryBlock
            categoryTitle={"Tablets"}
            Platform={"amazon"}
            CategoryName={"tablets"}
          />
          <CategoryBlock
            categoryTitle={"Televisions"}
            Platform={"amazon"}
            CategoryName={"televisions"}
          />
          <CategoryBlock
            categoryTitle={"Cameras"}
            Platform={"amazon"}
            CategoryName={"cameras"}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default AmazonHome;
