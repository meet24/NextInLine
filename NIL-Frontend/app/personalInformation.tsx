import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../src/AuthContext";
import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const PersonalInformation: React.FC = () => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.name || "",
    lastName: user?.lastName || "",
    contactNumber: user?.contactNumber || "",
    address: user?.address || "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      await axios.put(
        `${process.env.EXPO_PUBLIC_FRONTEND_URL}:3001/api/update-profile`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Success", "Profile updated successfully.");
      setEditMode(false);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Text style={styles.editButtonText}>
            {editMode ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Form */}
      <View style={styles.infoContainer}>
        <StaticRow label="Email" value={user?.email || ""} />
        <EditableRow
          label="First Name"
          value={form.firstName}
          editable={editMode}
          onChangeText={(text) => handleChange("firstName", text)}
        />
        <EditableRow
          label="Last Name"
          value={form.lastName}
          editable={editMode}
          onChangeText={(text) => handleChange("lastName", text)}
        />
        <EditableRow
          label="Phone Number"
          value={form.contactNumber}
          editable={editMode}
          onChangeText={(text) => handleChange("contactNumber", text)}
        />
        <EditableRow
          label="Address"
          value={form.address}
          editable={editMode}
          onChangeText={(text) => handleChange("address", text)}
        />
      </View>

      {editMode && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveText}>
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={logout}>
        <Text style={styles.deleteText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const StaticRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

type EditableRowProps = {
  label: string;
  value: string;
  editable: boolean;
  onChangeText: (text: string) => void;
};

const EditableRow: React.FC<EditableRowProps> = ({
  label,
  value,
  editable,
  onChangeText,
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {editable ? (
      <TextInput
        value={value}
        onChangeText={(text: string) => onChangeText(text)} // ✅ fixed type
        placeholder={`Enter ${label}`}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
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
  editButtonText: {
    color: "#60A5FA",
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#2C3744",
    borderRadius: 8,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "column",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 4,
  },
  value: {
    color: "#D1D5DB",
    fontSize: 15,
  },
  input: {
    color: "#fff",
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3D4754",
    paddingBottom: 4,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#2C3744",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#F87171",
    fontWeight: "600",
  },
});
