import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../Context/AuthProvider';

const StudentScreen = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text>Student Screen</Text>
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

export default StudentScreen;
