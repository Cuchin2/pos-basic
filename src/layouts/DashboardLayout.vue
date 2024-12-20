<template>
    <div>
        <div class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
            <div class="bg-gray-800 text-white rounded-l-lg shadow-lg">
              <button @click="toggleSettingsPanel" class="p-4 hover:bg-gray-700 rounded-l-lg">
                <svg class="w-6 h-6 hover:rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
            </div>
            
            <!-- Settings Panel -->
            <div v-if="isSettingsPanelOpen" 
                 class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300"
                 :class="isSettingsPanelOpen ? 'translate-x-0' : 'translate-x-full'">
              <div class="p-4">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-base font-semibold text-gray-800">Settings</h2>
                  <button @click="toggleSettingsPanel" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div class="space-y-4">
                  <a href="https://example.com/settings/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Profile Settings</a>
                  <a href="https://example.com/settings/security" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Security</a>
                  <a href="https://example.com/settings/notifications" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Notifications</a>
                  <a href="https://example.com/settings/preferences" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Preferences</a>
                </div>
              </div>
            </div>
          </div>
        <div class="min-h-screen flex">
            <!-- Sidebar -->
            <aside
                :class="`bg-gray-800 ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300 flex flex-col text-white relative`">
                <!-- Logo section without the toggle button -->
                <div class="p-4 flex items-center">
                    <div class="flex items-center">
                        <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span v-if="!isCollapsed" class="ml-3 text-lg font-bold text-white">DashMaster</span>
                    </div>
                </div>

                <!-- Add new toggle button outside sidebar but attached to it -->
                <button @click="toggleSidebar"
                    class="absolute -right-3 top-20 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700 transform transition-transform duration-300"
                    :class="{ 'rotate-180': isCollapsed }">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <!-- Navigation -->
                <nav class="flex-1 pt-4">
                    <!-- Dashboard -->
                    <div>
                        <div @click="toggleMenu('dashboard')"
                            class="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span v-if="!isCollapsed" class="ml-3 text-sm">Dashboard</span>
                            <svg v-if="!isCollapsed" :class="{ 'rotate-180': openMenus.dashboard }"
                                class="w-4 h-4 ml-auto transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div v-show="openMenus.dashboard && !isCollapsed" class="submenu-transition overflow-hidden"
                            :style="{ maxHeight: openMenus.dashboard ? '200px' : '0' }">
                            <div class="bg-gray-700">
                                <a href="https://example.com/dashboard/overview"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Overview</a>
                                <a href="https://example.com/dashboard/stats"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Statistics</a>
                                <a href="https://example.com/dashboard/performance"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Performance</a>
                                <a href="https://example.com/dashboard/monitoring"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Monitoring</a>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics -->
                    <div>
                        <div @click="toggleMenu('analytics')"
                            class="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 012 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span v-if="!isCollapsed" class="ml-3 text-sm">Analytics</span>
                            <svg v-if="!isCollapsed" :class="{ 'rotate-180': openMenus.analytics }"
                                class="w-4 h-4 ml-auto transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div v-show="openMenus.analytics && !isCollapsed" class="submenu-transition overflow-hidden"
                            :style="{ maxHeight: openMenus.analytics ? '200px' : '0' }">
                            <div class="bg-gray-700">
                                <a href="https://example.com/analytics/reports"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Reports</a>
                                <a href="https://example.com/analytics/metrics"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Metrics</a>
                                <a href="https://example.com/analytics/forecasts"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Forecasts</a>
                                <a href="https://example.com/analytics/trends"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Trends</a>
                            </div>
                        </div>
                    </div>

                    <!-- Users -->
                    <div>
                        <div @click="toggleMenu('users')"
                            class="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span v-if="!isCollapsed" class="ml-3 text-sm">Users</span>
                            <svg v-if="!isCollapsed" :class="{ 'rotate-180': openMenus.users }"
                                class="w-4 h-4 ml-auto transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div v-show="openMenus.users && !isCollapsed" class="submenu-transition overflow-hidden"
                            :style="{ maxHeight: openMenus.users ? '200px' : '0' }">
                            <div class="bg-gray-700">
                                <a href="https://example.com/users/list"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">User List</a>
                                <a href="https://example.com/users/roles"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Roles</a>
                                <a href="https://example.com/users/permissions"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Permissions</a>
                            </div>
                        </div>
                    </div>

                    <!-- Settings -->
                    <div>
                        <div @click="toggleMenu('settings')"
                            class="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span v-if="!isCollapsed" class="ml-3 text-sm">Settings</span>
                            <svg v-if="!isCollapsed" :class="{ 'rotate-180': openMenus.settings }"
                                class="w-4 h-4 ml-auto transform transition-transform duration-300" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div v-show="openMenus.settings && !isCollapsed" class="submenu-transition overflow-hidden"
                            :style="{ maxHeight: openMenus.settings ? '200px' : '0' }">
                            <div class="bg-gray-700">
                                <a href="https://example.com/settings/general"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">General</a>
                                <a href="https://example.com/settings/security"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Security</a>
                                <a href="https://example.com/settings/notifications"
                                    class="block px-10 py-2 text-sm hover:bg-gray-600">Notifications</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
            <!-- Main Content -->
            <div class="flex-1 flex flex-col">
                <!-- Top Navigation Bar -->
                <header class="bg-white shadow-sm h-16 flex items-center justify-between px-6">
                    <!-- Search Bar -->
                    <div class="relative">
                        <input type="text" placeholder="Search..."
                            class="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                        <svg class="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <!-- Right Side Icons -->
                    <div class="flex items-center space-x-6">
                        <!-- Notifications -->
                        <div class="relative" @click="toggleNotifications" v-cloak>
                            <button class="text-gray-600 hover:text-gray-800 flex items-center">
                                <div class="relative">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span
                                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                                </div>
                            </button>
                            <!-- Notifications Dropdown -->
                            <div v-if="isNotificationsOpen"
                                class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1">
                                <div class="p-3 border-b">
                                    <h3 class="text-xs font-semibold">Notifications</h3>
                                </div>
                                <a href="https://example.com/notifications/1"
                                    class="block px-4 py-3 hover:bg-gray-100 border-b">
                                    <div class="text-xs text-gray-700">New comment on your post</div>
                                    <div class="text-xs text-gray-500">2 hours ago</div>
                                </a>
                                <a href="https://example.com/notifications/2"
                                    class="block px-4 py-3 hover:bg-gray-100 border-b">
                                    <div class="text-xs text-gray-700">Your report is ready</div>
                                    <div class="text-xs text-gray-500">5 hours ago</div>
                                </a>
                            </div>
                        </div>

                        <!-- Messages -->
                        <div class="relative" @click="toggleMessages" v-cloak>
                            <button class="text-gray-600 hover:text-gray-800 flex items-center">
                                <div class="relative">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span
                                        class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                                </div>
                            </button>
                            <!-- Messages Dropdown -->
                            <div v-if="isMessagesOpen"
                                class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1">
                                <div class="p-3 border-b">
                                    <h3 class="text-xs font-semibold">Messages</h3>
                                </div>
                                <a href="https://example.com/messages/1"
                                    class="block px-4 py-3 hover:bg-gray-100 border-b">
                                    <div class="text-xs text-gray-700">John: Hey, can you check the latest...</div>
                                    <div class="text-xs text-gray-500">1 hour ago</div>
                                </a>
                                <a href="https://example.com/messages/2"
                                    class="block px-4 py-3 hover:bg-gray-100 border-b">
                                    <div class="text-xs text-gray-700">Sarah: The meeting is scheduled for...</div>
                                    <div class="text-xs text-gray-500">3 hours ago</div>
                                </a>
                            </div>
                        </div>

                        <!-- User Menu -->
                        <div class="relative" @click="toggleUserMenu" v-cloak>
                            <button class="flex items-center space-x-3 focus:outline-none">
                                <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span class="text-sm text-gray-700">John Doe</span>
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <!-- User Dropdown Menu -->
                            <div v-if="isUserMenuOpen"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <a href="https://example.com/profile"
                                    class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">Your Profile</a>
                                <a href="https://example.com/settings"
                                    class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">Settings</a>
                                <a href="https://example.com/logout"
                                    class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">Sign out</a>
                            </div>
                        </div>
                    </div>
                </header>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref, reactive } from 'vue';

