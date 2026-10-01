import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatarUri, logout } from '../store/authslice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user, avatarUri } = useSelector((state) => state.auth);

  const pickImage = async () => {
    try {
      // Solicita permiso de galería
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert('Se requiere permiso para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        dispatch(setAvatarUri(result.assets[0].uri));
      }
    } catch (error) {
      //console.log("Error al seleccionar imagen:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: avatarUri || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Cambiar Foto de Perfil</Text>
        </TouchableOpacity>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileContainer: { alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  email: { fontSize: 16, marginVertical: 15, color: '#333' },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginVertical: 5 },
  logoutButton: { backgroundColor: '#FF3B30' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});