import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutD from "./component/LayoutD";
import Contact from "./Pages/Contact";
import Subscibe from "./Pages/Subscribe";
import CreateClient from "./Pages/CreateClient";
import ViewClients from "./Pages/ViewClients";
import AddProject from "./Pages/AddProject";
import ViewProjects from "./Pages/ViewProjects";
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutD />}>
          <Route index element={<Contact />} />
          <Route path="subscribe" element={<Subscibe />} />
          <Route path="clients/add" element={<CreateClient />} />
          <Route path="clients/view" element={<ViewClients />} />
          <Route path="projects/add" element={<AddProject />} />
          <Route path="projects/view" element={<ViewProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
