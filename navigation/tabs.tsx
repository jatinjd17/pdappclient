import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  AmazonStackNavigator,
  HomeStackNavigator,
  SearchStackNavigator,
  SettingsStackNavigator,
} from "./stacknavigator";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          left: 15,
          right: 15,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="viewall123"
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 5,
              }}
            >
              <Image
                source={require("../assets/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 37,
                  height: 37,
                  //   tintColor: "#e32f95",
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                Deals
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Amazon"
        component={AmazonStackNavigator}
        options={{
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icons/fk2.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    //   tintColor: "#e32f95",
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Image
                  source={require("../assets/icons/amazon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    //   tintColor: "#e32f95",
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
              </View>
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                Flipkart/Amazon
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sear"
        component={SearchStackNavigator}
        options={{
          unmountOnBlur: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/search.png")}
                resizeMode="contain"
                style={{
                  width: 36,
                  height: 36,
                  //   tintColor: "#e32f95",
                  tintColor: focused ? "#e32f45" : "#748c94",
                  marginTop: 10,
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                Search
              </Text>
            </View>
          ),
          // tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 5,
              }}
            >
              <Image
                source={require("../assets/icons/checklist.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  //   tintColor: "#e32f95",
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
              >
                Tracking Products
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
});

export default Tabs;