// Tipos
type MenuKeys = 'dashboard' | 'analytics' | 'users' | 'settings';

const isUserMenuOpen = ref<boolean>(false);
const isCollapsed = ref<boolean>(false);

const openMenus = reactive<Record<MenuKeys, boolean>>({
    dashboard: false,
    analytics: false,
    users: false,
    settings: false,
});

const isSettingsPanelOpen = ref<boolean>(false);
const isNotificationsOpen = ref<boolean>(false);
const isMessagesOpen = ref<boolean>(false);

const toggleUserMenu = (): void => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
    isNotificationsOpen.value = false;
    isMessagesOpen.value = false;
};

const toggleNotifications = (): void => {
    isNotificationsOpen.value = !isNotificationsOpen.value;
    isMessagesOpen.value = false;
    isUserMenuOpen.value = false;
};

const toggleMessages = (): void => {
    isMessagesOpen.value = !isMessagesOpen.value;
    isNotificationsOpen.value = false;
    isUserMenuOpen.value = false;
};

const toggleSidebar = (): void => {
    isCollapsed.value = !isCollapsed.value;
    if (isCollapsed.value) {
        Object.keys(openMenus).forEach((key) => {
            openMenus[key as MenuKeys] = false;
        });
    }
};

const toggleMenu = (menu: MenuKeys): void => {
    if (!isCollapsed.value) {
        Object.keys(openMenus).forEach((key) => {
            if (key !== menu) {
                openMenus[key as MenuKeys] = false;
            }
        });
        openMenus[menu] = !openMenus[menu];
    }
};

const toggleSettingsPanel = (): void => {
    isSettingsPanelOpen.value = !isSettingsPanelOpen.value;
};

// Manejo de eventos
window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
        isUserMenuOpen.value = false;
        isNotificationsOpen.value = false;
        isMessagesOpen.value = false;
    }
});

</script>

<style>
.transition-width {
    transition-property: width;
  }
  .submenu-transition {
    transition: max-height 0.3s ease-in-out;
  }
  [v-cloak] {
    display: none;
  }
  .hover\:rotate:hover {
    animation: none; /* Remove the old animation */
  }
  button[class*="p-4"]:hover svg {
    animation: spin 2s linear infinite; /* Add new hover animation for the settings button */
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>