import {service} from '../../utils/service.js'
import categoryModel from './category.model.js'
export const categoryService={
    ...service(categoryModel)
}