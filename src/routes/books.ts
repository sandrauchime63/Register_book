import express from "express";
import { createBook } from "../controllers/bookcontrollers/createBook";
import { authorize } from "../middleware/authorization";
import { deleteBook } from "../controllers/bookcontrollers/deleteBook";
import { editBook } from "../controllers/bookcontrollers/editBook";

const router = express.Router();

router.post("/create", authorize, createBook);
router.put("/edit/:id", authorize, editBook);
router.delete("/delete/:id", authorize, deleteBook);

export default router;
