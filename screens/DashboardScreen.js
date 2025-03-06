import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';

const DashboardScreen = ({ navigation }) => {
  const { transactions } = useContext(TransactionContext);

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  const handleTransactionPress = (transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTransactionPress(item)}>
            <View style={styles.transactionItem}>
              <Text>{item.description}</Text>
              <Text>${item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DashboardScreen;