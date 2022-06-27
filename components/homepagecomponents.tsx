import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { gettodaysDeals } from "../actions/deals";
import { isAuth } from "../actions/login";
import { trackallproductsuser } from "../actions/trackproduct";
import Mobilecard from "./mobilecard";

function Homepagecomponents({ dealtime, navigation }) {
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
    return gettodaysDeals(dealtime).then((data) => {
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {mobiles != 0 ? (
          getAllMobilesHome(mobiles.m)
        ) : (
          <View>
            <ActivityIndicator
              style={{ marginLeft: 170 }}
              color="red"
              size={"large"}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Homepagecomponents;
