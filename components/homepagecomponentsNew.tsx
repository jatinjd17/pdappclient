import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import * as cheerio from "cheerio";
import { gettodaysDeals } from "../actions/deals";
import { isAuth } from "../actions/login";
import { trackallproductsuser } from "../actions/trackproduct";
import Mobilecard from "./mobilecard";

function HomepagecomponentsNew({ dealtime, navigation }) {
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
    // getDataUsingGet();
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
        url: `https://www.pricebefore.com/price-drops/?price-drop=${dealtime}&more=true`,
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

  // const getDataUsingGet = () => {
  //   //GET request
  //   fetch(
  //     "https://www.pricebefore.com/price-drops/?category=laptops&price-drop=todaysDeals&more=true",
  //     {
  //       method: "GET",
  //       //Request Type
  //     }
  //   )
  //     // .then((response) => response.json())
  //     // //If response is in json then in success
  //     .then((responseJson) => {
  //       //Success
  //       // alert(JSON.stringify(responseJson));
  //       console.log("1111111111111111111111111111111111111");
  //       // console.log(JSON.stringify(responseJson));
  //       responseJson.text().then((data) => {
  //         // console.log(data);
  //         const $ = cheerio.load(data);

  //         // const liList = $("div.title > b > a").text();
  //         // const liList = $("ul.product-list.js-product-list");

  //         // console.log(liList);

  //         $("ul.product-list.js-product-list") // select result <li>s
  //           .map(function (_, li) {
  //             const tit = $("div.col-right > div.title > b > a", li).text();
  //             console.log(tit);
  //             // console.log(li);
  //           });

  //         // return $("ul.product-list.js-product-list") // select result <li>s
  //         //   .map((_, li) => ({
  //         //     // map to an list of objects
  //         //     // asin: $(li).data("asin"),
  //         //     titleeeeee: $("div.col-right > div.title > b > a", li).text(),

  //         //     // price: $("span.a-color-price", li).text(),
  //         //     // rating: $("span.a-icon-alt", li).text(),
  //         //     // imageUrl: $("img.s-access-image").attr("src"),
  //         //   }));
  //       });
  //       console.log("2222222222222222222222222222");
  //     })
  //     //If response is not in json then in error
  //     .catch((error) => {
  //       //Error
  //       alert(JSON.stringify(error));
  //       console.error(error);
  //     });
  // };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {extractedData != 0 ? (
          getAllMobilesHome(extractedData)
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

export default HomepagecomponentsNew;
