import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HamechidunController } from './hamechidun.controller';
import { HamechidunService } from './hamechidun.service';
import { TopSellingProduct } from './entity/TopSellingProduct';
import { PopulateOrdersSummary,PopulateOrdersSellersMost, PopulateOrdersProductsMost, PopulateOrderProductPriceExpensive } from './entity/entityAll';
import { OrderItemService } from './orderItems.service';
import { OrderItem } from './entity/OrderItem';
import { IncrediblesEntity } from './entity/Incredibles';
import { IncrediblesService } from './incredibles.service';
import { IncrediblesController } from './incredibles.controller';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entity/product.entity';
// import { CommentsEntity,CommentsDataset } from './entity/comments.entity';
// import { CommentsController } from './comments.controller';
 import { CommentsService } from './comments.service';

// proccessing and proccessed

import { ProcessingService } from './proccessing/hamechidun.process.service';
import { ProccessedService } from './proccessed/hamechidun.processed.service';
import { CommentsDataset, CommentsEntity } from './entity/comments.entity';
import { CommentsController } from './comments.controller';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopSellingProduct,
      PopulateOrdersSummary,
      PopulateOrdersSellersMost,
      PopulateOrdersProductsMost,
      PopulateOrderProductPriceExpensive,
      OrderItem,
      IncrediblesEntity,
      ProductEntity,
      CommentsEntity,
      CommentsDataset
    ]), // Register the entity with TypeORM
  ],
  controllers: [HamechidunController,IncrediblesController,ProductController,CommentsController],
  providers: [HamechidunService,
    ProcessingService,ProccessedService,
    OrderItemService,IncrediblesService,ProductService,CommentsService
  ]
})
export class HamechidunModule {}
