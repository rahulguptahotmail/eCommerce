const { addproduct, totalUsers,productsList,deleteProduct,updateProduct, getSingleProduct } = require('../controller/admin.controller');

const Router = require('express').Router();

Router.route('/addproduct').post(addproduct)
Router.route('/totalusers').get(totalUsers)
Router.route('/productslist').get(productsList)
Router.route('/deleteproduct/:id').delete(deleteProduct)
Router.route('/getsingleproduct/:id').get(getSingleProduct)
Router.route('/updateproduct/:id').patch(updateProduct)

module.exports = Router