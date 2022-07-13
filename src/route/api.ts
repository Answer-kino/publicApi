import express from "express";
import apiController from "src/controller/apiController";

const router = express.Router();

router.get("/nsdi", apiController.nsdi);

export = router;
