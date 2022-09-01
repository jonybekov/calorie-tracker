module.exports = (pool) => {
    var module = {}

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err) // your callback here
        process.exit(-1)
    })

    module.query = async (query) => {
        return pool.query(query)
    }

    module.queryParams = async (query, params) => {
        return pool.query(query, params)
    }
   
    return module
}