import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { isAuth } from "../../actions/login";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
import Mobilecomponent from "../../components/mobilecomponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function FlipkartHome({ navigation }) {
  // useEffect(() => {
  //   // aut();
  // }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const [username, setusername] = useState("");
  // const [trigger, settrigger] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  // const aut = async () => {
  //   const isaut = await isAuth();
  //   if (isaut) {
  //     setusername(isaut.username);
  //   }
  // };

  // const aut = async () => {
  //   if (trigger) {
  //     const isaut = await isAuth();
  //     if (isaut) {
  //       setusername(isaut.username);
  //       settrigger(false);
  //     }
  //   }
  // };
  useEffect(() => {
    // aut();
  }, []);

  const CategoryBlock = ({
    categoryTitle,
    Platform,
    CategoryName,
    // username,
  }) => (
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
            <Mobilecomponent
              platform={Platform}
              category={CategoryName}
              navigation={navigation}
              // username={username}
            />
          </Text>
        </ScrollView>
      )}
    </View>
  );
  return (
    <View style={{ backgroundColor: "#F3F7FD" }}>
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
        <View style={{ marginBottom: 150 }}>
          <CategoryBlock
            categoryTitle={"Mobiles"}
            Platform={"flipkart"}
            CategoryName={"mobiles"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Tablets"}
            Platform={"flipkart"}
            CategoryName={"tablets"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Televisions"}
            Platform={"flipkart"}
            CategoryName={"televisions"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Cameras"}
            Platform={"flipkart"}
            CategoryName={"cameras"}
            // username={username}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default FlipkartHome;
