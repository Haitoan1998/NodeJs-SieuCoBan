import express from "express";
import apiControllers from "../controller/apiControllers";
const router = express.Router();

router.get("/users", apiControllers.getAllUsers);

router.post("/create-user", apiControllers.createUser);

router.put("/update-user/:id", apiControllers.updateUser);

router.delete("/delete-user/:id", apiControllers.deleteUser);

export default router;
