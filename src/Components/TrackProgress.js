import React from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';

function TrackProgress() {
  const {position, duration} = useProgress(200);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
      </Text>
      <Slider
        style={{
          width: 200,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={position}
        onValueChange={value => TrackPlayer.seekTo(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },
});

export default TrackProgress;
