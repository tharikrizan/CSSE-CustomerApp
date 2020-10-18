import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
import {
  getBookingsNotScanned,
  getNumberOfBookings,
  deleteBooking,
} from "../../utils/bookings";
import { Booking } from "../../Models/bookingInt";
import QRCode from "react-native-qrcode-svg";
import { ScrollView } from "react-native";
const QRCodes = () => {
  let bookingObj: Booking = {
    id: 1,
    route: "Test",
    StartHalt: "Test",
    endHalt: "Test",
    date: "Test",
    scanned: false,
  };
  const [bookings, setBookings] = useState([bookingObj]);
  const [selectedBooking, setSelectedBooking] = useState(bookingObj);
  const [showQRcode, setShowQRcode] = useState(false);

  const viewQRCode = (id: number) => {
    setSelectedBooking(bookings.filter((x) => x.id === id)[0]);
    setShowQRcode(true);
  };



  useEffect(() => {
    setBookings(DBbookings);
    console.log(bookings);
  });

  return (
    <Container>
      <ScrollView>
        <Header />
        <Content>
          <View style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}>
            {showQRcode ? (
              <View
                style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}
              >
                <Text>Route:{selectedBooking.route}</Text>
                <Text>Start:{selectedBooking.StartHalt}</Text>
                <Text>End:{selectedBooking.endHalt}</Text>
                <Text>Date:{selectedBooking.date}</Text>
                <QRCode value={JSON.stringify(selectedBooking)} size={200} />
                <Button onPress={() => setShowQRcode(false)} full danger>
                  <Text>Close</Text>
                </Button>
              </View>
            ) : null}
          </View>
          <List>
            {bookings.map((booking, index) => (
              <ListItem thumbnail key={index}>
                <Left>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={24}
                    color="orange"
                  />
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
                  <Button onPress={() => viewQRCode(booking.id)} success>
                    <Text>View QR Code</Text>
                  </Button>
                  <Button onPress={() => viewQRCode(booking.id)} danger>
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

export default QRCodes;
