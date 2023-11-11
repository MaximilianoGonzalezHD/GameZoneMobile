export interface DetalleCompra {
  id_detallesc: number;
  subtotal: number;
  cantidad: number;
  videojuego_id: number;
  compra_id: number;
  juego: any; // Esto será el juego asociado
}