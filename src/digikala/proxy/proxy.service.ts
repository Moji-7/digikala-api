// import { HttpService, Injectable, Inject } from '@nestjs/common';
// import { AxiosRequestConfig } from '@nestjs/axios';

// @Injectable()
// export class ProxyService {
//   constructor(@Inject(HttpService) private httpService: HttpService) {}

//   async proxyRequest(config: AxiosRequestConfig) {
//     // Rewrite the request path
//     config.url = this.rewritePath(config.url);

//     // Set the target URL as the base URL
//     config.baseURL = 'https://api.digikala.com';

//     // Make the request using the HttpService
//     try {
//       const response = await this.httpService.request(config).toPromise();
//       return response.data;
//     } catch (error) {
//       // Handle the error
//       throw error;
//     }
//   }

//   rewritePath(path: string) {
//     // Implement your logic to rewrite the path
//     // For example, you can replace some segments or add some prefixes
//     return path;
//   }
// }
