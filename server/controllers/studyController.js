const StudyProfile = require("../models/StudyProfile");

// @desc    Create or update study profile
// @route   POST /api/study-profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { subjects, availableTime, preferredLocation } = req.body;

    let profile = await StudyProfile.findOne({ userId: req.user.id });

    if (profile) {
      profile.subjects = subjects;
      profile.availableTime = availableTime;
      profile.preferredLocation = preferredLocation;
      await profile.save();
    } else {
      profile = await StudyProfile.create({
        userId: req.user.id,
        subjects,
        availableTime,
        preferredLocation,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get study partners based on subject and time
// @route   GET /api/study-partners?subject=...&time=...
// @access  Private
exports.getStudyPartners = async (req, res) => {
  try {
    const { subject, time } = req.query;

    const query = { userId: { $ne: req.user.id } }; // Exclude current user

    if (subject) {
      query.subjects = { $in: [subject] };
    }
    if (time) {
      query.availableTime = time;
    }

    const partners = await StudyProfile.find(query).populate("userId", "name email");

    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/study-profile/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await StudyProfile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
