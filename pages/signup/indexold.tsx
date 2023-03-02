import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SignUp } from "../../actions/login";

function Signup({ navigation }) {
  const [values, setValues] = useState({
    loading: false,
    error: "",
    message: "",
  });

  useEffect(() => {
    setValues({ ...values, loading: false, error: "", message: "" });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    setValues({ ...values, loading: true });
    let formdata = new FormData();
    console.log(data);
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("photo", data.photo);
    SignUp(data)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
          console.log(data.error);

          return;
        }
        console.log(data);
        setValues({
          ...values,
          loading: false,
          message: data.message,
          error: "",
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
      keyboardVerticalOffset={-150}
    >
      <ScrollView style={styles.cantainer}>
        <Text style={styles.headerTxt}>WELCOME</Text>
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Signup</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your name here"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Name is required!",
              },
              minLength: {
                value: 4,
                message: "Name should be atleast 4 Characters long",
              },
            }}
          />
          {errors?.name ? (
            <Text style={{ marginLeft: 40, color: "red" }}>
              {errors?.name && errors.name.message}
            </Text>
          ) : null}
          {/* <TextInput style={styles.nameInput} placeholder="Username" /> */}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your email here"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />
            )}
            rules={{
              // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },

              required: {
                // validate: () => {},

                value: true,
                message: "Email is required!",
              },
            }}
          />
          {errors?.email ? (
            <Text style={{ marginLeft: 40, color: "red" }}>
              {errors?.email && errors.email.message}
            </Text>
          ) : null}
          {/* <TextInput
          style={styles.nameInput}
          placeholder="Email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
        /> */}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your password here"
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
          {errors?.password ? (
            <Text style={{ marginLeft: 40, color: "red" }}>
              {errors?.password && errors.password.message}
            </Text>
          ) : null}
          {/* <TextInput
          style={styles.nameInput}
          placeholder="Password"
          onChangeText={(pass) => {
            this.setState({ pass });
          }}
        /> */}
          <TouchableOpacity
            style={styles.btn}
            // onPress={this.signUp}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.btnTxt}>SignUp</Text>
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
          {values?.message ? (
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "lightgreen",
                color: "white",
                padding: 5,
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 5,
                marginBottom: -20,
                fontWeight: "bold",
              }}
            >
              {values.message}
            </Text>
          ) : null}
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.endBtn}
              onPress={() => {
                navigation.replace("signin");
              }}
              // onPress={() =>
              //   // this.props.navigation.navigate("login")
              // }
            >
              <Text style={styles.loginTxt}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // <SafeAreaView>
    //   <Controller
    //     control={control}
    //     name="name"
    //     render={({ field: { onChange, value, onBlur } }) => (
    //       <TextInput
    //         placeholder="Enter your name here"
    //         value={value}
    //         onBlur={onBlur}
    //         onChangeText={(value) => onChange(value)}
    //       />
    //     )}
    //     rules={{
    //       required: {
    //         value: true,
    //         message: "Field is required!",
    //       },
    //     }}
    //   />
    //   <Controller
    //     control={control}
    //     name="email"
    //     render={({ field: { onChange, value, onBlur } }) => (
    //       <TextInput
    //         placeholder="Enter your email here"
    //         value={value}
    //         onBlur={onBlur}
    //         onChangeText={(value) => onChange(value)}
    //         keyboardType="email-address"
    //         autoComplete="email"
    //         autoCapitalize="none"
    //       />
    //     )}
    //     rules={{
    //       required: {
    //         value: true,
    //         message: "Field is required!",
    //       },
    //     }}
    //   />
    //   <Controller
    //     control={control}
    //     name="password"
    //     render={({ field: { onChange, value, onBlur } }) => (
    //       <TextInput
    //         placeholder="Enter your password here"
    //         value={value}
    //         onBlur={onBlur}
    //         onChangeText={(value) => onChange(value)}
    //         textContentType="password"
    //         secureTextEntry={true}
    //       />
    //     )}
    //     rules={{
    //       required: {
    //         value: true,
    //         message: "Field is required!",
    //       },
    //     }}
    //   />
    //   <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: "#e32f45",
    height: 700,
  },
  subView: {
    backgroundColor: "white",
    height: 540,
    marginTop: 160,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    marginTop: 40,
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
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: "blue",
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 90,
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
    marginTop: 20,
    marginLeft: 40,
    fontWeight: "bold",
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 17,
  },
});

export default Signup;
