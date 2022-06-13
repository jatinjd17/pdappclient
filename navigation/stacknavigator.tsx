import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View, Text } from "react-native";

import ViewAll from "../pages/Viewallpage";
import Home from "../pages/Home";
import FlipkartHome from "../pages/FlipkartHome";
import AmazonHome from "../pages/AmazonHome";
import ViewAllAmazFk from "../pages/viewallamazfkpage";
import Search from "../pages/Search";
import Settings from "../pages/Settingshome";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#e32f45",
        },
        headerTitle: (
          props // App Logo
        ) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/icons/pricedroplogo.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                fontWeight: "bold",
                color: "white",
              }}
            >
              PriceDrop
            </Text>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="viewall" component={ViewAll} />
    </Stack.Navigator>
  );
};

const FlipkartStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#2988f2",
        },
        headerTitle: (
          props // App Logo
        ) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/icons/fk.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Flipkart
            </Text>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="fk" component={FlipkartHome} />
      <Stack.Screen name="viewall" component={ViewAllAmazFk} />
    </Stack.Navigator>
  );
};

const AmazonStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "lightblue",
        },
        headerTitle: (
          props // App Logo
        ) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 30, height: 30, marginTop: 2 }}
              source={require("../assets/icons/amazon.png")}
              resizeMode="contain"
            />
            <Text style={{ marginTop: 5, marginLeft: 5, fontWeight: "bold" }}>
              Amazon
            </Text>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="amaz" component={AmazonHome} />
      <Stack.Screen name="viewall" component={ViewAllAmazFk} />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e32f45",
        },
        headerTitle: (
          props // App Logo
        ) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginTop: 2,
                tintColor: "white",
              }}
              source={require("../assets/icons/search.png")}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Search
            </Text>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="amaz" component={Search} />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e32f45",
        },
        headerTitle: (
          props // App Logo
        ) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginTop: 2,
                tintColor: "white",
              }}
              source={require("../assets/icons/settings.png")}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 5, marginTop: 2 }}>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Settings
              </Text>
            </View>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  FlipkartStackNavigator,
  AmazonStackNavigator,
  SearchStackNavigator,
  SettingsStackNavigator,
};
