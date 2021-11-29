import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import Task from "./Task";
export default function App() {
   const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    console.log(list);
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };
  const [tasks, setTask] = useState([]);
  const [taskItems, setTaskItems] = useState(getLocalItems());
  const handletask = () => {
    setTaskItems([...taskItems, tasks]);
    setTask("");
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    // view similar to div but it contains inbuild flex,flexbox
    <View style={styles.container}>
      {/* Todays Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> Todays Tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={completeTask} key={index}>
                <Task task={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {/* Text Input -- to write Text */}
        <TextInput
          value={tasks}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
          placeholder={"Write a task"}
        />
        {/* Button + */}
        <TouchableOpacity onPress={handletask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED"
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    marginLeft: 20
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1
  },
  addText: {}
});
