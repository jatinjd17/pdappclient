import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { isAuth } from "../actions/login";
import { getallmobiles } from "../actions/mobiles";
import { trackallproductsuser } from "../actions/trackproduct";
import Mobilecard from "./mobilecard";

function Mobilecomponent({ platform, category, navigation }) {
  const [mobiles, setMobiles]: any = useState([]);
  const [pro, setpro] = useState([]);
  const [username, setusername] = useState("");
  let many = [];

  useEffect(() => {
    isAuth().then((data) => {
      if (data) {
        setusername(data.username);
        blogs(data.username);
      }
    });
    Mob();
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

  const getAllMobilesHome = (mobiless: any) => {
    if (mobiless != null) {
      return mobiless.map((b: any, i: any) => {
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

  return (
    <View>
      {mobiles == 0 ? (
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
          {getAllMobilesHome(mobiles.m)}
        </ScrollView>
      )}
    </View>
  );
}

export default Mobilecomponent;
