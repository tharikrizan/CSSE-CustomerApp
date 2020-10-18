import * as React from 'react';
import { StyleSheet , Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import NewJourney from './JourneyScreens/NewJourney';
import QRCodes from './JourneyScreens/QRCodes';
import History from './JourneyScreens/History';

export default function TabOneScreen( ) {
  
  return (
    <Container>
    <Header hasTabs/>
    <Tabs>
      <Tab heading={ <TabHeading><Icon name="camera" /><Text>Travel</Text></TabHeading>}>
        <NewJourney/>
      </Tab>
      <Tab heading={ <TabHeading><Text>QRCodes</Text></TabHeading>}>
        <QRCodes/>
      </Tab>
      <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
        <History/>
      </Tab>
    </Tabs>
  </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
