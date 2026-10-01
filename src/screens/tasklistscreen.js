import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFirestoreTasks } from '../hooks/usefirestoretasks';

export default function TaskListScreen() {
  const [taskText, setTaskText] = useState('');
  // Redux sigue leyendo las tareas que useFirestoreTasks sincroniza en tiempo real
  const tasks = useSelector((state) => state.tasks.items);

  // Funciones que conectan con Firestore
  const {
    addTaskToFirestore,
    deleteTaskFromFirestore,
    toggleTaskInFirestore,
  } = useFirestoreTasks();

  const handleAddTask = async () => {
    if (taskText.trim() === '') {
      Alert.alert('Atención', 'Escribe una descripción para la tarea');
      return;
    }

    await addTaskToFirestore(taskText);
    setTaskText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea..."
          placeholderTextColor="#888"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No hay tareas pendientes</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => toggleTaskInFirestore(item.id, item.completed)}
              >
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.taskCompleted,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTaskFromFirestore(item.id)}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});