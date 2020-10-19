import React, { useState, useEffect, useRef } from "react";
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
  Toast,
} from "native-base";
import axios from "axios";

import { addBooking, getBookingsNotScanned } from "../../utils/bookings";
import commonConstants from "../../utils/commonConstants";

const NewJourney = () => {
  const [route, setRoute] = useState("");
  const [startHalt, setStartHalt] = useState("");
  const [endHalt, setEndHalt] = useState("");
  const [price, setPrice] = useState(0);
  const [startDistance, setStartDistance] = useState(0);
  const [endDistance, setEndDistance] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [booking, setBooking] = useState({});

  const [allRoutes, setAllRoutes] = useState<any[]>([]);
  const [allHalts, setALLHalts] = useState<any[]>([]);

  const getRoutes = async () => {
    try {
      const response = await fetch(
        `${commonConstants.API}${commonConstants.ROUTES_ROUTE}`
      );
      const result = await response.json();
      console.log("routes", result.data);
      if (result.data !== null) {
        setAllRoutes(result.data);
      }
    } catch (error) {
      console.log(
        "i errors",
        `${commonConstants.API}${commonConstants.ROUTES_ROUTE}`,
        error
      );
    }
  };

  const getHalts = async (id: string) => {
    try {
      const response = await fetch(
        `${commonConstants.API}${commonConstants.HALTS_ROUTE}${id}`
      );
      const result = await response.json();
      console.log("getHalts", result.data);
      if (result.data !== null) {
        setALLHalts(result.data);
      }
    } catch (error) {}
  };
  const bookRoute = async () => {
    if (route !== "" && startHalt !== "" && endHalt !== "") {
      setBooking({
        id: "7",
        route: route,
        StartHalt: startHalt,
        endHalt: endHalt,
        date: getDate(),
        isScanned: false,
        fname: "Tharik",
        lname: "Rizan",
        phone: "0767936896",
      });
      setShowQRCode(true);
      const data = await addBooking(booking);
      if (data !== null) {
        Toast.show({
          text: "Successfully added",
          buttonText: "Okay",
          type: "success",
        });
      } else {
        Toast.show({
          text: data,
          buttonText: "Okay",
          type: "danger",
        });
      }
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
    Toast.show({
      text: "Resetting",
      buttonText: "Okay",
      type: "danger",
    });
  };

  useEffect(() => {
    getRoutes();
  },[]);

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
                    let result = value.split("-");
                    setRoute(result[0]);
                    getHalts(result[1]);
                    setPrice(result[2]);
                  }}
                >
                  {allRoutes.map((x, index) => (
                    <Picker.Item
                      label={x.name}
                      value={`${x.name}-${x.slug}-${x.price}`}
                      key={index}
                    />
                  ))}
                  <Picker.Item
                    label="Kalutara-Colombo"
                    value="Kalutara-Colombo"
                  />
                  <Picker.Item label="Matara-Colombo" value="Matara-Colombo" />
                  <Picker.Item
                    label="Mathugama-Colombo"
                    value="Mathugama-Colombo"
                  />
                  <Picker.Item
                    label="Aluthgama-Colombo"
                    value="Aluthgama-Colombo"
                  />
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
                    let result = value.split("-");
                    setStartHalt(result[0]);
                    setStartDistance(result[1]);
                  }}
                >
                  {allHalts.length > 0 ? (
                    allHalts.map((x, index) => (
                      <Picker.Item
                        label={x.haltName}
                        value={`${x.haltName}-${x.distance}`}
                        key={index}
                      />
                    ))
                  ) : (
                    <Picker.Item label="Kalutara" value="Kalutara" />
                  )}
                  <Picker.Item label="Panadura" value="Panadura" />
                  <Picker.Item label="Moratuwa" value="Moratuwa" />
                  <Picker.Item label="Dehiwala" value="Dehiwala" />
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
                    let result = value.split("-");
                    setEndHalt(result[0]);
                    setEndDistance(result[1]);
                  }}
                >
                  {allHalts.length > 0 ? (
                    allHalts.map((x, index) => (
                      <Picker.Item
                        label={x.haltName}
                        value={`${x.haltName}-${x.distance}`}
                        key={index}
                      />
                    ))
                  ) : (
                    <Picker.Item label="Kalauta" value="Kalatara" />
                  )}
                  <Picker.Item label="Panadura" value="Panadura" />
                  <Picker.Item label="Moratuwa" value="Moratuwa" />
                  <Picker.Item label="Dehiwala" value="Dehiwala" />
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
