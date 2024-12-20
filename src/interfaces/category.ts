export interface Category {
    id: number; // Identificador único de la categoría
    name: string; // Nombre de la categoría
    slug: string; // Slug de la categoría para la URL
    created_at: string; // Fecha de creación en formato ISO
    updated_at: string; // Fecha de actualización en formato ISO
    products_count: number; // Cantidad de productos en esta categoría
  }
  