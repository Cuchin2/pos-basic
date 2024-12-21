<template>
    <div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
// Verifica si hay un usuario autenticado al montar el componente
onMounted(() => {
  
  if (authStore.token) {
    router.push({ name: 'dashboard' });
  }

});
</script>

<style scoped>

</style>