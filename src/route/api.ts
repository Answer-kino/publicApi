import express from "express";
import apiController from "src/controller/apiController";
import { shpFile } from "src/middleware/uploadHandler";

const router = express.Router();

router.get("/nsdi", apiController.nsdi);
router.post("/shp2geojson", shpFile.fields([{ name: "shpFile", maxCount: 1 }]), apiController.shp2GeoJson);

export = router;
