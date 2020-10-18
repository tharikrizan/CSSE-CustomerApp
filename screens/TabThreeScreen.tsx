import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
} from "native-base";


import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";



export default function TabThreeScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.subTitle}>PROFILE </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
 

     
        <Text style={styles.topUP}>Edit Details</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>First Name</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
          }}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Last Name</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
          }}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Phone Number</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
          }}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Password</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
          }}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
      <Button full success>
        <Text>Edit</Text>
      </Button>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
  },
  topUP: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  subTitle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "green",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
