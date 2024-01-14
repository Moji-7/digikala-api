import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HamechidunController } from './hamechidun.controller';
import { HamechidunService } from './hamechidun.service';
import { TopSellingProduct } from './entity/TopSellingProduct';
import { PopulateOrdersSummary,PopulateOrdersSellersMost, PopulateOrdersProductsMost, PopulateOrderProductPriceExpensive } from './entity/entityAll';
import { OrderItemService } from './orderItems.service';
import { OrderItem } from './entity/OrderItem';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopSellingProduct,
      PopulateOrdersSummary,
      PopulateOrdersSellersMost,
      PopulateOrdersProductsMost,
      PopulateOrderProductPriceExpensive,
      OrderItem
    ]), // Register the entity with TypeORM
  ],
  controllers: [HamechidunController],
  providers: [HamechidunService,OrderItemService]
})
export class HamechidunModule {}
