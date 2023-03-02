import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { isAuth } from "../actions/login";
import { getallmobiles } from "../actions/mobiles";
import { trackallproductsuser } from "../actions/trackproduct";
import Mobilecard from "./mobilecard";

function MobilecomponentNew({ platform, category, navigation }) {
  const [mobiles, setMobiles]: any = useState([]);
  const [pro, setpro] = useState([]);
  const [username, setusername] = useState("");
  const [extractedData, SetExtractedData]: any = useState("");
  let many = [];

  useEffect(() => {
    isAuth().then((data) => {
      if (data) {
        setusername(data.userr);
        blogs(data.userr);
      }
    });
    // Mob();
    GetExtractedData();
  }, []);

  const Mob = async () => {
    const all: any = await getallMobiless();
    if (all) {
      setMobiles(all);
    }
  };

  const getallMobiless = async () => {
    return getallmobiles({ platform, category }).then((data) => {
      if (!data) {
        return false;
      } else {
        console.log(data);
        return { m: data };
      }
    });
  };

  const getAllMobilesHome = (extractedData: any) => {
    if (extractedData != null) {
      return extractedData.map((b: any, i: any) => {
        return (
          <View key={i}>
            <Mobilecard
              card={b}
              username={username}
              many={pro}
              navigation={navigation}
            />
          </View>
        );
      });
    } else {
      return null;
    }
  };

  const blogs = async (username) => {
    const all: any = await allBlogs(username);
    if (all) {
      all.forEach((prod) => {
        many.push(prod.product);
      });
      setpro(many);
    }
  };

  const allBlogs = (username) => {
    return trackallproductsuser(username).then((data) => {
      if (!data) {
        return false;
      } else {
        console.log(data);
        return data.trackedproducts;
      }
    });
  };

  const GetExtractedData = () => {
    fetch("http://3.110.124.205:8000/111", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.pricebefore.com/price-drops/?category=${category}&more=true`,
      }),
      // body: JSON.stringify({
      //   url: `https://www.pricebefore.com/price-drops/?category=laptops&price-drop=${dealtime}&more=true`,
      // }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return null;
        }
        console.log("4444444444444444444444444444");
        console.log(data);
        console.log("55555555555555555555");
        SetExtractedData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View>
      {extractedData == 0 ? (
        <ActivityIndicator
          style={{ marginLeft: 170 }}
          color="red"
          size={"large"}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {getAllMobilesHome(extractedData)}
        </ScrollView>
      )}
    </View>
  );
}

export default MobilecomponentNew;
