import { repository, Filter } from '@loopback/repository';
import { CoffeeShopRepository } from '../repositories';
import { post, getModelSchemaRef, requestBody, param, getFilterSchemaFor, get } from '@loopback/rest';
import { CoffeShop } from '../models';
import { intercept } from '@loopback/core';
import { ValidatePhoneNumInterceptor } from '../interceptors';

@intercept(ValidatePhoneNumInterceptor.BINDING_KEY)
export class CoffeeShopController {
    constructor(
        @repository(CoffeeShopRepository)
        public coffeeShopRepository: CoffeeShopRepository
    ){}

    @post('/coffee-shops',{
        responses:{
            '200': {
                description: 'CoffeeShop model instance',
                content: {'application/json': {schema: getModelSchemaRef(CoffeShop)}}
            }
        }
    })
    async create (
        @requestBody({
            content:{
                'application/json': {
                    schema: getModelSchemaRef(CoffeShop, {
                        title: 'NewCoffeeShop',
                        exclude: ['shopId']
                    })
                }
            }
        })
        coffeeShop: Omit<CoffeShop, 'shopId'>
    ): Promise<CoffeShop>{
        return this.coffeeShopRepository.create(coffeeShop);
    }

    @get('/coffee-shops',{
        responses: {
            '200': {
                description: 'Array of CoffeShop model instances',
                content:{
                    'application/json':{
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(CoffeShop, {includeRelations: true})
                        }
                    }
                }
            }
        }
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(CoffeShop))
        filter?: Filter<CoffeShop>
    ): Promise<CoffeShop[]>{
        return this.coffeeShopRepository.find(filter);
    }

}