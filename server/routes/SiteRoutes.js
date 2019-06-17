const express = require('express');
const router = express.Router();
//auth middleware
const { ensureUser } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const { getSiteData, updateSiteData } = require('../handler/SiteHandler');

router.get('/site_data', getSiteData);
router.post('/site_data', ensureUser, admin, updateSiteData);

module.exports = router;
