const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: { ok: true, service: 'tawreeed-api', version: '1' } });
});

module.exports = router;
