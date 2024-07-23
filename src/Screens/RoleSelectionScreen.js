import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.title}>Chọn vai trò của bạn</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login', {role: 'admin'})}
        style={{
          width: '40%',
          backgroundColor: '#99FF33',
          padding: 10,
          marginTop: 30,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login', {role: 'teacher'})}
        style={{
          width: '40%',
          backgroundColor: '#99FF33',
          padding: 10,
          marginTop: 30,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Giảng viên</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login', {role: 'student'})}
        style={{
          width: '40%',
          backgroundColor: '#99FF33',
          padding: 10,
          marginTop: 30,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Sinh viên</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default RoleSelectionScreen;
