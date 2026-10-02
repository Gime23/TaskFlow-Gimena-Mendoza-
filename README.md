# Aplicación de Gestión de Tareas (TaskApp)

Aplicación móvil desarrollada con **React Native** y **Expo** para la gestión de tareas personales, con soporte para autenticación de usuarios, persistencia en la nube y personalización de perfil.

---

## 🚀 Características Principales

* **Autenticación con Firebase:** Registro, inicio de sesión y cierre de sesión seguro (`Email/Password`).
* **Gestión de Tareas (CRUD):** Crear, listar, marcar como completadas y eliminar tareas sincronizadas en tiempo real con **Cloud Firestore**.
* **Detalle de Tarea:** Navegación a la vista de detalle de cada tarea seleccionada.
* **Perfil de Usuario:** Selección y previsualización de foto de perfil desde la galería o cámara con `expo-image-picker`.
* **Manejo de Estado Global:** Gestión de la sesión del usuario y tareas mediante **Redux Toolkit**.

---

## 📱 Demostración de la Aplicación

| Login | Lista de Tareas | Crear / Detalle | Perfil con Foto |
| :---: | :---: | :---: | :---: |
| <img src="./docs/login.jpg" width="200" /> | <img src="./docs/lista.jpg" width="200" /> | <img src="./docs/tarea.jpg" width="200" /> | <img src="./docs/perfilimagen.jpg" width="200" /> |

---

## 🛠️ Tecnologías Utilizadas

* **React Native** & **Expo**
* **React Navigation** (Stack Navigation)
* **Redux Toolkit**
* **Firebase** (Authentication & Cloud Firestore)
* **Expo ImagePicker**

---

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd proyectofinalapp