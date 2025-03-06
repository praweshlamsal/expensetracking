import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;

  const formatAmount = (amount, type) => {
    switch (type) {
      case 'Credit':
        return `+$${amount.toFixed(2)}`;
      case 'Debit':
        return `-$${amount.toFixed(2)}`;
      case 'Refund':
        return `+$${amount.toFixed(2)} (Refund)`;
      default:
        return `$${amount.toFixed(2)}`;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialIcons name="attach-money" size={30} color="#4CAF50" />
          <Text style={styles.amountText}>
            {formatAmount(transaction.amount, transaction.type)}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="description" size={24} color="#555" />
          <Text style={styles.detailText}>{transaction.description}</Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="date-range" size={24} color="#555" />
          <Text style={styles.detailText}>{transaction.date}</Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="location-on" size={24} color="#555" />
          <Text style={styles.detailText}>{transaction.location}</Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="category" size={24} color="#555" />
          <Text style={styles.detailText}>{transaction.category}</Text>
        </View>

        <View style={styles.detailItem}>
          <MaterialIcons name="swap-horiz" size={24} color="#555" />
          <Text style={styles.detailText}>{transaction.type}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4CAF50',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});

export default TransactionDetailScreen;