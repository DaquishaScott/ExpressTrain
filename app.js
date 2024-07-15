const express = require('express')
const logger = require('morgan')

// Create the Express app
const app = express()

// Use Morgan as a logger
app.use(logger('dev'))

// Use express.json() to parse JSON bodies
app.use(express.json())

// Global store
const store = [
    {
        name: 'apple',
        price: 1.5
    }
]

// Root Route ("/")
// Return everything in the store
app.get('/', (request, response) => {
    response.json(store)
})

// Get All Products Route ("/get-all-products")
// Return a list of all product names in an array
app.get('/get-all-products', (request, response) => {
    const productNames = store.map(product => product.name)
    response.json(productNames)
})

// Get Product by Name Route ("/get-product/:productName")
// Return the full object with name and price for the specified product
app.get('/get-product/:productName', (request, response) => {
    const productName = request.params.productName
    const product = store.find(product => product.name === productName)

    if (product) {
        response.json(product)
    } else {
        response.status(404).json({ message: 'Product not found' })
    }
})

// Create Product Route ("/create-product")
// Add a new object to the store and return "Product added"
app.post('/create-product', (request, response) => {
    const newProduct = {
        name: request.body.name,
        price: request.body.price
    }
    
    const productExists = store.some(product => product.name === newProduct.name)

    if (productExists) {
        response.status(400).json({ message: 'Product already exists' })
    } else {
        store.push(newProduct)
        response.json({ message: 'Product added' })
    }
})

// Delete Product Route ("/delete-product/:productName")
// Remove the specified product from the store
app.delete('/delete-product/:productName', (request, response) => {
    const productName = request.params.productName
    const productIndex = store.findIndex(product => product.name === productName)

    if (productIndex !== -1) {
        store.splice(productIndex, 1)
        response.json({ message: 'Product deleted' })
    } else {
        response.status(404).json({ message: 'Product not found' })
    }
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

