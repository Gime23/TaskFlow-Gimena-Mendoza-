import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  // Recibe la tarea pasada por parámetros
  const { task } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la Tarea</Text>

      {task ? (
        <View style={styles.card}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{task.text}</Text>

          <Text style={styles.label}>Estado:</Text>
          <Text style={[styles.status, task.completed ? styles.completed : styles.pending]}>
            {task.completed ? 'Completada' : 'Pendiente'}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>No se encontraron datos de la tarea.</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  completed: {
    color: '#28a745',
  },
  pending: {
    color: '#dc3545',
  },
  errorText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});