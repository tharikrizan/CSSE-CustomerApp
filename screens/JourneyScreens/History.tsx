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
  Toast,
} from "native-base";

import { bookings as DBbookings } from "../../database";
import { Booking } from "../../Models/bookingInt";

import { ScrollView } from "react-native";
import {
  deleteBooking,
  getBookingsNotScanned,
  getBookingsScanned,
} from "../../utils/bookings";

const History = () => {
  const [bookings, setBookings] = useState<Booking[]>();

  const getBookings = async () => {
    const scannedBookings = await getBookingsScanned();
    if (scannedBookings !== null) {
      setBookings(scannedBookings);
    } else {
      setBookings(DBbookings);
    }
  };

  const deleteBookingPress = async (id: number) => {
    const result = await deleteBooking(id);

    if (result) {
      getBookings();
      Toast.show({
        text: "Deleted",
        buttonText: "Okay",
        type: "success",
      });
    }
    Toast.show({
      text: "Error",
      buttonText: "Okay",
      type: "danger",
    });
  };

  useEffect(() => {
    getBookings();
    console.log(bookings);
  }, []);
  return (
    <Container>
      <ScrollView>
        <Header />
        <Content>
          <List>
            {bookings &&
              bookings.map((booking, index) => (
                <ListItem thumbnail key={index}>
                  <Left>
                    <MaterialIcons name="done-all" size={24} color="green" />
                  </Left>
                  <Body>
                    <Text>{booking.route}</Text>
                    <Text note numberOfLines={1}>
                      Start:{booking.startHalt}
                    </Text>
                    <Text note numberOfLines={1}>
                      END:{booking.endHalt}
                    </Text>
                    <Text note numberOfLines={1}>
                      {booking.date}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      onPress={() => {
                        deleteBookingPress(booking.id);
                      }}
                      danger
                    >
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
