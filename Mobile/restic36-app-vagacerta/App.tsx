import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import theme from './src/theme';
import Login from './src/screens/Login';
import FormScreen from './src/screens/Form';
import List from './src/screens/List';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';
import { AuthProvider, debugStorage, useAuth } from './src/context/authContext';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function Auth() {
  return (
    <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: "home" | "home-outline" | "person" | "person-outline";

          if (route.name === 'Home') {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === 'Profile') {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={16} color={color} />;
        },
        tabBarActiveTintColor: theme.COLORS.GREEN,
        tabBarInactiveTintColor: theme.COLORS.GRAY_03,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_01,
        },
        tabBarLabelStyle: {
          fontWeight: '800',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function HomeScreens() {
  return (
    <HomeStack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="List" component={List} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
  );
}


function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    console.log('Carregando o estado de autenticação...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log('Usuário autenticado:', user);

  return (
    <NavigationContainer

  >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? 'Tab' : 'Login'}
      >
        {user ? (
          <Stack.Screen name="Tab" component={Auth} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}


export default function App() {
  useEffect(() => {
    debugStorage();
  }, []);
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <MainApp />
      </ThemeProvider>
    </AuthProvider>
  );
}
