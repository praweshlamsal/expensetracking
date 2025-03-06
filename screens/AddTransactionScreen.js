import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { TransactionContext } from "../context/TransactionContext";

const AddTransactionScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    // Dropdown states for Type
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState('Credit');
    const [typeItems, setTypeItems] = useState([
      { label: 'Credit', value: 'Credit' },
      { label: 'Debit', value: 'Debit' },
      { label: 'Refund', value: 'Refund' },
    ]);
  
    // Dropdown states for Category
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState('Shopping');
    const [categoryItems, setCategoryItems] = useState([
      { label: 'Shopping', value: 'Shopping' },
      { label: 'Travel', value: 'Travel' },
      { label: 'Utility', value: 'Utility' },
      { label: 'Food', value: 'Food' },
      { label: 'Entertainment', value: 'Entertainment' },
    ]);
  
    const { addTransaction } = useContext(TransactionContext);
  
    const handleAddTransaction = () => {
      if (!date || !amount || !description || !location || !typeValue || !categoryValue) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
  
      const newTransaction = {
        id: Math.random().toString(),
        date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        amount: parseFloat(amount),
        description,
        location,
        type: typeValue,
        category: categoryValue,
      };
  
      // Add the new transaction using context
      addTransaction(newTransaction);
  
      // Navigate back to Dashboard
      navigation.navigate('Dashboard');
    };
  
    const handleDateChange = (event, selectedDate) => {
      setShowDatePicker(Platform.OS === 'ios'); // Hide the picker on Android after selection
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      {/* Date Picker */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Type Dropdown */}
      <Text style={styles.label}>Type</Text>
      <DropDownPicker
        open={typeOpen}
        value={typeValue}
        items={typeItems}
        setOpen={setTypeOpen}
        setValue={setTypeValue}
        setItems={setTypeItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Select Type"
        zIndex={3000} // Ensure dropdown appears above other elements
      />

      {/* Category Dropdown */}
      <Text style={styles.label}>Category</Text>
      <DropDownPicker
        open={categoryOpen}
        value={categoryValue}
        items={categoryItems}
        setOpen={setCategoryOpen}
        setValue={setCategoryValue}
        setItems={setCategoryItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Select Category"
        zIndex={2000} // Ensure dropdown appears above other elements
      />

      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    justifyContent: "center", // Center text vertically
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  dropdown: {
    marginBottom: 12,
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default AddTransactionScreen;
