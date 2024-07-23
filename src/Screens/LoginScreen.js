import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {AuthContext} from '../Context/AuthProvider';
import TextInputComponent from '../Components/TextInputComponent';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '644340750849-p9jda0qbjgqmpmbluadb13qtk34vv1r2.apps.googleusercontent.com', // From Firebase Console > Authentication > Sign-in method > Google > Web client ID
});


const DangNhap = () => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {e, p} = route.params || {};

  const validateInputs = () => {
    if (!email || !password) {
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
    return true;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        await login(email, password);
        Alert.alert('Đăng nhập thành công');
        navigation.navigate('MyDrawer');
      } catch (error) {
        Alert.alert(
          'Error',
          error.message || 'Đăng nhập thất bại. Vui lòng thử lại',
        );
      }
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Google Sign-In Success');
    } catch (error) {
      Alert.alert('Google Sign-In Error', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/507/507257.png',
          }}
          style={{
            width: 20,
            height: 20,
            marginBottom: 20,
            marginRight: 300,
            marginTop: 30,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Đăng nhập</Text>
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
      <Text style={{marginStart: 200, fontStyle: 'italic'}}>
        Forgot Passoword?
      </Text>
      <TouchableOpacity
        onPress={handleLogin}
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
          Đăng nhập
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginBottom: 25}}>
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
        <TouchableOpacity onPress={handleGoogleLogin}>
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
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Đăng ký</Text>
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
    marginTop: 40,
    marginBottom: 60,
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

export default DangNhap;
