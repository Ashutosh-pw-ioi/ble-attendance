import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

const bleManager = new BleManager();

export default function ScanBeaconScreen() {
  const [status, setStatus] = useState("Waiting...");
  const [devices, setDevices] = useState<
    { id: string; name: string | null; rssi: number | null }[]
  >([]);

  useEffect(() => {
    const discoveredDevices: Record<string, Device> = {};

    setStatus("Scanning...");

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setStatus("Scan error: " + error.message);
        return;
      }

      if (device && !discoveredDevices[device.id]) {
        discoveredDevices[device.id] = device;

        setDevices((prevDevices) => [
          ...prevDevices,
          {
            id: device.id,
            name: device.name || "Unnamed",
            rssi: device.rssi,
          },
        ]);
      }
    });

    // Stop after 10 seconds
    const timeoutId = setTimeout(() => {
      bleManager.stopDeviceScan();
      setStatus("Scan completed.");
    }, 10000);

    return () => {
      bleManager.stopDeviceScan();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby BLE Devices</Text>
      <Text style={styles.status}>{status}</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceText}>Name: {item.name}</Text>
            <Text style={styles.deviceText}>RSSI: {item.rssi}</Text>
            <Text style={styles.deviceId}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#60A5FA",
    marginBottom: 10,
  },
  deviceItem: {
    backgroundColor: "#1E293B",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  deviceText: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  deviceId: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
});
