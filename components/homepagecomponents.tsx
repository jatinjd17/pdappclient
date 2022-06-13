import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { gettodaysDeals } from "../actions/deals";
import Mobilecard from "./mobilecard";

function Homepagecomponents({ dealtime }) {
  const [mobiles, setMobiles]: any = useState([]);

  useEffect(() => {
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
            <Mobilecard card={b} />
          </View>
        );
      });
    } else {
      return null;
    }
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
