const mongo = require('mongodb');

const url = 'mongodb://localhost:27017'
const dbname = 'ikea'

const collectionName = 'products'

let collection

function connect() {
    mongo.MongoClient.connect(url, {})
        .then(connectedClient => {
            collection = connectedClient.db(dbname).collection(collectionName)
            console.log(`Connected to mongoDB at {${url}:${dbname}}, collection {${collectionName}}`)
        })
        .catch(error => {
            console.error(`Could not connect to mongo at {${url}}, error: ${error}`)
        })
}

function resetToSampleDB() {
    collection.insertMany(
        [{
            name: "STRANDMON Fotel uszak, Skiftebo jasnobeżowy",
            price: 699,
            count: 5
        },
            {
                name: "STRANDMON Podnóżek, Skiftebo jasnobeżowy",
                price: 200,
                count: 10
            },
            {
                name: "MALM Komoda, 2 szuflady, okleina dębowa bejcowana na biało, 40x55 cm",
                price: 149,
                count: 2
            },
            {
                name: "MICKE Biurko, biały, 105x50 cm",
                price: 279,
                count: 1
            },
            {
                name: "STRANDMON Fotel uszak, Nordvalla czerwony",
                price: 699,
                count: 3
            },
            {
                name: "ODGER Krzesło, brązowy",
                price: 249,
                count: 10
            }],
        {}, (err, res) => {
            if (err) console.log(err)
        })
}


async function getProducts() {
    return collection.find().toArray()
}

async function getProductsByIDs(ids) {
    let products = await getProducts()
    let result = []
    for (let product of products) {
        for (let id of ids) {
            if (id.equals(product._id)) {
                result.push(product)
            }
        }
    }
    return result
}

async function removeProductsIfAllAvailableOtherwiseReturnNotAvailable(products) {
    let ids = products.map(p => mongo.ObjectId(p._id))
    let notAvailable = []
    let productsToRemove = await getProductsByIDs(ids)
    for (let toRemove of productsToRemove) {
        for (let wantedProduct of products) {
            if (toRemove._id.toString() === wantedProduct._id) {
                if (toRemove.count < wantedProduct.count) {
                    notAvailable.push(toRemove)
                }
                else{
                    wantedProduct.count = toRemove.count - wantedProduct.count
                }
            }
        }
    }
    if (notAvailable.length === 0) {
        for (let product of products) {
            collection.updateOne({'_id': mongo.ObjectId(product._id)}, {$set: {count: product.count}})
                .then(_ => console.log("[INFO] removed " + product._id))
        }
    }
    return notAvailable
}

module.exports = {
    connect,
    getProductsByIDs,
    resetToSampleDB,
    getProducts,
    removeProducts: removeProductsIfAllAvailableOtherwiseReturnNotAvailable
}