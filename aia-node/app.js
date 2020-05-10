const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const AsyncLock = require('async-lock');
const dbManager = require('./MongodbManager')
const mongo = require('mongodb');
const toastr = require('express-toastr');

const app = express()



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded())

app.use(expressSession({
  name: 'session',
  secret: 'kjbzfd',
}))

app.use((req, res, next) => {
  if (!Array.isArray(req.session.cart)) {
    req.session.cart = []
  }
  next()
})

app.use(toastr());

dbManager.connect()

app.get('/reset', (req,res) => {
  dbManager.resetToSampleDB()
  res.redirect('/')
})

app.get('/', async (req, res) => {
  try {
    let products = await dbManager.getProducts()
    for( let product of products){
      if(includes(req.session.cart, product)){
        let productInCart = req.session.cart.find(x => x._id === product._id.toString());
        product.count = product.count - productInCart.count
      }
    }
    products = products.filter(p => p.count !== 0)
    res.render('Products', {products: products})
  } catch (error) {
    console.error('Error while fetching products: ' + error)
  }

})

app.get('/cart',  (req, res) => {
  try {
    let sum = 0.00
    for(const product of req.session.cart){
      sum += (product.price)*product.count
    }
    res.render('Cart', {products : req.session.cart, sum : sum.toFixed(2)});
  } catch (error) {
    console.error(error)
  }
})

app.post('/addToCart', async (req, res) => {
  console.log("Adding product {] to cart.", req.body.id)
  let ids = []
  ids.push(mongo.ObjectID(req.body.id))
  let products = await dbManager.getProductsByIDs(ids)
  console.log(products)
  let product = products[0]
  if(includes(req.session.cart, product)){
    let productInCart = req.session.cart.find(x => x._id === product._id.toString());
    ++productInCart.count
    let cartWithoutProduct = req.session.cart.filter(p => p._id !== product._id.toString())
    cartWithoutProduct.push(productInCart)
    req.session.cart = cartWithoutProduct
  }else{
    product.count = 1
    req.session.cart.push(product)
  }
  res.redirect('/')
})

function includes(products, product){
  for (let p of products) {
      if (p._id === product._id.toString()) {
        return true
      }
  }
  return false;

}

app.post('/removeFromCart', (req, res) => {
  console.log("Removing product {] from cart.", req.body.id)
  req.session.cart = req.session.cart.filter(product => product._id !== req.body.id);
  res.redirect('/cart')
})

app.post('/buy', async (req, res, next) => {
  const lock = new AsyncLock()
  lock.acquire('delete',
      async function () {
        let incorrect = await dbManager.removeProducts(req.session.cart);
        if(incorrect.length === 0){
          console.log("Bought products: " + req.session.cart)
          req.session.cart = []
          res.redirect('/')
        }else{
          console.log(incorrect)
          req.toastr.error('Some products unavailable, we deleted it from cart');
          for(let i of incorrect){
            for(let p of req.session.cart){
              if(p._id === i._id){
                p.count = i.count
              }
            }
          }
          res.redirect('/cart')
        }
      },
      function (err, ret) {console.log()},
      {});



});

app.listen(8080, () => console.log('Running at http://localhost:8080/'))
