import { defineStore, Pinia } from "pinia";
import axios from "axios";
import { Router } from "vue-router";
import { User } from "@/interfaces/user";
// Define la interfaz para el objeto de datos de inicio de sesión
interface LoginData {
  name: string;
  email: string;
  password: string;
  gris_id: number;
  photo: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null as User | null, // Usuario autenticado
    authErrors: { email: [], password: [] }, // Errores de autenticación
    isInitialized: false, // Nueva bandera para verificar si ya se cargó el estado de autenticación
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    isAuthenticated: (state) => !!state.authUser, // Devuelve true si hay un usuario autenticado
  },
  actions: {
    async getToken() {
      // Obten el token

      await axios.get("/sanctum/csrf-cookie");
    },
    async getUser() {
      try {
        await this.getToken();
        const { data } = await axios.get("/api/user");
        this.authUser = data; // Asigna el usuario autenticado
      } catch (error) {
        this.authUser = null; // Si hay un error, asegura que el usuario esté desautenticado
      } finally {
        this.isInitialized = true; // Marca que el estado de autenticación ya está cargado
      }
    },
    async handleLogin(data: LoginData, router: Router) {
      this.authErrors = { email: [], password: [] };
      // Obtén el token CSRF antes de intentar iniciar sesión

      await this.getToken(); // Obtén el token CSRF

      try {
        await axios.post("login", {
          email: data.email,
          password: data.password,
        });
        await this.getUser(); // Obtén el usuario después de iniciar sesión
        router.push("/"); // Redirige a la ruta raíz
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          this.authErrors = error.response.data.errors;
          console.log(this.authErrors); // Manejar errores de validación // Captura errores de validación
        } else {
          console.error("Login error:", error);
        }
      }
    },
    async handleLogout() {
      await axios.post("logout");
      this.authUser = null;
      this.isInitialized = false; // Reinicia la bandera al hacer logout
    },
    async handleRegister(data: any, router: Router) {
      this.authErrors = { email: [], password: [] };
      await this.getToken();
      try {
        const response = await axios.post("/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        if (response.status === 201) {
          // Cambia según tu API
          router.push("/"); // Redirigir después del registro
        }
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          console.error("Registration error:", error); // Manejo de otros errores
        }
      }
    },
    // Nueva acción para verificar la autenticación
    async checkAuthentication(router: Router) {
      if (!this.isAuthenticated) {
        await this.getUser(); // Verifica la autenticación en el servidor
      }
      if (!this.isAuthenticated) {
        // Si el usuario no está autenticado, redirige al login
        router.push({
          name: "login",
          query: { redirect: router.currentRoute.value.fullPath },
        });
      }
    },
    clearErrors() {
      this.authErrors = { email: [], password: [] }; // Limpia los errores de autenticación
    },
  },
});

// Verifica el estado de autenticación al cargar la página
export const setupAuthState = async (router: Router, pinia: Pinia) => {
  const authStore = useAuthStore(pinia);
  if (!authStore.isInitialized) {
    await authStore.getUser(); // Verifica si el usuario está autenticado
    if (
      !authStore.isAuthenticated &&
      router.currentRoute.value.meta.requiresAuth
    ) {
      // Si el usuario no está autenticado y la ruta lo requiere, redirige al login
      router.push({ name: "Login" });
    }
  }
};
