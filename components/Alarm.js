import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";
import { format } from "date-fns";

function AlarmItem({ date, time, status, onChange }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.alarmContainer}>
      <View>
        <Text style={styles.alarmTime}>{time}</Text>

        <Text style={styles.alarmDate}>{date}</Text>
      </View>

      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
}

function AlarmTable({ item, status, onChange }) {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.alarmContainer}>
      <ScrollView>
        {item.map((item, index, curr) => (
          <AlarmItem
            key={index}
            time={format(item.date, "H:mm")}
            date={format(item.date, "dd/MMM")}
            status={item.status}
            onChange={(toggleValue) => {
              curr[index].status = toggleValue;
              this.setState({ item: curr });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const Alarm = () => {
  const [text, setText] = useState("Selected Time");
  const [date, setDate] = useState("Selected Date");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [alarmArray] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let status = false;
    let selectedTime = format(date, "H:mm");
    let selectedDate = format(date, "dd/MMM");
    setText(selectedTime);
    setDate(selectedDate);
    alarmArray.push({ date, status });
    console.log(alarmArray);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {alarmArray.length == 0 && (
          <View>
            <Text style={{ fontSize: 30 }}>Setup Alarm</Text>
          </View>
        )}
        {alarmArray.length > 0 && (
          <View style={styles.alarmContainer}>
            <AlarmTable
              item={alarmArray}
              status={isEnabled}
              onChange={toggleSwitch}
            />
          </View>
        )}

        {/* <AlarmItem
          date={date}
          time={text}
          status={isEnabled}
          onChange={toggleSwitch}
        /> */}
        <Button title="Add Alarm" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  alarmTime: {
    fontSize: 60,
    fontWeight: "bold",
  },
  alarmDate: {
    fontSize: 20,
    color: "gray",
  },
  alarmContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignSelf: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Alarm;
