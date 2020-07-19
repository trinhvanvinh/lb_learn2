import { bind, Provider, Interceptor, InvocationContext, InvocationResult, ValueOrPromise } from "@loopback/core";
import { CoffeShop } from '../models';

@bind({tags: {key: ValidatePhoneNumInterceptor.BINDING_KEY}})
export class ValidatePhoneNumInterceptor implements Provider <Interceptor>{
    static readonly BINDING_KEY = `interceptors.${ValidatePhoneNumInterceptor.name}`;

    value(){
        return this.intercept.bind(this);
    }

    async intercept(
        invocationCtx: InvocationContext,
        next: () => ValueOrPromise<InvocationResult>
    ){
        let coffeeShop: CoffeShop | undefined;
        if(invocationCtx.methodName === 'create')
            coffeeShop = invocationCtx.args[0];
        else if (invocationCtx.methodName === 'updateById' )
            coffeeShop = invocationCtx.args[1];


        if(coffeeShop && !this.isAreaCodeValid(coffeeShop.phoneNum, coffeeShop.city)){
            const err: ValidationError = new ValidationError('Area code and city do not match');
            err.statusCode = 400;
            throw err;
        }

        const result = await next();
        return result;
        

    }

    isAreaCodeValid(phoneNum: string, city: string): Boolean {
        const areaCode: string = phoneNum.slice(0, 3);
        if(city.toLowerCase() === 'toronto' )
            return areaCode === '416' || areaCode === '647'

        return true;
    }
        
    

}

class ValidationError extends Error{
    code?: string;
    statusCode?: number;
}