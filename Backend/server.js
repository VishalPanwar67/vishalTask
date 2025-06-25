import express from "express";
import cors from "cors";
import connectDB from "./Database/Mongodb.js";
import projectRoutes from "./routes/projectRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import cloudinaryConfig from "./Database/Cloudinarydb.js";
import fileUpload from "express-fileupload";
import morgan from"morgan";

connectDB();
cloudinaryConfig();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

const PORT =  5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
