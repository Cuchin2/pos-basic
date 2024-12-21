<template>
    <div class="min-h-screen page-bg flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8 space-y-6">
            <!-- Header -->
            <div class="text-center">
                <svg class="mx-auto h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 class="mt-4 text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
                <p class="mt-2 text-sm text-gray-500">Inicia sesión para continuar</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-5">
                <div class="floating-input">
                    <input id="email" v-model="email" type="email" required placeholder=" " :class="['mt-1 block w-full px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900',
                        { 'border-red-500': emailError }]">
                    <label for="email" class="floating-label">Correo electrónico</label>
                </div>

                <div class="floating-input">
                    <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                        placeholder=" " :class="['mt-1 block w-full px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900',
                            { 'border-red-500': passwordError }]">
                    <label for="password" class="floating-label">Contraseña</label>
                    <div @click="togglePassword" class="eye-icon text-gray-400">
                        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember" v-model="remember" type="checkbox"
                            class="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember" class="ml-2 block text-sm text-gray-600">
                            Recordarme
                        </label>
                    </div>

                    <a href="https://example.com/forgot-password"
                        class="text-sm font-medium text-blue-500 hover:text-blue-600">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="btn-primary w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" >
                    <span v-if="isLoading">
                        <svg class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </span>
                    <span v-else>Iniciar sesión</span>
                </button>
            </form>

            <!-- Register Link -->
            <div class="text-center">
                <p class="text-sm text-gray-500">
                    ¿No tienes una cuenta?
                    <a href="https://example.com/register" class="font-medium text-blue-500 hover:text-blue-600">
                        Créala ahora
                    </a>
                </p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-600">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const remember = ref(false);
const isLoading = ref(false);
const errorMessage = ref<string>('');
const showPassword = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
 // Temporizador de 1 segundos
 await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundos
  try {
    const result = await authStore.login(email.value, password.value, remember.value);
    console.log('Resultado del login:', result);
    if (result) {
        router.push({ name: 'dashboard' });
    } else {
        errorMessage.value= authStore.loginError || ''
    }
  } catch (error) {
    console.log('Error al iniciar sesión:', error);
    errorMessage.value = (error as Error).message;
  } finally {
    isLoading.value = false;
    
  }

};
</script>


<style>
.page-bg {
    background: linear-gradient(145deg, #f0f2f5 0%, #ffffff 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.floating-input {
    position: relative;
    margin-bottom: 1.5rem;
}

.floating-label {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    color: #6B7280;
    background: #ffffff;
    padding: 0 4px;
}

.floating-input input:focus~.floating-label,
.floating-input input:not(:placeholder-shown)~.floating-label {
    transform: translateY(-50%) scale(0.85);
    top: 0;
    color: #3B82F6;
}

.floating-input input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    height: 2.5rem;
    transition: all 0.2s ease-in-out;
}

.floating-input input:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    border-color: #3B82F6;
}

.btn-primary {
    transition: all 0.3s ease;
    transform: translateY(0);
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.eye-icon {
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
}

.eye-icon:hover {
    color: #3B82F6;
}
</style>