import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PersonalInformation: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Info rows */}
      <View style={styles.infoContainer}>
        <InfoRow label="Email" value="Josh19@gmail.com" disabled />
        <InfoRow label="First Name" value="Josh" />
        <InfoRow label="Last Name" value="Doe" />
        <InfoRow label="Phone Number" value="(226) 418-7894" />
        <InfoRow label="Address" value="Add" isAction />
      </View>

      {/* Delete account */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  isAction?: boolean;
  disabled?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  isAction,
  disabled,
}) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <Text style={styles.label}>{label}</Text>
      {(label === "Email" || label === "Last Name") && (
        <Ionicons
          name="information-circle-outline"
          size={14}
          color="#9CA3AF"
          style={{ marginLeft: 4 }}
        />
      )}
    </View>
    <Text
      style={[
        styles.value,
        isAction && styles.actionText,
        disabled && styles.disabledText,
      ]}
    >
      {value}
    </Text>
  </View>
);

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2732",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#2C3744",
    borderRadius: 8,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3D4754",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  value: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  disabledText: {
    color: "#6B7280",
  },
  actionText: {
    color: "#60A5FA",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#2C3744",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#F87171",
    fontWeight: "600",
  },
});
