<template>
    <div class="min-h-screen">
        <div class="fixed w-full top-4 left z-50">
            <div class="flex w-full">
                <button @click="mobileMenuOpen = !mobileMenuOpen"
                    class="md:hidden p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <!-- Search Input -->
                <div class="relative ml-auto">
                    <input v-model="searchQuery" type="text" placeholder="Buscar productos..."
                        class="pl-10 pr-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow border-none bg-white focus:outline-none focus:ring-2 focus:ring-red-500 min:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div class="ml-auto mr-2">
                    <button @click.stop="handleCartClick"
                        class="relative cart-button p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span v-if="cart.length > 0"
                            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {{ cart.length }}
                        </span>
                    </button>

                    <button @click.stop="handleWishlistClick"
                        class="relative wishlist-button p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span v-if="wishlist.length > 0"
                            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {{ wishlist.length }}
                        </span>
                    </button>
                </div>
            </div>


        </div>

        <!-- Cart Button -->
        <div class="fixed top-14 right-4 z-50">


            <!-- Dropdown Cart -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="cartOpen=false" :class="{ '': cartOpen, 'hidden': !cartOpen }"></div>
            <div v-if="cartOpen" class="absolute right-0 mt-3 sm:w-96 w-[320px] bg-white rounded-lg shadow-xl ">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Carrito de Compras</h2>
                        <button @click="clearCart" class="text-red-500 hover:text-red-600 flex items-center gap-1"
                            v-if="cart.length > 0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            Limpiar
                        </button>
                    </div>

                    <div class="max-h-96 overflow-y-auto">
                        <div v-if="cart.length === 0" class="text-center text-gray-500 py-8">
                            Tu carrito está vacío
                        </div>

                        <div v-for="item in cart" :key="item.id"
                            class="flex justify-between items-center border-b pb-2 mb-2">
                            <div class="flex items-center gap-2">
                                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
                                <div>
                                    <h3 class="font-semibold">{{ item.name }}</h3>
                                    <p class="text-sm text-gray-600">S/. {{ item.price.toFixed(2) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <input type="number" v-model="item.quantity"
                                    @input="updateQuantity(item, $event)"
                                    class="w-16 px-2 py-1 border rounded">
                                <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t" v-if="cart.length > 0">
                        <div class="flex justify-between items-center font-bold">
                            <span>Total:</span>
                            <span>S/. {{ total.toFixed(2) }}</span>
                        </div>
                        <button @click="openWhatsApp"
                            class="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            Pagar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wishlist Button -->
        <div class="fixed top-14 right-4 z-50">


            <!-- Wishlist Dropdown -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="wishlistOpen=false" :class="{ '': wishlistOpen, 'hidden': !wishlistOpen }"></div>
            <div v-if="wishlistOpen" class="absolute right-0 mt-3 sm:w-96 w-[320px] bg-white rounded-lg shadow-xl">
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Lista de Deseos</h2>
                        <button @click="clearWishlist" class="text-red-500 hover:text-red-600 flex items-center gap-1"
                            v-if="wishlist.length > 0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            Limpiar
                        </button>
                    </div>

                    <div class="max-h-96 overflow-y-auto">
                        <div v-if="wishlist.length === 0" class="text-center text-gray-500 py-8">
                            Tu lista de deseos está vacía
                        </div>

                        <div v-for="item in wishlist" :key="item.id"
                            class="flex justify-between items-center border-b pb-2 mb-2">
                            <div class="flex items-center gap-2">
                                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
                                <div>
                                    <h3 class="font-semibold">{{ item.name }}</h3>
                                    <p class="text-sm text-gray-600">S/. {{ item.price.toFixed(2) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button @click="addToCart(item, $event)"
                                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    :disabled="getRemainingStock(item) <= 0">
                                    Agregar al Carrito
                                </button>
                                <button @click="removeFromWishlist(item.id)" class="text-red-500 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <!-- Backdrop -->
        <div class="md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity z-20" @click="mobileMenuOpen=false" :class="{ '': mobileMenuOpen, 'hidden': !mobileMenuOpen }"></div>
        <div :class="{ 'translate-x-0': mobileMenuOpen, '-translate-x-full': !mobileMenuOpen }"
            class="fixed md:translate-x-0 left-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40" >
            <div class="p-4">
                <h1 class="text-2xl font-bold mb-8 text-red-600 md:mt-0 mt-12">Sistema de Pedidos</h1>

                <!-- Filters -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Categorías</label>
                        <div class="relative">
                            <div class="multiselect-container">
                                <button type="button" class="multiselect-trigger" @click="toggleDropdown">
                                    <span v-if="selectedCategories.length === 0">Seleccione categorías</span>
                                    <span v-else>{{ selectedCategories.length }} categorías seleccionadas</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                        :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div class="multiselect-options" :class="{ 'show': isOpen }">
                                    <div v-for="category in categories" :key="category" class="multiselect-option"
                                        :class="{ 'selected': selectedCategories.includes(category) }"
                                        @click="toggleCategory(category)">
                                        <svg v-if="selectedCategories.includes(category)"
                                            xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        {{ category }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="selected-categories">
                            <div v-for="category in selectedCategories" :key="category" class="category-pill">
                                <span>{{ category }}</span>
                                <button @click="removeCategory(category)" class="hover:text-red-900"
                                    title="Eliminar categoría">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-3">Rango de Precio</label>
                        <div class="flex items-center gap-4 mb-4">
                            <span class="text-sm font-medium text-gray-600">S/. </span>
                            <input type="number" v-model="minPrice"
                                class="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0" :max="maxProductPrice" @input="validatePriceRange">
                            <span class="text-sm font-medium text-gray-600">a S/. </span>
                            <input type="number" v-model="maxPrice"
                                class="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0" :max="maxProductPrice" @input="validatePriceRange">
                        </div>
                        <div class="range-slider">
                            <div class="track"></div>
                            <div class="range" :style="{
                                left: ((minPrice / maxProductPrice) * (100 - (28 / windowWidth * 100))) + '%',
                                right: (100 - (maxPrice / maxProductPrice) * (100 - (28 / windowWidth * 100))) + '%'
                            }"></div>
                            <input type="range" v-model="minPrice" min="0" :max="maxProductPrice" step="0.01"
                                @input="validatePriceRange">
                            <input type="range" v-model="maxPrice" min="0" :max="maxProductPrice" step="0.01"
                                @input="validatePriceRange">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="md:ml-64 p-4">
            <div class="container mx-auto">
                <!-- Loading Spinner -->
                <div v-if="!products.length" class="flex justify-center items-center p-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
                    <span class="ml-3">Cargando productos...</span>
                </div>

                <!-- Product cards content -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div v-for="product in paginatedProducts" :key="product.id"  
                        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <div class="product-image-container cursor-pointer" @click="openProductModal(product)">
                            <img :src="product.image" :alt="product.name">
                        </div>
                        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                        <p class="text-gray-600">{{ product.category }}</p>
                        <p class="text-red-600 font-bold">S/. {{ product.price.toFixed(2) }}</p>
                        <p class="text-sm text-gray-500">Stock: {{ getRemainingStock(product) }}</p>

                        <!-- Add flex-grow class to create space -->
                        <div class="flex-grow"></div>

                        <!-- Add a dedicated container for buttons at the bottom -->
                        <div class="mt-auto space-y-2">
                            <button @click="toggleWishlist(product, $event)"
                                class="w-full px-4 py-2 rounded-lg transition-colors border"
                                :class="isInWishlist(product.id) ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-700'">
                                {{ isInWishlist(product.id) ? 'Quitar de Lista de Deseos' : 'Agregar a Lista de Deseos'
                                }}
                            </button>
                            <button @click="addToCart(product, $event)" :disabled="getRemainingStock(product) <= 0"
                                :class="[
                                    'w-full px-4 py-2 rounded-lg transition-colors font-semibold',
                                    getRemainingStock(product) <= 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                ]">
                                {{ getRemainingStock(product) <= 0 ? 'Sin Stock' : 'Agregar al Carrito' }} </button>
                        </div>
                    </div>
                </div>

                <!-- New centered pagination controls -->
                <div class="flex flex-col items-center justify-center mb-8 space-y-4 pagination-container">
                    <!-- Items per page selector -->
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-gray-600">Productos por página:</label>
                        <select v-model="itemsPerPage" @change="changeItemsPerPage($event)"
                            class="border rounded-lg pl-3 pr-7 py-1 text-sm">
                            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>

                    <!-- Pagination buttons -->
                    <div class="flex items-center gap-2 scale-[85%] sm:scale-[100%]">
                        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                            class="sm:px-3 px-2 py-1 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                            <p class="hidden md:block">Anterior</p>
                            <svg class="block md:hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        
                        </button>

                        <div class="flex items-center gap-1">
                            <!-- First page -->
                            <button @click="changePage(1)" class="px-3 py-1 rounded-lg border hover:bg-gray-100"
                                :class="currentPage === 1 ? 'bg-blue-500 text-white' : ''">
                                1
                            </button>

                            <!-- Dots before current page if needed -->
                            <span v-if="showLeftDots" class="px-2">..</span>

                            <!-- Page before current -->
                            <button v-if="showPreviousPage" @click="changePage(currentPage - 1)"
                                class="px-3 py-1 rounded-lg border hover:bg-gray-100">
                                {{ currentPage - 1 }}
                            </button>

                            <!-- Current page (if not first or last) -->
                            <button v-if="currentPage > 1 && currentPage < totalPages"
                                class="px-3 py-1 rounded-lg border bg-blue-500">
                                {{ currentPage }}
                            </button>

                            <!-- Page after current -->
                            <button v-if="showNextPage" @click="changePage(currentPage + 1)"
                                class="px-3 py-1 rounded-lg border hover:bg-gray-100">
                                {{ currentPage + 1 }}
                            </button>

                            <!-- Dots after current page if needed -->
                            <span v-if="showRightDots" class="px-2">..</span>

                            <!-- Last page -->
                            <button v-if="totalPages > 1" @click="changePage(totalPages)"
                                class="px-3 py-1 rounded-lg border hover:bg-gray-100"
                                :class="currentPage === totalPages ? 'bg-blue-500 text-white' : ''">
                                {{ totalPages }}
                            </button>
                        </div>

                        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                            class="sm:px-3 px-2 py-1 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                            <p class="hidden md:block">Siguiente</p>
                            <svg class="block md:hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto " role="dialog">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>

            <!-- Modal -->
            <div class="relative min-h-screen flex items-center justify-center p-4 sm:scale-[100%] scale-[80%]" >
                <div v-click-away="closeModal"
                    class="relative bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-xl transform transition-all">
                    <!-- Close button -->
                    <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Content -->
                    <div v-if="selectedProduct" class="p-6">
                        <div class="flex flex-col md:flex-row gap-6">
                            <!-- Product Image -->
                            <div class="w-full md:w-1/2">
                                <img :src="selectedProduct.image" :alt="selectedProduct.name"
                                    class="w-full h-64 object-cover rounded-lg">
                            </div>

                            <!-- Product Details -->
                            <div class="w-full md:w-1/2">
                                <h2 class="sm:text-2xl text-xl font-bold mb-2">{{ selectedProduct.name }}</h2>
                                <p class="text-gray-600 mb-4">{{ selectedProduct.category }}</p>
                                <p class="text-gray-600 mb-4">
                                  {{ selectedProduct.description }}
                                </p>
                                <p class="text-3xl font-bold text-blue-600 mb-4">S/. {{ selectedProduct.price.toFixed(2)
                                    }}</p>
                                <p class="text-gray-600 mb-4">Stock: {{ getRemainingStock(selectedProduct) }}</p>

                                <!-- Actions -->
                                <div class="space-y-3">
                                    <button @click="toggleWishlist(selectedProduct, $event)"
                                        class="w-full px-4 py-2 rounded-lg transition-colors"
                                        :class="isInWishlist(selectedProduct.id) ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300'">
                                        {{ isInWishlist(selectedProduct.id) ? 'Quitar de Lista de Deseos' : 'Agregar a Lista de Deseos' }}
                                    </button>

                                    <button @click="addToCart(selectedProduct, $event)"
                                        :disabled="getRemainingStock(selectedProduct) <= 0" :class="[
                                            'w-full px-4 py-2 rounded-lg transition-colors',
                                            getRemainingStock(selectedProduct) <= 0
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-red-600 hover:bg-red-700 text-white'
                                        ]">
                                        {{ getRemainingStock(selectedProduct) <= 0 ? 'Sin Stock' : 'Agregar al Carrito'
                                            }} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import  { Product }  from '@/interfaces/product'
import { Cart } from '@/interfaces/cart'

interface CartItem extends Product {
    quantity: number
}
// Type definitions
const windowWidth = ref<number>(window.innerWidth)
const mobileMenuOpen = ref<boolean>(false)
const cartOpen = ref<boolean>(false)
const wishlist = ref<Product[]>([])
const wishlistOpen = ref<boolean>(false)
const selectedProduct = ref<Product | null>(null)
const showModal = ref<boolean>(false)
const products = ref<Product[]>([])
const isOpen = ref(false)

const fetchProducts = (): void => {
    const SHEET_ID = '1Nk6iFl2Ejk8Gd35aX1IpsVUonRVW19GNWINB_9Ihpeo'
    const SHEET_NAME = 'Base'
    const API_KEY = 'AIzaSyBD273YqSOikI7LvtWPXMi4R-jFrWEYP2Q'
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

    fetch(url)
        .then((response) => {
            console.log('Response status:', response.status)
            return response.json()
        })
        .then((data) => {
            console.log('Fetched data:', data)
            if (data.values && data.values.length > 0) {
                console.log('First row of data:', data.values[0])
                // Filter products based on row[6] value
      const filteredProducts = data.values.slice(1).filter((row: string[]) => row[6] === '1');
                products.value = filteredProducts.map((row: string[]): Product => ({
                    id: parseInt(row[0]) || 0,
                    name: row[1] || '',
                    price: parseFloat(row[2]) || 0,
                    category: row[3] || '',
                    stock: parseInt(row[4]) || 0,
                    image: row[5] || 'https://via.placeholder.com/300',
                    abilitation: parseInt(row[6]) || 1,
                    description: row[7] || '',
                }))
                maxPrice.value = Math.max(...products.value.map((p) => p.price))
            } else {
                throw new Error('No se encontraron datos en la hoja')
            }
        })
        .catch((error) => {
            console.error('Error al cargar productos:', error)
            alert(error.message)
        })
}

const cart = ref<CartItem[]>([])
const searchQuery = ref<string>('')
const selectedCategories = ref<string[]>([])
const minPrice = ref<number>(0)
const maxPrice = ref<number>(0)

const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(6)
const itemsPerPageOptions = ref<number[]>([6, 12, 24, 48])
    
const maxProductPrice = computed<number>(() => {
  if (products.value.length > 0) {
    return Math.max(...products.value.map((p) => p.price));
  } else {
    return 100000000
  }
});

const categories = computed<string[]>(() => {
    const uniqueCategories = [...new Set(products.value.map((p) => p.category))]
    return uniqueCategories.filter((cat) => cat && cat.trim().length > 0).sort()
})

const filteredProducts = computed<Product[]>(() => {
    return products.value.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory =
            selectedCategories.value.length === 0 ||
            selectedCategories.value.includes(product.category)
        const matchesPrice =
            product.price >= minPrice.value && product.price <= maxPrice.value
        return matchesSearch && matchesCategory && matchesPrice
    })
})

