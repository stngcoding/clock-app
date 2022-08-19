import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import React from "react";
const DATA = {
  timer: 1234567,
  laps: [12345, 2345, 34567],
};

function Timer({ intervals,style }) {
  const duration = moment.duration(intervals);
  const centisecond = Math.floor(duration.milliseconds() / 10);
  return (
    <Text style={style}>
      {duration.minutes()}:{duration.seconds()},{centisecond}
    </Text>
  );
}

function RoundButton({ title, color, background }) {
  return (
    <View style={[styles.button, { backgroundColor: background }]}>
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </View>
  );
}

function ButtonRow({ children }) {
  return <View style={styles.buttonRow}>{children}</View>;
}

function Lap({ number, interval }) {
  return (
    <View style={styles.lap}>
      <Text style={styles.lapText}>Lap {number}</Text>
      <Timer intervals={interval} style={styles.lapDuration} />
    </View>
  );
}

function LapTable({ laps }) {
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={lap}
        />
      ))}
    </ScrollView>
  );
}
const Stopwatch = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Timer intervals={DATA.timer} style={styles.timer} />
        <LapTable laps={DATA.laps} />

        <ButtonRow>
          <RoundButton title="Start" color="green" background="white" />
          <RoundButton title="Reset" color="red" background="white" />
        </ButtonRow>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  timer: {
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 50,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20,
  },
  lapText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  lapDuration: {
    color: "black",
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "gray",
    borderTopWidth: 1,
  },
  scrollView: {
    alignSelf: "stretch",
  },
});

export default Stopwatch;
