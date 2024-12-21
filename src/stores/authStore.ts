import { defineStore, Pinia } from 'pinia';
import { Router } from "vue-router";

interface User {
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loginError: null as string | null,
  }),

  actions: {
    async login(email: string, password: string, remember: boolean) {
      try {
        // Reemplazar con la lógica real de login
        if (email === 'demo@example.com' && password === 'password') {
          this.user = { email };
          this.token = 'mock-token';
          if (remember) localStorage.setItem('authToken', this.token);
          this.loginError = null;
          return true;
        } else {
            if(email === 'demo@example.com') { this.loginError= 'Contraseña incorrecta' }
            if(password === 'password') { this.loginError= 'Correo no válido' }
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
      this.loginError = null;
    },

    autoLogin() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        this.user = { email: 'demo@example.com' }; // Ajusta según tu lógica
      }
    },
  },

  // Persistencia (opcional)
  persist: true
});

// Verifica el estado de autenticación al cargar la página
export const setupAuthState = async (router: Router, pinia: Pinia) => {
  const authStore = useAuthStore(pinia);
  await authStore.autoLogin(); // Ejecutar autoLogin antes de la verificación
  if (!authStore.token && router.currentRoute.value.meta.requiresAuth) {
    router.push({ name: 'Login' });
  }
};