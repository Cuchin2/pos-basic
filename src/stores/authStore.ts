import { defineStore } from 'pinia';

interface User {
  email: string;
  // Otros datos del usuario si los tienes
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  }),
  actions: {
    async login(email: string, password: string) {
      this.isLoading = true;
      this.error = null;

      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación de petición

        if (email !== 'demo@example.com') {
          throw new Error('Correo electrónico incorrecto.');
        }

        if (password !== 'password') {
          throw new Error('Contraseña incorrecta.');
        }

        this.user = { email }; // Almacena los datos del usuario
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.user)); // Persistir en localStorage
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      // Redirigir al login si es necesario:
       window.location.href = '/'; // Ajusta la ruta a tu página de login
    },
    checkAuthOnLoad(){
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
          this.isLoggedIn = true;
          console.log('hola')
        } catch (error) {
          console.error("Error parsing user from localStorage", error);
          localStorage.removeItem('user'); // Limpiar localStorage si hay un error
          window.location.href = '/';
        }
      }
    }
  },
});
