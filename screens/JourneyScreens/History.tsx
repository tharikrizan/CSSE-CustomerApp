import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Spinner,
  View,
} from "native-base";

import { bookings as DBbookings } from "../../database";
import { Booking } from "../../Models/bookingInt";
import QRCode from "react-native-qrcode-svg";
import { ScrollView } from "react-native";

const History = () => {
  let bookingObj: Booking = {
    id: 1,
    route: "Test",
    StartHalt: "Test",
    endHalt: "Test",
    date: "Test",
    scanned: false,
  };
  const [bookings, setBookings] = useState([bookingObj]);

  useEffect(() => {
    setBookings(DBbookings);
    console.log(bookings);
  });
  return (
    <Container>
      <ScrollView>
        <Header />
        <Content>
          <List>
            {bookings.map((booking, index) => (
              <ListItem thumbnail key={index}>
                <Left>
                  <MaterialIcons name="done-all" size={24} color="green" />
                </Left>
                <Body>
                  <Text>{booking.route}</Text>
                  <Text note numberOfLines={1}>
                    Start:{booking.StartHalt}
                  </Text>
                  <Text note numberOfLines={1}>
                    END:{booking.endHalt}
                  </Text>
                  <Text note numberOfLines={1}>
                    {booking.date}
                  </Text>
                </Body>
                <Right>
                  <Button danger>
                    <Text>Delete </Text>
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default History;
