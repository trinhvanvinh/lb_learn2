import { model, Entity, property } from "@loopback/repository";


@model()
export class CoffeShop extends Entity{
    @property({
        type: 'string',
        id: true,
        generated: true
    })
    shopId?: string;

    @property({
        type: 'string',
        required: true,
        
    })
    city: string

    @property({
        type: 'string',
        required: true,
        
    })
    phoneNum: string;

    @property({
        type: 'number',
        required: true,
        
    })
    capacity: number;

    constructor(data?: Partial<CoffeShop>){
        super(data);
    }

}

export interface CoffeeShopRelations{

}

export type CoffeeShopWithRelations = CoffeShop & CoffeeShopRelations;