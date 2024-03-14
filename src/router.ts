import  { Router } from "express"
import {body} from "express-validator"
import { handleInputErrors } from "./modules/middleware"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product"
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update"

const router = Router()

/**
 * Product
 */

router.get('/product',  getProducts)
router.get('/product/:id',  getOneProduct)
router.put('/product/:id', body('name').isString() , handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id',  deleteProduct)

/**
 * Update
 */

router.get('/update', getUpdates)
router.get('/update/:id',  getOneUpdate)
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', "LIVE", "DEPRECATED", "ARCHIVED"]).optional(),
    body('version').optional(),
    body('asset').optional(),
    handleInputErrors,
    updateUpdate)

router.delete('/update/:id',  deleteUpdate)
router.post('/update',
    body('title').isString(),
    body('body').isString(),
    body('productId').isString(),
    handleInputErrors,
    createUpdate)

/**
 * UpdatePoint
 */

router.get('/updatepoint',  () => {})
router.get('/updatepoint/:id',  () => {})
router.put('/updatepoint/:id',
    body('name').optional(),
    body('description').optional(),
    handleInputErrors,
() => {})
router.delete('/updatepoint/:id',  () => {})
router.post('/updatepoint',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString()
, handleInputErrors, () => {})

export default router