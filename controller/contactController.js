import asyncHandler from "express-async-handler";

import Contact from "../models/contactModel.js";

// Get all contacts
// route '/api/contacts'
// access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res
    .status(200)
    // .json({ message: "Get all contacts." });
    .json(contacts);
});

// Get one contact
// route '/api/contacts/:id'
// access public
const getContact = asyncHandler(async (req, res) => {
  // get by id
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

// Create contact
// route '/api/contacts/'
// access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone_number } = req.body;
  console.log("The req body is: ", name);
  if (!name || !email || !phone_number) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Create contact
  const contact = await Contact.create({
    name,
    email,
    phone_number,
  });
  res.status(201).json(contact);
});

// Update contact
// route '/api/contacts/:id'
// access public
const updateContact = asyncHandler(async (req, res) => {
  // get by id
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(202).json(updatedContact);
});

// Delete contact
// route '/api/contacts/:id'
// access public
const deleteContact = asyncHandler(async (req, res) => {
  // get by id
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  // delete the contact
  await Contact.deleteOne({ _id: req.params.id });

  res.status(204).json({ message: "Contact deleted sucessfully!" });
});

export { getContacts, getContact, createContact, updateContact, deleteContact };
