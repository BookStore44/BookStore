import {service} from '../../utils/service.js'
import productModel from './product.model.js'
export const productService={
    ...service(productModel)
}