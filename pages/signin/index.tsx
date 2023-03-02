import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { authenticate, isAuth } from "../../actions/login";

function Signin({ navigation }) {
  const [values, setValues] = useState({
    loading: false,
    message: "",
    error: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    setValues({ ...values, loading: true });
    fetch("http://3.110.124.205:8000/444", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return null;
        }
        if (data.error) {
          // console.log(data.error);
          setValues({ ...values, loading: false, error: data.error });
          return null;
        }
        setValues({
          ...values,
          loading: false,
          message: data.success,
          error: "",
        });

        authenticate(data, async () => {
          const isaut = await isAuth();
          if (isaut) {
            navigation.replace("settings");
          }
        });
      })
      .catch((e) => {
        setValues({ ...values, loading: false, error: data.error });
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="position"
      // enabled
      keyboardVerticalOffset={-100}
    >
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.cantainer}>
        <Text style={styles.headerTxt}>WELCOME</Text>
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Login</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your Email here"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />
            )}
            rules={{
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              required: {
                value: true,
                message: "Email is required!",
              },
            }}
          />
          {errors?.email && (
            <Text style={{ marginLeft: 55, color: "red" }}>
              {errors.email && errors.email.message}
            </Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your Password here"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                textContentType="password"
                secureTextEntry={true}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Password is required!",
              },
              minLength: {
                value: 5,
                message: "Password should be atleast 5 Characters long",
              },
            }}
          />
          {errors?.password && (
            <Text style={{ marginLeft: 55, color: "red" }}>
              {errors.password && errors.password.message}
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>

          {values?.error ? (
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "red",
                color: "white",
                padding: 5,
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 5,
                marginBottom: -20,
                fontWeight: "bold",
              }}
            >
              {values.error}
            </Text>
          ) : null}
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Create an account?</Text>
            <TouchableOpacity
              style={styles.endBtn}
              onPress={() => {
                navigation.replace("signup");
              }}
            >
              <Text style={styles.loginTxt}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: "#e32f45",
    height: 700,
  },
  subView: {
    backgroundColor: "white",
    height: 470,
    marginTop: 230,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    marginTop: 140,
  },
  subTxt: {
    color: "black",
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 55,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: "blue",
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 80,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  endView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  endTxt: {
    fontSize: 15,
    marginTop: 30,
    marginLeft: 60,
    fontWeight: "bold",
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
  },
});

export default Signin;
