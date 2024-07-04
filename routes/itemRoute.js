const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - title
 *         - authorOrDirector
 *         - description
 *         - releaseDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the item
 *         title:
 *           type: string
 *           description: The title of the item
 *         authorOrDirector:
 *           type: string
 *           description: The author or director of the item
 *         description:
 *           type: string
 *           description: The description of the item
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: The release date of the item
 *       example:
 *         id: d5fE_asz
 *         title: The Great Gatsby
 *         authorOrDirector: F. Scott Fitzgerald
 *         description: A novel set in the Jazz Age that tells the story of Jay Gatsby's love for Daisy Buchanan.
 *         releaseDate: 1925-04-10
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The title to search for
 *       - in: query
 *         name: authorOrDirector
 *         schema:
 *           type: string
 *         description: The author or director to search for
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/', itemController.getAllItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 */
router.get('/:id', itemController.getItemById);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */
router.post('/', itemController.createItems);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update the item by the id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', itemController.updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/:id', itemController.deleteItem);

module.exports = router;
