import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer, addTracks} from './trackPlayerServices';
import TrackProgress from '../Components/TrackProgress';
import HeaderService from '../Components/HeaderService';
import ControlsService from '../Components/ControlsService';

const MusicApp = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);
  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#99FF66'}}>
      <SafeAreaView style={styles.container}>
        <HeaderService />
        <TrackProgress />
        <ControlsService />
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#99FF66',
  },
});
export default MusicApp;
