import {service} from '../../utils/service.js'
import userModel from './user.model.js'
export const userService={
    ...service(userModel)
}