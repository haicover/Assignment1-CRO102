import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
function HeaderService() {
  const [info, setInfo] = useState({});
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    event => {
      if (event.type === Event.PlaybackTrackChanged) {
        setTrackInfo();
      }
      if (event.type === Event.PlaybackState) {
        if (event.state === State.Playing) {
          startSpin();
        } else {
          stopSpin();
        }
      }
    },
  );

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  const startSpin = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopSpin = () => {
    spinValue.stopAnimation();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('MusicScreen')}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      {info.artwork && (
        <Animated.Image
          source={info.artwork}
          style={[styles.headerImage, {transform: [{rotate: spin}]}]}
        />
      )}
      <Text style={styles.songTitle}>{info.title}</Text>
      <Text style={styles.artistName}>{info.artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 22,
    marginTop: 50,
    color: '#000',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  headerImage: {
    marginTop: 50,
    marginBottom: 50,
    width: 300,
    height: 300,
    borderRadius: 250,
    alignSelf: 'center',
  },
});

export default HeaderService;
