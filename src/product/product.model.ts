/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  timestamp: { type: Date, required: false },
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 100 },
  codigo: { type: String, required: true, max: 100 },
  foto: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});
