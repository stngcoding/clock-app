import { Text, View, StatusBar } from "react-native";
import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { SafeAreaView } from "react-native-safe-area-context";
import Alarm from "./Alarm";
import Stopwatch from "./Stopwach";
import Timer from "./Timer";
import Clock from "./Clock";
import Stopwatch2 from "./Stopwatch2";
const Tab = createMaterialTopTabNavigator();
export class Root extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Clock"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontWeight:"bold" },
            tabBarActiveTintColor: 'black',
            tabBarIndicatorStyle:{backgroundColor:"red"},
            
          }}
        >
          <Tab.Screen name="Clock" component={Clock} />
          <Tab.Screen name="Alarm" component={Alarm} />
          <Tab.Screen name="Stopwatch" component={Stopwatch2} />
          <Tab.Screen name="Timer" component={Timer} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}

export default Root;
