// Importing necessary libraries and modules
const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

/**
 * Controller function to get all contacts for the authenticated user.
 * @route GET /api/contacts
 * @access Private
 */
const getContacts = asyncHandler(async (req, res) => {
    // Fetching contacts from the database for the authenticated user
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

/**
 * Controller function to create a new contact for the authenticated user.
 * @route POST /api/contacts
 * @access Private
 */
const createContact = asyncHandler(async (req, res) => {
    // Logging the request body for debugging purposes
    console.log("The request body is:", req.body);

    // Validating the request body using Joi schema
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).required()
    });
    const result = schema.validate(req.body);

    // Creating a new contact if validation passes
    const contact = await Contact.create({
        name: req.body.name,
        id: req.body.id,
        phone: req.body.phone,
        email: req.body.email,
        user_id: req.user.id
    });

    // Handling validation errors
    if (result.error) {
        res.status(400);
        throw new Error('Validation Failure');
    }

    res.status(201).json(contact);
});

/**
 * Controller function to get a contact by its ID for the authenticated user.
 * @route GET /api/contacts/:id
 * @access Private
 */
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // Handling not found scenario
    if (!contact) {
        res.status(404);
        throw new Error(`Contact with id: ${req.params.id} not Found!`);
    }

    res.status(200).json(contact);
});

/**
 * Controller function to update a contact by its ID for the authenticated user.
 * @route PUT /api/contacts/:id
 * @access Private
 */
const putContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // Handling not found scenario
    if (!contact) {
        res.status(404);
        throw new Error(`Contact with id: ${req.params.id} not Found!`);
    }

    // Checking if the authenticated user has permission to update the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permissions to update other user's contacts");
    }

    // Updating the contact and returning the updated contact
    const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(newContact);
});

/**
 * Controller function to delete a contact by its ID for the authenticated user.
 * @route DELETE /api/contacts/:id
 * @access Private
 */
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // Handling not found scenario
    if (!contact) {
        res.status(404);
        throw new Error(`Contact with id: ${req.params.id} not Found!`);
    }

    // Checking if the authenticated user has permission to delete the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permissions to delete other user's contacts");
    }

    // Deleting the contact and returning the deleted contact
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

// Exporting the controller functions to be used in routes
module.exports = { getContacts, createContact, getContact, putContact, deleteContact };
