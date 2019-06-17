const db = require('../model');

exports.getSiteData = async function(req, res, next) {
  try {
    let site = await db.Site.find({});
    res.status(200).send(site[0].siteInfo);
  } catch (error) {
    next(error);
  }
};

exports.updateSiteData = async function(req, res, next) {
  try {
    let site = await db.Site.findOneAndUpdate(
      { name: 'Site' },
      { $set: { siteInfo: req.body } },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      siteInfo: site.siteInfo
    });
  } catch (error) {
    next(error);
  }
};
