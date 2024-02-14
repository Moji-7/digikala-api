import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { SearchProductQuery } from 'src/hamechidun/DTO/product';

const _ = require('lodash');

// Inject the HttpService in your service or controller
@Injectable()
export class DigikalaService {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  // Use the HttpService methods to make HTTP requests
  async search() {
    try {
      // Make a GET request to the /products endpoint
      const response = await this.httpService
        .get('autocomplete/?ad_variant_id=39036158&q=%DA%AF%D9%88%D8%B4%DB%8C')
        .toPromise();
      return response.data;
    } catch (error) {
      // Handle the error
      throw error;
    }
  }
  async searchProduct(searchProductQuery: SearchProductQuery) {
    try {
      const { inputValue, page } = searchProductQuery;
      const encodedInputValue = encodeURIComponent(inputValue);
      const url = `https://api.digikala.com/v1/search/?q=${encodedInputValue}&page=${page}`;

      // Make a GET request to the constructed URL
      const response = await this.httpService.get(url).toPromise();
      const productArray = _.get(response, 'data.data.products', []);
      return { products: productArray };
    } catch (error) {
      // Handle the error
      throw error;
    }
  }
  async getOrdersMe() {
    try {
      const headers = {
        Cookie:
          'Digikala:User:Token:new=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjg2NzkxLCJleHBpcmVfdGltZSI6MTcwNTQ5OTgxMSwicGF5bG9hZCI6W10sInBhc3N3b3JkX3ZlcnNpb24iOjEsInR5cGUiOiJ0b2tlbiJ9.1PO-JDop48Fa4OOxEJA-wnILjKZ34HnsV3WOc14KJew;',
      };
      // Make a GET request to the /products endpoint
      const response = await firstValueFrom(
        this.httpService.get(
          'profile/orders/?activeTab=sent&page=2&status=sent',
          { headers },
        ),
      );
      return response.data;
    } catch (error) {
      // Handle the error
      throw error;
    }
  }
}
