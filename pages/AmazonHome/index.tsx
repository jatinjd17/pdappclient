import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isAuth } from "../../actions/login";
import Categoryamazfkdropdown from "../../components/categoryamazfkdropdown";
// import Mobilecomponent from "../../components/mobilecomponent";
import MobilecomponentNew from "../../components/mobilecomponentNew";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function AmazonHome({ navigation }) {
  useEffect(() => {
    // aut();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const [username, setusername] = useState("");

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

  const getCurrentDate = () => {
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();

    var time = new Date().toLocaleString();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return (
      <View>
        <Text
          style={{
            fontSize: 8,
            fontWeight: "800",
            color: "grey",
            marginLeft: 3,
          }}
        >
          Last Updated:{"  "}
          {
            // date.toString() +
            //   "-" +
            //   month.toString() +
            //   "-" +
            //   year.toString() +
            //   "-" +
            time.toString()
          }
        </Text>
      </View>
    );
    //format: d-m-y;
  };

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
          {getCurrentDate()}
        </View>
        <View style={{ marginTop: 5 }}>
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
            {/* <Mobilecomponent
              platform={Platform}
              category={CategoryName}
              navigation={navigation}
              // username={username}
            /> */}
            <MobilecomponentNew
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
    <View style={{ backgroundColor: "#F3F9FD" }}>
      <View>
        <Categoryamazfkdropdown
          navigation={navigation}
          platform={"amazon"}
          category={""}
          home={true}
        />
      </View>
      <ScrollView
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 150 }}>
          <CategoryBlock
            categoryTitle={"Mobiles"}
            Platform={"amazon"}
            CategoryName={"mobiles"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Tablets"}
            Platform={"amazon"}
            CategoryName={"tablets"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Televisions"}
            Platform={"amazon"}
            CategoryName={"televisions"}
            // username={username}
          />
          <CategoryBlock
            categoryTitle={"Laptops"}
            Platform={"amazon"}
            CategoryName={"laptops"}
            // username={username}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default AmazonHome;
