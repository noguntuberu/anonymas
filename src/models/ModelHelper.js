/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */
//
module.exports = {
    process_filter_ranges : (fields) => {
        //
        if (fields.range == undefined) return {};

        //
        let rangeQuery = {};
        let { range } = fields;
        range = JSON.parse(range);

        for (let field in range) {
            rangeQuery = {
                ...rangeQuery,
                [field]: {
                        $gte: range[field],
                        $lte: range[field].to ? range[field].to : 99999999999999
                }
            }
        }

        return rangeQuery;
    },

    process_alternatives : (fields) => {
        let query = {};
        let orFields = {...fields};
    
        if (orFields == {}) return fields;
        
        if (orFields.range != undefined) {
            delete orFields.range;
        }

        for(let field in orFields) {
            if (query.$and == undefined) {
                query.$and = []
            }

            if (typeof orFields[field] == 'string') {
                const fieldOptions = orFields[field].split(',');
                let orOptions = {
                    $or : []
                }

                fieldOptions.forEach(fieldOption => {
                    orOptions.$or.push({[field] : fieldOption});
                })
                
                query.$and.push(orOptions);
            } else {
                query.$and.push({[field] : orFields[field]});
            }
        }
        return query;
    }
}