import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
// const API = 'http://10.24.4.42:3000';
// const API = 'http://192.168.1.5:3000';
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://192.168.1.5:3000/auth/login', {
        email,
        password,
      });
      if (response.data) {
        setUser(response.data);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(
        'Login Error: ',
      );
    }
  };

  const signup = async userData => {
    try {
      const response = await axios.post('${API}/users', userData);
      if (response.data) {
        setUser(response.data);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(
        'Signup Error: ',
        error.response ? error.response.data : error.message,
      );
    }
  };
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Không đăng xuất được:', error);
      Alert.alert('Đã xảy ra lỗi khi đăng xuất');
    }
  };

  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
