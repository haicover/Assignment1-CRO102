import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../Context/AuthProvider';

const TeacherScreen = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text>Teacher Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default TeacherScreen;
