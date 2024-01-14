import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { HttpModuleOptions } from '@nestjs/axios';


@Injectable()
export class ProxyService {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  // Use the HttpService methods to make HTTP requests
  async getProducts() {
    try {
      // Make a GET request to the /products endpoint
      const response = await this.httpService
        .get('/products')
        .toPromise();
      return response.data;
    } catch (error) {
      // Handle the error
      throw error;
    }
  }
}