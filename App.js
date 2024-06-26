import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, Button } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import Meals from "./pages/Meals";
import Ranking from "./pages/Ranking";
import { getAuthToken } from "./auth";
import { RootSiblingParent } from "react-native-root-siblings";
import { ShikdanWidgetPreviewScreen } from "./widget/android_widget";
import Toast from "react-native-root-toast";

const Tab = createBottomTabNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      await getAuthToken();
    } catch (err) {
      Toast.show('인증 토큰을 가져오는 데에 실패했습니다.')
      Toast.show(err)
    }
    setLoading(false);
  };

  return (
    <RootSiblingParent>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "orange",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "archive";
              if (route.name === "메뉴") {
                iconName = "utensils";
              } else if (route.name === "역대 랭킹") {
                iconName = "trophy";
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="메뉴"
            component={Meals}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="역대 랭킹"
            component={Ranking}
            options={{ headerShown: false }}
          />
          {Platform.OS === 'android' && (
            <Tab.Screen
              name="위젯 미리보기"
              component={ShikdanWidgetPreviewScreen}
              options={{ headerShown: false }}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
