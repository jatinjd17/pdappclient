import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View, Text } from "react-native";

import ViewAll from "../pages/Viewallpage";
import Home from "../pages/Home";
import AmazonHome from "../pages/AmazonHome";
import ViewAllAmazFk from "../pages/viewallamazfkpage";
import Search from "../pages/Search";
import Settings from "../pages/Settingshome";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removeStorage } from "../actions/login";
import SpecificProductPage from "../pages/SpecificProductPage";
import UrlSpecificProductPage from "../pages/UrlSpecificProductPage";

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
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen
        name="specificproductpage"
        component={SpecificProductPage}
      />
      <Stack.Screen
        name="urlspecificproductpage"
        component={UrlSpecificProductPage}
      />
    </Stack.Navigator>
  );
};

const AmazonStackNavigator = () => {
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
            <Text style={{ fontSize: 22 }}> /</Text>
            <Image
              style={{ width: 30, height: 30, marginTop: 2 }}
              source={require("../assets/icons/amazon.png")}
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
              Amazon
            </Text>
          </View>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="amaz" component={AmazonHome} />
      <Stack.Screen name="viewallamazfk" component={ViewAllAmazFk} />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e32f45",
          },
        }}
        name="signin"
        component={Signin}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e32f45",
          },
        }}
        name="signup"
        component={Signup}
      />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen
        name="specificproductpage"
        component={SpecificProductPage}
      />
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
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e32f45",
          },
        }}
        name="signin"
        component={Signin}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#e32f45",
          },
        }}
        name="signup"
        component={Signup}
      />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen
        name="specificproductpage"
        component={SpecificProductPage}
      />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = ({ navigation }) => {
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
              source={require("../assets/icons/checklist.png")}
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
                Tracking Products
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              removeStorage("token", "user");
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "signin",
                  },
                ],
              });
            }}
          >
            <View style={{ marginRight: 5, alignItems: "center" }}>
              <Icon name="logout" size={20} color="white" />
              <Text style={{ marginRight: 7, color: "white" }}>Logout</Text>
            </View>
          </TouchableOpacity>
        ),
        headerTitleStyle: { flex: 1, textAlign: "center" },
      }}
    >
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Signin
              </Text>
            </View>
          ),
          headerRight: () => <View></View>,
        }}
        name="signin"
        component={Signin}
      />
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
              >
                SignUp
              </Text>
            </View>
          ),
          headerRight: () => <View></View>,
        }}
        name="signup"
        component={Signup}
      />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="specificproductpage"
        component={SpecificProductPage}
      />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  AmazonStackNavigator,
  SearchStackNavigator,
  SettingsStackNavigator,
};
