import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from '../Context/AuthProvider';

const AdminScreen = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text>Admin Screen</Text>
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

export default AdminScreen;
