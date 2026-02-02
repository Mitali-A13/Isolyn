const express = require("express");
const router = express.Router();

const {
  generateApiKey,
  getApiKeyForDev,  
  regenerateApiKey,
} = require("../controllers/developer.js");

const authMiddleware = require("../middlewares/auth.js");


//DEV ROUTES 
router.get("/apikey/dev", authMiddleware, getApiKeyForDev);

router.post("/apikey/generate", authMiddleware, generateApiKey);

router.post("/apikey/regenerate", authMiddleware, regenerateApiKey);


//USER INFO 
router.get("/me", authMiddleware, (req, res) => {
  res.json({ success: true, userId: req.user.userId });
});


module.exports = router;
