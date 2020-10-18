import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import QRCode from "react-native-qrcode-svg";

import { getDate } from "../../utils/helper";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Body,
  Title,
  Button,
} from "native-base";
import { successBookingToast } from "../../utils/notification";
import { addBooking } from "../../utils/bookings";

const NewJourney = () => {
  const [route, setRoute] = useState("");
  const [startHalt, setStartHalt] = useState("");
  const [endHalt, setEndHalt] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [booking, setBooking] = useState({});

  const bookRoute = () => {
    if (route !== "" && startHalt !== "" && endHalt !== "") {
      setBooking({
        id: "7",
        route: route,
        StartHalt: startHalt,
        endHalt: endHalt,
        date: getDate(),
        scanned: false,
      });
      setShowQRCode(true);
      addBooking(booking);
    }
  };

  const showQRCodeImage = () => {
    setBooking({
      id: "7",
      route: route,
      StartHalt: startHalt,
      endHalt: endHalt,
      date: getDate(),
      scanned: false,
    });
    setShowQRCode(true);
  };

  const resetForm = () => {
    setRoute("");
    setStartHalt("");
    setEndHalt("");
    setShowQRCode(false);
  };

  useEffect(() => {});

  return (
    <Container>
      <ScrollView>
        <Header>
          <Body>
            <Title>New Journey Booking Form</Title>
          </Body>
        </Header>
        <View>
          <Content>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<FontAwesome5 name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your Bus Route"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={route}
                  onValueChange={(value) => {
                    setRoute(value);
                  }}
                >
                  <Picker.Item label="Wallet" value="Wallet" />
                  <Picker.Item label="ATM Card" value="ATM Card" />
                  <Picker.Item label="Debit Card" value="Debit Card" />
                  <Picker.Item label="Credit Card" value="Credit Card" />
                  <Picker.Item label="Net Banking" value="Net Banking" />
                </Picker>
              </Item>
            </Form>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<FontAwesome5 name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your Start Halt"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={startHalt}
                  onValueChange={(value) => {
                    setStartHalt(value);
                  }}
                >
                  <Picker.Item label="Wallet" value="Wallet" />
                  <Picker.Item label="ATM Card" value="ATM Card" />
                  <Picker.Item label="Debit Card" value="Debit Card" />
                  <Picker.Item label="Credit Card" value="Credit Card" />
                  <Picker.Item label="Net Banking" value="Net Banking" />
                </Picker>
              </Item>
            </Form>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<FontAwesome5 name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your Destination Halt"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={endHalt}
                  onValueChange={(value) => {
                    setEndHalt(value);
                  }}
                >
                  <Picker.Item label="Kalutara" value="Kalutara" />
                  <Picker.Item label="Colombo" value="Colombo" />
                </Picker>
              </Item>
            </Form>
          </Content>

          {showQRCode ? (
            <View
              style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}
            >
              <QRCode value={JSON.stringify(booking)} size={200} />
            </View>
          ) : null}
          <View style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}>
            {showQRCode ? (
              <Button full onPress={bookRoute} large iconRight success>
                <FontAwesome5 name="route" size={36} />
                <Text>Book IT</Text>
              </Button>
            ) : (
              <Button full onPress={showQRCodeImage} large iconRight warning>
                <FontAwesome5 name="qrcode" size={36} />
                <Text>Show QR-CODE</Text>
              </Button>
            )}
          </View>
          <View style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}>
            {showQRCode ? (
              <Button full onPress={resetForm} large iconRight danger>
                <FontAwesome5 name="undo-alt" size={36} />
                <Text>Reset</Text>
              </Button>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default NewJourney;
