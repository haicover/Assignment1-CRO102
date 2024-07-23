import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminScreen from '../Screens/AdminScreen';
import StudentScreen from '../Screens/StudentScreen';
import TeacherScreen from '../Screens/TeacherScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import RoleSelectionScreen from '../Screens/RoleSelectionScreen';
import {AuthContext} from '../Context/AuthProvider';
import WelcomeScreen from '../Screens/WelcomeScreen';
import MusicApp from '../Music/MusicApp';
import BookScreen from '../Screens/BookScreen';
// import AlbumListScreen from '../Service/AlbumListScreen';
// import TrackListScreen from '../Service/TrackListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicScreen from '../Screens/MusicScreen';
import SleepingScreen from '../Screens/SleepingScreen';
import ProfileScreen from '../Screens/ProflieScreen';
import RunningScreen from '../Screens/RunningScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const getDrawerIcon = (route, focused, color, size) => {
  let iconName;

  switch (route.name) {
    case 'BookScreen':
      iconName = focused ? 'book' : 'book-outline';
      break;
    case 'MusicScreen':
      iconName = focused ? 'musical-notes' : 'musical-notes-outline';
      break;
    case 'SleepingScreen':
      iconName = focused ? 'moon' : 'moon-outline';
      break;
    case 'RunningScreen':
      iconName = focused ? 'walk' : 'walk-outline';
      break;
    case 'ProfileScreen':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-circle';
  }

  return <Ionicons name={iconName} color={color} size={size} />;
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        drawerIcon: ({focused, color, size}) =>
          getDrawerIcon(route, focused, color, size),
        drawerActiveTintColor: 'tomato',
        drawerInactiveTintColor: 'gray',
      })}>
      <Drawer.Screen name="BookScreen" component={BookScreen} />
      <Drawer.Screen name="MusicScreen" component={MusicScreen} />
      <Drawer.Screen name="SleepingScreen" component={SleepingScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="RunningScreen" component={RunningScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const {user} = useContext(AuthContext);
  console.log('User context:', user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Stack.Screen name="Admin" component={AdminScreen} />
            )}
            {user.role === 'teacher' && (
              <Stack.Screen name="Teacher" component={TeacherScreen} />
            )}
            {user.role === 'student' && (
              <Stack.Screen name="Student" component={StudentScreen} />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="RoleSelection"
              component={RoleSelectionScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name="Music" component={MusicApp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
