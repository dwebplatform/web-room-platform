import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { InjectConnection } from 'nest-knexjs';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectConnection() private readonly knex: Knex) { }

  async excludeQuery(excludedFields: string[], table) {
    const [columns] = await this.knex.raw(`SHOW COLUMNS FROM ${table};`);
    let templateString = ``;
    for (const column of columns) {
      if (!excludedFields.includes(column.Field)) {
        templateString += `${table}.${column.Field}, `;
      }
    }
    templateString = templateString.replace(/,\s*$/, "");
    return (await this.knex.raw(`select ${templateString} from ${table};`))[0];
  }

  createProduct(cp: any) {
    let allKeys = Object.keys(cp);
    let product = {};
    let neededProps = allKeys.filter((p) => p.includes("product"));
    neededProps.forEach((k) => {
      product[k.split("_")[1]] = cp[k];
    });
    return product;
  }
  getCategories(mixed: Array<any>) {
    const categories = [];
    for (const cp of mixed) {
      let findedCat = categories.find((c) => c.id === cp.id);
      let createdProduct = this.createProduct(cp);
      if (findedCat) {
        findedCat.products.push({
          ...createdProduct
        });
      } else {
        categories.push({
          id: cp.id,
          name: cp.categories_name,
          products: [{...createdProduct}]
        });
      }
    }
    return categories;
  }
  async findAll() {
    const catsProducts = await this.knex('categories').join('products', 'categories.id', 'products.categories_id').select(
      'name as categories_name',
      'title as products_title',
      'products.id as products_id',
      'categories_id as id');
    return this.getCategories(catsProducts);
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const [productId] = await this.knex.table('products').insert({
        title: createProductDto.title,
        price: createProductDto.price,
      });
      return await this.knex.table('products').where({ id: productId }).first();
    } catch (err) {
      throw new HttpException(err.message || 'Не удалось создать новый продукт', HttpStatus.BAD_REQUEST);
    }
  }
}
