import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/interfaces/product/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async saveProduct(
    timestamp: Date,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
  ) {
    const addProduct = new this.productModel({
      timestamp,
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    const prodAdded = await addProduct.save();
    return prodAdded._id;
  }
  async getAll() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.nombre,
      description: prod.descripcion,
      foto: prod.foto,
      codigo: prod.codigo,
      timestamp: prod.timestamp,
      stock: prod.stock,
      precio: prod.precio,
    }));
  }
  async getById(prodId: string) {
    const validId = await validateId(prodId);
    if (validId) {
      const product = await this.findById(prodId);
      return product;
    } else {
      throw new NotFoundException('el Id ingresado no es el formato vlido');
    }
  }
  async deleteProduct(prodId: string) {
    const validId = await validateId(prodId);
    if (validId) {
      const result = await this.productModel.deleteOne({ _id: prodId }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('no se encontro producto con ese Id');
      }
    } else {
      throw new NotFoundException('el Id ingresado no es el formato vlido');
    }
  }

  async updateProd(
    prodId: string,
    timestamp: Date,
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number,
  ) {
    const validId = await validateId(prodId);
    if (validId) {
      const prodToUpdate = await this.findById(prodId);
      if (nombre) {
        prodToUpdate.nombre = nombre;
      }
      if (descripcion) {
        prodToUpdate.descripcion = descripcion;
      }
      if (codigo) {
        prodToUpdate.codigo = codigo;
      }
      if (foto) {
        prodToUpdate.foto = foto;
      }
      if (precio) {
        prodToUpdate.precio = precio;
      }
      if (stock) {
        prodToUpdate.stock = stock;
      }
      if (timestamp) {
        prodToUpdate.timestamp = timestamp;
      }
      prodToUpdate.save();
      return prodToUpdate;
    } else {
      throw new NotFoundException('el Id ingresado no es el formato vlido');
    }
  }

  private async findById(prodId): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(prodId).exec();
    } catch (error) {
      throw new NotFoundException('No se encontro Producto');
    }
    if (!product) {
      throw new NotFoundException('No se encontro Producto');
    }
    return product;
  }
}

async function validateId(prodId) {
  if (prodId.length === 24) {
    return true;
  } else {
    return false;
  }
}
