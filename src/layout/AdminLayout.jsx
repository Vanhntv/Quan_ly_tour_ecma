import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  // check login hay chua
  // token trong localstorage
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Xin chào, {userData.email}</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
