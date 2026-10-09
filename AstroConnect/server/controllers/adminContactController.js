const ContactMessage = require("../models/ContactMessage");

// Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages.",
    });
  }
};

// Update message status
const updateContactMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message status.",
      });
    }

    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message status updated.",
      contactMessage,
    });
  } catch (error) {
    console.error("Update contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update contact message.",
    });
  }
};

// Delete a contact message
const deleteContactMessage = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete contact message.",
    });
  }
};

module.exports = {
  getAllContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
};