import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogstoreProvider from "../store/Blogstore";
import { Outlet } from "react-router-dom";
import Auth from "../components/Authenticate/Auth";

function App() {
  const jwt = document.cookie;
  

  return (
    <BlogstoreProvider>
      <Navbar />
      {jwt?.length ? <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div> : <Auth />}
      <Footer />
    </BlogstoreProvider>
  );
}

export default App;
