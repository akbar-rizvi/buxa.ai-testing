import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.get("/testsuites", controllers.TestController.sendTestSuites);
router.get("/testAll/:testtype", controllers.TestController.runAllTests);
router.post("/test/:testtype", controllers.TestController.runSingleTest);
router.get("/healthCheck", controllers.TestController.healthCheck);
router.get("/healthReport", controllers.TestController.healthReport);

export default router;
