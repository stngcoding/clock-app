import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";
import { format } from "date-fns";

const Timer = () => {
  const [text, setText] = useState("Selected Time");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    let selectedTime = format(date,"H:mm");
    setText(selectedTime)
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text>{text}</Text>

        <Button title="Add Time" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          minuteInterval={5}
          mode="countdown"
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
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default Timer;
