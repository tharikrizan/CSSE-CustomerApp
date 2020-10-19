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
  Toast,
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

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [showQRcode, setShowQRcode] = useState(false);

  const viewQRCode = (id: number) => {
    setSelectedBooking(bookings.filter((x) => x.id === id)[0]);
    setShowQRcode(true);
  };

  const getBookings = async () => {
    const unscannedBookings = await getBookingsNotScanned();
    if (unscannedBookings !== null) {
      console.log("unscannedBookings",unscannedBookings)
      setBookings(unscannedBookings);
    } else {
     setBookings(DBbookings)
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
    console.log("bookings QRcodes", bookings);
  }, []);

  return (
    <Container>
      <ScrollView>
        <Header />
        <Content>
          <View style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}>
            {showQRcode && selectedBooking ? (
              <View
                style={{ alignSelf: "stretch", paddingBottom: 40, margin: 5 }}
              >
                <Text>Route:{selectedBooking.route}</Text>
                <Text>Start:{selectedBooking.startHalt}</Text>
                <Text>End:{selectedBooking.endHalt}</Text>
                <Text>Date:{selectedBooking.date}</Text>
                <QRCode value={JSON.stringify(selectedBooking)} size={200} />
                <Button onPress={() => setShowQRcode(false)} full danger>
                  <Text>Close</Text>
                </Button>
              </View>
            ) : (
              <View></View>
            )}
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
                  <Button onPress={() => viewQRCode(booking.id)} success>
                    <Text>View QR Code</Text>
                  </Button>
                  <Button onPress={() => deleteBookingPress(booking.id)} danger>
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