const paginatedProducts = computed<Product[]>(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredProducts.value.slice(startIndex, endIndex)
})

const totalPages = computed<number>(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value)
})

const total = computed<number>(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const getRemainingStock = (product: Product): number => {
    const cartItem = cart.value.find((item) => item.id === product.id)
    return product.stock - (cartItem?.quantity || 0)
}

const createFloatingImage = (sourceImg: string, event: MouseEvent): void => {
    const floatingImg = document.createElement('img')
    floatingImg.src = sourceImg
    floatingImg.classList.add('floating-image')

    const sourceRect = (event.target as HTMLElement).getBoundingClientRect()
    const cartButton = document.querySelector('.cart-button') as HTMLElement
    const targetRect = cartButton.getBoundingClientRect()

    floatingImg.style.width = '100px'
    floatingImg.style.height = '100px'
    floatingImg.style.objectFit = 'cover'
    floatingImg.style.borderRadius = '8px'
    floatingImg.style.left = `${sourceRect.left}px`
    floatingImg.style.top = `${sourceRect.top}px`

    document.body.appendChild(floatingImg)

    requestAnimationFrame(() => {
        floatingImg.style.transform = `translate(${targetRect.left - sourceRect.left}px, ${targetRect.top - sourceRect.top
            }px) scale(0.3)`
        floatingImg.classList.add('fade-out')
    })

    setTimeout(() => {
        floatingImg.remove()
    }, 1000)
}
const createFloatingWishlistImage = (sourceImg: string, event: MouseEvent) => {
    // Crear la imagen flotante
    const floatingImg = document.createElement('img')
    floatingImg.src = sourceImg
    floatingImg.classList.add('floating-image')

    // Obtener las posiciones del elemento fuente
    const sourceRect = (event.target as HTMLElement).getBoundingClientRect()

    // Seleccionar el botón de la wishlist
    const wishlistButton = document.querySelector('.fixed.top-4 .wishlist-button') as HTMLElement | null
    if (!wishlistButton) {
        console.warn('Wishlist button not found')
        return
    }

    const targetRect = wishlistButton.getBoundingClientRect()

    // Estilo inicial de la imagen flotante
    floatingImg.style.width = '100px'
    floatingImg.style.height = '100px'
    floatingImg.style.objectFit = 'cover'
    floatingImg.style.borderRadius = '8px'
    floatingImg.style.position = 'absolute'
    floatingImg.style.left = `${sourceRect.left}px`
    floatingImg.style.top = `${sourceRect.top}px`
    floatingImg.style.transition = 'transform 0.5s ease, opacity 0.5s ease'

    document.body.appendChild(floatingImg)

    // Animar la imagen hacia el botón de la wishlist
    requestAnimationFrame(() => {
        const targetX = targetRect.left - sourceRect.left
        const targetY = targetRect.top - sourceRect.top
        floatingImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.3)`
        floatingImg.style.opacity = '0'
    })

    // Remover la imagen después de la animación
    setTimeout(() => {
        floatingImg.remove()
    }, 1000)
}



const addToCart = (product: Product, event: MouseEvent): void => {
    wishlistOpen.value = false

    const existingItem = cart.value.find((item) => item.id === product.id)
    const remainingStock = getRemainingStock(product)

    if (remainingStock <= 0) return

    createFloatingImage(product.image, event)

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++
        }
    } else {
        cart.value.push({ ...product, quantity: 1 })
    }

    const wishlistIndex = wishlist.value.findIndex((item) => item.id === product.id)
    if (wishlistIndex !== -1) {
        wishlist.value.splice(wishlistIndex, 1)
    }
    closeModal();
}
const toggleWishlist = (product: Product, event: MouseEvent) => {
    cartOpen.value = false // Cierra el dropdown del carrito si está abierto

    const index = wishlist.value.findIndex((item) => item.id === product.id)
    if (index === -1) {
        wishlist.value.push({ ...product })
        createFloatingWishlistImage(product.image, event)
    } else {
        wishlist.value.splice(index, 1)
    }
    closeModal()
}

const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item: Product) => item.id !== productId)
    cartOpen.value = true // Mantener el dropdown del carrito abierto
}

const clearCart = () => {
    cart.value = []
}

const updateQuantity = (item: Cart, event: Event): void => {
  const target = event.target as HTMLInputElement
  const newQuantity = parseInt(target.value, 10)

  const product = products.value.find((p) => p.id === item.id)

  if (!product) return

  if (newQuantity <= 0) {
    removeFromCart(item.id)
  } else if (newQuantity <= product.stock) {
    item.quantity = newQuantity
  }
}

const validatePriceRange = () => {
    const min = parseFloat(minPrice.value.toString())
    const max = parseFloat(maxPrice.value.toString())
    const maxAllowed = maxProductPrice.value

    if (min > max) {
        minPrice.value = max
    }

    if (max < min) {
        maxPrice.value = min
    }

    minPrice.value = Math.max(0, Math.min(minPrice.value, maxAllowed))
    maxPrice.value = Math.max(0, Math.min(maxPrice.value, maxAllowed))
}

const removeCategory = (category: string) => {
    selectedCategories.value = selectedCategories.value.filter((cat) => cat !== category)
    currentPage.value = 1 // Reiniciar a la página 1 al eliminar categoría
}

const isInWishlist = (productId: number): boolean => {
    return wishlist.value.some((item) => item.id === productId)
}

const removeFromWishlist = (productId: number) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId)
    wishlistOpen.value = true // Mantener el dropdown de la wishlist abierto
}

const clearWishlist = () => {
    wishlist.value = []
}

const openWhatsApp = () => {
    const message = cart.value.reduce((msg, item) => {
        return msg + `\n• ${item.quantity}x ${item.name} - S/. ${(item.price * (item.quantity || 1)).toFixed(2)}`
    }, `¡Hola! Me gustaría hacer un pedido de:\n`)

    const orderMessage = message + `\n\nTotal: S/. ${total.value.toFixed(2)}`
    const encodedMessage = encodeURIComponent(orderMessage)
    const phoneNumber = '51930915760'

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
}

const openProductModal = (product: Product) => {
    selectedProduct.value = product
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}
const changePage = (page: number): void => {
    currentPage.value = page
}

const changeItemsPerPage = (event: Event): void => {
  const target = event.target as HTMLSelectElement
  itemsPerPage.value = Number(target.value)
  currentPage.value = 1
}
// Handle cart dropdown toggle
const handleCartClick = () => {
    wishlistOpen.value = false // Close wishlist dropdown
    cartOpen.value = !cartOpen.value // Toggle cart dropdown
}

// Handle wishlist dropdown toggle
const handleWishlistClick = () => {
    cartOpen.value = false // Close cart dropdown
    wishlistOpen.value = !wishlistOpen.value // Toggle wishlist dropdown
}

// Close dropdown if clicked outside
const closeDropdown = (event: MouseEvent) => {
    const container = document.querySelector('.multiselect-container') as HTMLElement | null
    if (container && !container.contains(event.target as Node)) {
        isOpen.value = false
    }
}

// Toggle category selection
const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
        selectedCategories.value.push(category)
    } else {
        selectedCategories.value.splice(index, 1)
    }
    // Reset to page 1 when categories change
    currentPage.value = 1
}

// Pagination computed properties
const showLeftDots = computed(() => currentPage.value > 3)
const showRightDots = computed(() => currentPage.value < totalPages.value - 2)
const showPreviousPage = computed(() => currentPage.value > 2)
const showNextPage = computed(() => currentPage.value < totalPages.value - 1)

// Dropdown toggle
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

// Lifecycle hooks
onMounted(() => {
    fetchProducts()
    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    
    document.removeEventListener('click', closeDropdown)
})



</script>

<style>
:root {
    --primary-color: #e60012;  /* Saga Falabella red */
    --secondary-color: #1a1a1a;
    --accent-color: #f5f5f5;
  }
  
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: transparent;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 4;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: linear-gradient(145deg, var(--primary-color), #cc0010);
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    cursor: pointer;
    pointer-events: all;
    position: relative;
    z-index: 5;
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(145deg, var(--primary-color), #cc0010);
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    cursor: pointer;
    pointer-events: all;
    position: relative;
    z-index: 5;
    transition: all 0.2s ease;
  }
  
  input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
  
  .range-slider {
    position: relative;
    height: 48px;
    padding: 0 12px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    margin: 16px 0;
    transition: all 0.2s ease;
  }
  
  .range-slider:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  }
  
  .range-slider .track,
  .range-slider .range {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    border-radius: 4px;
  }
  
  .range-slider .track {
    background: #e5e7eb;
    z-index: 1;
  }
  
  .range-slider .range {
    background: linear-gradient(90deg, var(--primary-color), #cc0010);
    z-index: 2;
  }
  
  /* Price input styling */
  input[type="number"] {
    width: 64px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 6px 8px;
    background: #ffffff;
    transition: all 0.2s ease;
  }
  
  input[type="number"]:hover {
    border-color: var(--primary-color);
  }
  
  input[type="number"]:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    outline: none;
  }
  
  .range-slider + div span.text-sm {
    font-size: 0.813rem;
    color: #6b7280;
  }
  
  .floating-image {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    opacity: 1;
  }
  
  .floating-image.fade-out {
    opacity: 0;
    transform: scale(0.5);
  }
  
  /* Add these styles to handle the dropdown */
  .cart-dropdown {
    transform-origin: top right;
    animation: dropdown 0.2s ease-out;
  }
  
  @keyframes dropdown {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* New CSS for product image container */
  .product-image-container {
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    height: 280px;
    transition: all 0.3s ease;
  }
  
  .product-image-container:hover {
    box-shadow: none; /* Remove the hover border effect */
  }
  
  .product-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .product-image-container:hover img {
    transform: scale(1.1);
  }
  
  .cart-button, .wishlist-button {
    background-color: var(--accent-color) !important;
    border: 1px solid #e2e2e2;
    transition: all 0.2s ease;
  }
  
  .cart-button:hover, .wishlist-button:hover {
    background-color: #ffffff !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .bg-white.p-4.rounded-lg {
    border: 1px solid #e2e2e2;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  /* Add hover effect back to container */
  .bg-white.p-4.rounded-lg:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  /* Keep buttons at bottom */
  .mt-auto.space-y-2 {
    margin-top: auto;
  }
  
  
  select {
    border-color: #e2e2e2;
    transition: all 0.2s ease;
  }
  
  select:hover {
    border-color: var(--primary-color);
  }
  
  select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(230, 0, 18, 0.1);
    outline: none;
  }
  
  select option {
    background-color: white;
    color: #4b5563;
  }
  
  select option:hover,
  select option:focus,
  select option:checked,
  select option:active {
    background: var(--primary-color) !important;
    background-color: var(--primary-color) !important;
    color: white !important;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  
  .cart-dropdown {
    border: 1px solid #e2e2e2;
  }
  
  .bg-white.rounded-lg {
    border: 1px solid #e2e2e2;
  }
  
  /* Update the styles for the search input container */
  .relative.ml-auto {
    flex: 1;
    min-width: 0; /* Allow input to shrink */
    margin: 0 0.5rem; /* Add margins */
    max-width: calc(100% - 120px); /* Prevent overlap with cart icon */
  }
  
  @media (min-width: 768px) { /* md breakpoint */
    .relative.ml-auto {
      position: fixed;
      left: 16rem; /* Same as sidebar width */
      width: calc(100% - 24rem); /* Reduced width to prevent overlap */
      z-index: 50;
    }
  }
  
  /* Ensure proper spacing for search field */
  .fixed.w-full.top-4.left.z-50 .flex {
    gap: 1rem; /* Increase gap between elements */
  }
  
  input[type="text"].pl-10 {
    width: 100%;
    min-width: 120px;
    max-width: 300px;
  }
  
  /* Mobile adjustments */
  @media (max-width: 767px) {
    .relative.ml-auto {
      position: relative;
      width: calc(100% - 120px); /* Leave space for icons */
      max-width: 300px;
    }
  }
  
  /* Adjust floating icons size for mobile */
  @media (max-width: 640px) {
    .cart-button,
    .wishlist-button {
      padding: 0.5rem !important; /* Smaller padding on mobile */
    }
    
    .cart-button svg,
    .wishlist-button svg {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    input[type="text"].pl-10 {
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
      padding-left: 2.5rem;
    }
    
    .relative.ml-auto svg {
      width: 1.25rem;
      height: 1.25rem;
      left: 0.75rem;
    }
  }
  
  /* Ensure menu button stays consistent */
  button[class*="md:hidden"] {
    padding: 0.5rem !important;
  }
  
  button[class*="md:hidden"] svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  /* Add/modify in the style section */
  @media (min-width: 768px) { /* md breakpoint */
    .md\:ml-64 {
      margin-left: 16rem; /* 256px - matches sidebar width */
    }
  
    .relative.ml-auto {
      position: fixed;
      left: 16rem; /* Same as sidebar width */
      z-index: 50;
    }
  
    /* Ensure proper spacing for cart/wishlist icons */
    .fixed.w-full.top-4.left.z-50 {
      padding-left: 16rem; /* Match sidebar width */
    }
  }
  
  /* Refine mobile view */
  @media (max-width: 767px) {
    .relative.ml-auto {
      position: relative;
      width: 100%;
    }
  
    .fixed.w-full.top-4.left.z-50 {
      padding: 0 1rem;
    }
  }
  
  /* Update styles for cart and wishlist dropdowns */
  @media (max-width: 640px) {
    .cart-dropdown {
      width: calc(100vw - 2rem) !important; /* Account for padding */
      right: -4rem; /* Adjust position */
      max-width: calc(100vw - 2rem);
      margin-right: 1rem;
    }
  
    /* Adjust container padding on mobile */
    .cart-dropdown .p-4 {
      padding: 1rem;
    }
  
    /* Adjust product details layout */
    .cart-dropdown .flex {
      flex-direction: column;
      gap: 0.5rem;
    }
  
    /* Make product info more compact */
    .cart-dropdown .flex .items-center {
      width: 100%;
    }
  
    /* Adjust image size */
    .cart-dropdown img {
      width: 3rem;
      height: 3rem;
    }
  
    /* Make text smaller on mobile */
    .cart-dropdown h3,
    .cart-dropdown p {
      font-size: 0.875rem;
    }
  
    /* Make buttons stack on mobile */
    .cart-dropdown .flex .space-x-2 {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
  }
  
  /* Add more specific styles for very small screens */
  @media (max-width: 380px) {
    .cart-dropdown {
      right: -3rem;
    }
  
    .cart-dropdown .p-4 {
      padding: 0.75rem;
    }
  
    .cart-dropdown h2 {
      font-size: 1rem;
    }
  
    .cart-dropdown input[type="number"] {
      width: 100%;
      max-width: 80px;
    }
  }
  
  /* Update the span styling for the quantity badges */
  .cart-button span.absolute,
  .wishlist-button span.absolute {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem; /* 20px */
    min-height: 1.25rem; /* 20px */
    padding: 0.125rem;
    transform: translate(25%, -25%);
  }
  
  /* Adjust for larger screens when sidebar is visible */
  @media (min-width: 768px) { /* md breakpoint */
    .cart-button span.absolute,
    .wishlist-button span.absolute {
      transform: translate(30%, -30%);
    }
  }
  
  /* Add these styles for the multiselect */
  select[multiple] {
    background-image: none !important;
    padding-right: 0.75rem !important;
    min-height: 160px !important; /* Increased height */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  select[multiple]:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(230, 0, 18, 0.1);
    outline: none;
  }
  
  select[multiple] option {
    padding: 0.75rem 1rem;
    margin: 0.25rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: flex;
    align-items: center;
  }
  
  select[multiple] option:checked {
    background: linear-gradient(145deg, var(--primary-color), #cc0010) !important;
    color: white !important;
    font-weight: 500;
  }
  
  select[multiple] option:hover {
    background: rgba(230, 0, 18, 0.05) !important;
    color: var(--primary-color) !important;
  }
  
  /* Style for Firefox */
  @-moz-document url-prefix() {
    select[multiple] option {
      padding: 0.5rem 0.75rem;
    }
    
    select[multiple] option:checked {
      box-shadow: 0 0 0 30px var(--primary-color) inset;
      background: transparent !important;
    }
  }
  
  /* Add styles for the selected categories container */
  .selected-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(230, 0, 18, 0.05);
  }
  
  .selected-categories:empty {
    display: none;
  }
  
  .category-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    background: white;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    border-radius: 9999px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    gap: 0.375rem;
    transition: all 0.2s ease;
  }
  
  .category-pill:hover {
    background: var(--primary-color);
    color: white;
  }
  
  .category-pill button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.125rem;
    border-radius: 9999px;
    transition: all 0.2s ease;
  }
  
  .category-pill:hover button {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Add these styles for the custom dropdown */
  .multiselect-container {
    position: relative;
  }
  
  .multiselect-trigger {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e2e2;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
  }
  
  .multiselect-trigger:hover {
    border-color: var(--primary-color);
  }
  
  .multiselect-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e2e2e2;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 50;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: none;
  }
  
  .multiselect-options.show {
    display: block;
    animation: dropdownFade 0.2s ease-out;
  }
  
  .multiselect-option {
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .multiselect-option:hover {
    background: rgba(230, 0, 18, 0.05);
  }
  
  .multiselect-option.selected {
    background: var(--primary-color);
    color: white;
  }
  
  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Update the sidebar styles */
  .fixed.md\:translate-x-0.left-0.top-0.h-full.w-64.bg-white.shadow-lg {
    overflow-y: auto;
    height: 100vh; /* Full viewport height */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: var(--primary-color) #efefef; /* Firefox */
  }
  
  /* Custom scrollbar styling for webkit browsers */
  .fixed.md\:translate-x-0.left-0.top-0.h-full.w-64.bg-white.shadow-lg::-webkit-scrollbar {
    width: 6px;
  }
  
  .fixed.md\:translate-x-0.left-0.top-0.h-full.w-64.bg-white.shadow-lg::-webkit-scrollbar-track {
    background: #efefef;
    border-radius: 3px;
  }
  
  .fixed.md\:translate-x-0.left-0.top-0.h-full.w-64.bg-white.shadow-lg::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }
  
  .fixed.md\:translate-x-0.left-0.top-0.h-full.w-64.bg-white.shadow-lg::-webkit-scrollbar-thumb:hover {
    background: #cc0010;
  }
  
  /* Add these styles to the CSS section */
  .pagination-container button {
    border-color: #e2e2e2;
    transition: all 0.2s ease;
  }
  
  .pagination-container button:hover:not(:disabled) {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .pagination-container button:disabled {
    border-color: #e2e2e2;
    color: #9ca3af;
  }
  
  /* Style for active page */
  .pagination-container button.bg-blue-500 {
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color);
    color: white !important;
  }
  
  .pagination-container button.bg-blue-500:hover {
    background-color: #cc0010 !important;
  }
  
  /* Style for the items per page selector */
  .pagination-container select {
    border-color: #e2e2e2;
    transition: all 0.2s ease;
  }
  
  .pagination-container select:hover {
    border-color: var(--primary-color);
  }
  
  .pagination-container select:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(230, 0, 18, 0.1);
  }
</style>