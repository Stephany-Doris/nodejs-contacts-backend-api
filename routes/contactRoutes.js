import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contactControllers.js";
import validateTokenHandler from "../middleware/validateTokenHandler.js";

const router = express.Router();

// add to protect all contact routes
router.use(validateTokenHandler);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
