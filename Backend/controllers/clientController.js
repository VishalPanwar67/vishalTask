import Client from "../models/Client.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new client
export const createClient = async (req, res) => {
  async function uploading(file, folder) {
    const options = {
      folder,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }

  const { name, description, designation } = req.body;
  const image = req.files?.image;

  try {
    if (!name || !description || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";
    let cloudinary_name = "";

    if (image) {
      const uploadedResponse = await uploading(image, "Clients");
      imageUrl = uploadedResponse.secure_url;
      cloudinary_name = uploadedResponse.public_id;
    }

    const client = new Client({
      name,
      description,
      designation,
      imageUrl,
      cloudinary_name,
    });

    await client.save();
    res.status(201).json({ message: "Client created successfully", client });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a client (Admin only)
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const del = await cloudinary.uploader.destroy(
        client.cloudinary_name
    );
    const deleteClient = await client.deleteOne({ id });
    return res.status(200).json({
      success: true,
      msg: "Client deleted successfully",
      data: deleteClient,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
