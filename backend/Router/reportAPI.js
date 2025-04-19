const express = require('express');
const router = express.Router();
const Report = require('../Models/reportSchema'); // Adjust path if needed

// CREATE a new report
router.post('/', async (req, res) => {
  try {
    const { reporterId, reportedUserId, reason } = req.body;
    const newReport = new Report({ reporterId, reportedUserId, reason });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ all reports (admin use case)
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporterId', 'username')
      .populate('reportedUserId', 'username');
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a specific report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reporterId', 'username')
      .populate('reportedUserId', 'username');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a report (optional – e.g., change reason)
router.put('/:id', async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { reason: req.body.reason },
      { new: true }
    );
    if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a report
router.delete('/:id', async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
