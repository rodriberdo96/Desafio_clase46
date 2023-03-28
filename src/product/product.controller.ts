import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async saveProduct(
    @Body('timestamp') prodTimestamp: Date,
    @Body('descripcion') prodDescripcion: string,
    @Body('nombre') prodNombre: string,
    @Body('codigo') prodCodigo: string,
    @Body('foto') prodFoto: string,
    @Body('precio') prodPrecio: number,
    @Body('stock') prodStock: number,
  ) {
    const generatedId = await this.productService.saveProduct(
      prodTimestamp,
      prodNombre,
      prodDescripcion,
      prodCodigo,
      prodFoto,
      prodPrecio,
      prodStock,
    );
    return { id: generatedId };
  }
  @Get()
  async getAll() {
    const products = await this.productService.getAll();
    return products;
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getById(prodId);
  }
  @Delete(':id')
  async deleteProd(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('timestamp') prodTimestamp: Date,
    @Body('descripcion') prodDescripcion: string,
    @Body('nombre') prodNombre: string,
    @Body('codigo') prodCodigo: string,
    @Body('foto') prodFoto: string,
    @Body('precio') prodPrecio: number,
    @Body('stock') prodStock: number,
  ) {
    const prodUpdated = await this.productService.updateProd(
      prodId,
      prodTimestamp,
      prodNombre,
      prodDescripcion,
      prodCodigo,
      prodFoto,
      prodPrecio,
      prodStock,
    );
    return prodUpdated;
  }
}
