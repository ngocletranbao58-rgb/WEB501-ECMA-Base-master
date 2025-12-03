import { Toaster } from "react-hot-toast";
import { Routes, Route, Link } from "react-router-dom";
import List from "./pages/ListPage";
import Add from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
      <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>
    </div>
  );
}

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span>Xin chào, <strong>{user.name}</strong></span>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
