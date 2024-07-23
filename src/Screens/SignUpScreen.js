import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {AuthContext} from '../Context/AuthProvider';
import TextInputComponent from '../Components/TextInputComponent';
import {useNavigation} from '@react-navigation/native';
const DangKi = () => {
  const {signup} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const navigation = useNavigation();

  const validateInputs = () => {
    if (!name || !email || !password || !gender || !height || !weight) {
      Alert.alert('Error', 'Vui lòng nhập đầy đủ thông tin.');
      return false;
    }
    if (!email.endsWith('@fpt.edu.vn')) {
      Alert.alert('Error', 'Email phải đúng dạng fpt.edu.vn');
      return false;
    }
    if (password.length <= 5) {
      Alert.alert('Error', 'Password phải lớn hơn 5.');
      return false;
    }
    if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
      Alert.alert('Error', 'Height and Weight phải là số và hơn hơn 0.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      const userData = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        height: height,
        weight: weight,
      };
      try {
        await signup(userData);
        Alert.alert('Bạn đã đăng kí thành công');
        navigation.navigate('Login', {e: email, p: password});
      } catch (error) {
        Alert.alert(
          'Error',
          error.message || 'Đăng kí thất bại. Vui lòng thử lại',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInputComponent
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />
      <TextInputComponent
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputComponent
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInputComponent
        style={styles.input}
        placeholder="Giới tính"
        value={gender}
        onChangeText={setGender}
      />
      <TextInputComponent
        style={styles.input}
        placeholder="Chiều cao (cm)"
        value={height}
        onChangeText={setHeight}
      />
      <TextInputComponent
        style={styles.input}
        placeholder="Cân nặng (kg)"
        value={weight}
        onChangeText={setWeight}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          width: 285,
          height: 50,
          backgroundColor: '#99FF33',
          padding: 10,
          marginTop: 30,
          marginBottom: 30,
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          Đăng kí
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670032.png',
            }}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/179/179326.png',
            }}
            style={{
              width: 50,
              height: 50,
              marginStart: 25,
              marginEnd: 25,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670151.png',
            }}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginTop: 35,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});
export default DangKi;
