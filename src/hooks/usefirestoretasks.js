import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { setTasks } from '../store/taskslice';

export const useFirestoreTasks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // 1. Escuchar tareas del usuario en tiempo real
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setTasks(taskList));
      },
      (error) => {
        console.log('Error consultando tareas:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 2. Agregar tarea a Firestore
  const addTaskToFirestore = async (text) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'tasks'), {
        text,
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error al guardar tarea:', error);
    }
  };

  // 3. Eliminar tarea de Firestore
  const deleteTaskFromFirestore = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.log('Error al eliminar tarea:', error);
    }
  };

  // 4. Cambiar estado completado/pendiente en Firestore
  const toggleTaskInFirestore = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !currentStatus,
      });
    } catch (error) {
      console.log('Error al actualizar tarea:', error);
    }
  };

  return {
    addTaskToFirestore,
    deleteTaskFromFirestore,
    toggleTaskInFirestore,
  };
};