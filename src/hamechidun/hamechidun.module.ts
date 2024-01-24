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
import { ProcessingService } from './proccessing/hamechidun.process.service';


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
      ProductEntity
    ]), // Register the entity with TypeORM
  ],
  controllers: [HamechidunController,IncrediblesController,ProductController],
  providers: [HamechidunService,OrderItemService,IncrediblesService,ProductService,ProcessingService]
})
export class HamechidunModule {}
