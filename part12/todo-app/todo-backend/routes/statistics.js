const express = require('express');
const router = express.Router();

const { getAsync } = require('../redis');

/* GET statistics. */
router.get('/', async (req, res) => {
  const stats = await getAsync('stats');
  res.status(200).json({ "added_todos": stats});
});

module.exports = router;