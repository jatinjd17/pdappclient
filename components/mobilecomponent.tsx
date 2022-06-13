import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { getallmobiles } from "../actions/mobiles";
import Mobilecard from "./mobilecard";

function Mobilecomponent({ platform, category }) {
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
