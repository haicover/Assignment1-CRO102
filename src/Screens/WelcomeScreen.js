import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const sliderData = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIx22hkHkg11bHnTX6KDZavZcUymYkAbH5BLNauUS1cNwbJzpJ',
    text: 'Chạy giúp bạn khỏe mỗi ngày',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6p4MhnVpL0o8u3wAMv9uWH870CBcNQWXX-IKV7xbrtEEvT78F',
    text: 'Học hỏi và phát triển bản thân mỗi ngày',
  },
  {
    image:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRf05QmOm0cNe4tPjuprUsSHZeuG0rw3O9inVh86q5dbJLbkDj1',
    text: 'Đạt được mục tiêu của bạn',
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ứng dụng phát triển cá nhân</Text>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        loop={true}
        autoplay={true}
        autoplayTimeout={3}>
        {sliderData.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        onPress={() => navigation.navigate('RoleSelection')}
        style={{
          width: '40%',
          backgroundColor: '#99FF33',
          padding: 10,
          marginTop: 30,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Get Stared</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  wrapper: {},
  slide: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: screenWidth - 40,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 100,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
