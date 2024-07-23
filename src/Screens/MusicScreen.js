import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const MusicScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>MusicScreen</Text>
      <Button title="Go music" onPress={() => navigation.navigate('Music')} />
    </View>
  );
};

export default MusicScreen;
