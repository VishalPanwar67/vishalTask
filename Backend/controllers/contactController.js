import Contact from "../models/Contact.js";

// Submit a new contact
export const submitContact = async (req, res) => {
  const { name, email, mobile, city } = req.body;

  try {
    if (!name || !email || !mobile || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({
      name,
      email,
      mobile,
      city,
    });

    await contact.save();
    res.status(201).json({ message: "Contact submitted successfully", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
