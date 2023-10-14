import express from "express";

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controller/contactController.js";
import { validateToken } from "../middleware/validTokenHandler.js";

const router = express.Router();

// validate Token
router.use(validateToken);

// Get all contacts
router.get("/", getContacts);

// Get one contact
router.get("/:id", getContact);

// Post contact
router.post("/", createContact);

// Patch contact
router.put("/:id", updateContact);

// Delete contact
router.delete("/:id", deleteContact);

export default router;
