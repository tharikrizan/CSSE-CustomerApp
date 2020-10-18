import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "native-base";

import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TabTwoScreen() {
  const [creditCard, setCreditCard] = useState("");
  const [cvc, setcvc] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(346);

  useEffect(() => {}, [balance]);

  const handleSubmit = () => {
    if (creditCard !== "" && cvc !== "" && amount > 0) {
      setBalance((prev) => prev + amount);
    }
    setCreditCard("");
    setAmount(0);
    setcvc("");
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Balance </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.title}>{balance}.00 </Text>
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
        <Text style={styles.topUP}>TOP UP CREDITS NOW</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Enter Credit Card number</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
            color: "black",
          }}
          onChangeText={(text) => setCreditCard(text)}
          value={creditCard}
          keyboardType="number-pad"
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Enter CVC</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
            color: "black",
          }}
          onChangeText={(text) => setcvc(text)}
          value={cvc}
          keyboardType="number-pad"
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Enter Amount</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "stretch",
            color: "black",
          }}
          keyboardType="number-pad"
          onChangeText={(text) => setAmount(+text)}
          value={amount.toString()}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
      <Button onPress={handleSubmit} full success>
        <Text>Submit</Text>
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
    </KeyboardAwareScrollView>
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
