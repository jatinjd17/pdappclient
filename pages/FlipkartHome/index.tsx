import React from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
import Mobilecomponent from "../../components/mobilecomponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function FlipkartHome({ navigation }) {
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
                color: "#236aba",
                textDecorationLine: "underline",
              }}
            >
              View More {`->`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {refreshing ? (
        <ActivityIndicator
          style={{ justifyContent: "flex-start" }}
          size={"large"}
          color="red"
        />
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
        platform={"flipkart"}
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
            Platform={"flipkart"}
            CategoryName={"mobiles"}
          />
          <CategoryBlock
            categoryTitle={"Tablets"}
            Platform={"flipkart"}
            CategoryName={"tablets"}
          />
          <CategoryBlock
            categoryTitle={"Televisions"}
            Platform={"flipkart"}
            CategoryName={"televisions"}
          />
          <CategoryBlock
            categoryTitle={"Cameras"}
            Platform={"flipkart"}
            CategoryName={"cameras"}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default FlipkartHome;
