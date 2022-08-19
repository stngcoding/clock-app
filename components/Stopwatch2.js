import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment";

import React, { Component } from "react";

function Timer({ intervals, style }) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  const duration = moment.duration(intervals);
  const centisecond = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={{ flexDirection: "row",width:100}}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centisecond)} </Text>
    </View>
  );
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
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

function LapTable({ laps, timer }) {
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index == 0 ? timer + lap : lap}
        />
      ))}
    </ScrollView>
  );
}

export class Stopwatch2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  }
  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime(),
      });
      100;
    });
  };
  lap = () => {
    const timestamp = new Date().getTime();

    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };

  stop = () => {
    clearInterval(this.timer);
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };

  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };

  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now: now,
    });
    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime(),
      });
      100;
    });
  };
  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <Timer
          intervals={laps.reduce((total, curr) => total + curr, 0) + timer}
          style={styles.timer}
        />
        <LapTable laps={laps} timer={timer} />

        {laps.length == 0 && (
          <ButtonRow>
            <RoundButton
              onPress={this.start}
              title="Start"
              color="green"
              background="white"
            />
          </ButtonRow>
        )}

        {start > 0 && (
          <ButtonRow>
            <RoundButton
              onPress={this.lap}
              title="Lap"
              color="green"
              background="white"
            />
            <RoundButton
              onPress={this.stop}
              title="Stop"
              color="red"
              background="white"
            />
          </ButtonRow>
        )}

        {laps.length > 0 && start === 0 && (
          <ButtonRow>
            <RoundButton
              onPress={this.reset}
              title="Reset"
              color="red"
              background="white"
            />
            <RoundButton
              onPress={this.resume}
              title="Resume"
              color="green"
              background="white"
            />
          </ButtonRow>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 130,
  },

  timer: {
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 50,
    alignItems: "center",
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
    justifyContent: "space-evenly",
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

export default Stopwatch2;
