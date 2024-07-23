import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

const ControlsService = () => {
  const playbackState = usePlaybackState();
  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }
  
  return (
    <View style={styles.controls}>
      <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
        <Ionicons name="play-skip-back" size={30} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPress}>
        <Ionicons
          name={playbackState.state == State.Playing ? 'pause' : 'play'}
          size={30}
          color="#FFF"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
        <Ionicons name="play-skip-forward" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
});

export default ControlsService;
