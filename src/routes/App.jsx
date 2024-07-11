import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import CreatePost from "../components/CreatePost";
import BlogstoreProvider from "../store/Blogstore";

function App() {
  return (
    <BlogstoreProvider>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <CreatePost />
        <Dashboard />
      </div>
      <Footer />
    </BlogstoreProvider>
  );
}

export default App;
