import { pagination, lock } from '../const/status.js'
export const service = (model) => {
    const getList = async (query) => {
        try {
            const {condition, page, sort , populate } = query;
            if (page < 0) page = 1;
            const offset = page * pagination.LIMIT;
            console.log(condition);
            const [total, rows] = await Promise.all([
                await model.countDocuments(condition),
                await model.find(condition, null, {sort, skip: offset, limit: pagination.LIMIT }).populate(populate).exec(),
            ]);
            const nPages = Math.ceil(total / pagination.LIMIT);
            return [rows, nPages]
        } catch (error) {
            throw error;
        }
    };
    return {
        getList,
    };
};