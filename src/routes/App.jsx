import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogstoreProvider from "../store/Blogstore";
import { Outlet } from "react-router-dom";
import Auth from "../components/Authenticate/Auth";

function App() {


  return (
    <BlogstoreProvider>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div> :
      <Footer />
    </BlogstoreProvider>
  );
}

export default App;
