import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Notification {
  id: string;
  message: string;
  date: string;
  selected: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    message: "Making you look great, that's our goal.",
    date: "May 6, 2025",
    selected: false,
  },
  {
    id: "2",
    message: "You could win a trip to the 2025 Stanley Cup* playoffs!",
    date: "April 23, 2025",
    selected: false,
  },
];

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleSelect = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, selected: !n.selected } : n))
    );
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Ionicons name="remove-circle" size={24} color="#F87171" />
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <Ionicons
          name={item.selected ? "radio-button-on" : "radio-button-off"}
          size={20}
          color="#9CA3AF"
          style={styles.radio}
        />
      </TouchableOpacity>
      <Ionicons name="notifications-outline" size={20} color="#7ED957" />
      <View style={styles.notificationText}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Text style={styles.bottomAction}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomActionDisabled}>Mark Read</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.bottomActionDisabled}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // dark background
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  doneText: {
    fontSize: 16,
    color: "#60A5FA",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C3744",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  radio: {
    marginHorizontal: 10,
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  bottomAction: {
    color: "#3B82F6", // blue
    fontSize: 14,
    fontWeight: "600",
  },
  bottomActionDisabled: {
    color: "#6B7280", // gray
    fontSize: 14,
  },
});
