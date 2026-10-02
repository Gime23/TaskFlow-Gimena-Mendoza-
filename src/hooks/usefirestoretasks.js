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
  const dispatch = useDispatch ();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const userId = user?.uid || user?.localId || user?.email;
    if (!user || !userId) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => { // <--- AQUÍ DEBE ESTAR (snapshot)
        const taskList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            text: data.text || data.name || '',
          };
        }) 

        console.log('Tareas recibidas de Firestore:', taskList);
        dispatch(setTasks(taskList));
      },
      (error) => {
        console.log('Error consultando tareas:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  
  const addTaskToFirestore = async (text) => {
    const userId = user?.uid || user?.localId || user?.email;

    if (!user || !userId) {
      console.log('No hay usuario autenticado');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        text: text,
        completed: false,
        userId: userId,
        createdAt: new Date().toISOString(),
      });
      console.log('Tarea guardada exitosamente');
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
  }; // <--- Cierra deleteTaskFromFirestore

  // 4. Cambiar estado completado/pendiente en Firestore
  const toggleTaskInFirestore = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !currentStatus,
      });
    } catch (error) {
      console.log('Error al actualizar tarea:', error);
    }
  }; // <--- Cierra toggleTaskInFirestore

  return {
    addTaskToFirestore,
    deleteTaskFromFirestore,
    toggleTaskInFirestore,
  };
}; // <--- Cierra useFirestoreTasks