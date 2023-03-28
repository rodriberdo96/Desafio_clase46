import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  timestamp: Date;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}
