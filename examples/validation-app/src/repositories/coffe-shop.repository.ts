import { DefaultCrudRepository } from '@loopback/repository';
import { CoffeShop, CoffeeShopRelations } from '../models';
import { DsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CoffeeShopRepository extends DefaultCrudRepository<
    CoffeShop,
    typeof CoffeShop.prototype.shopId,
    CoffeeShopRelations
>{
    constructor(@inject('datasources.ds') dataSource: DsDataSource ){
        super(CoffeShop, dataSource);
    }

}