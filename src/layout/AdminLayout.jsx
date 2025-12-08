import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const res = localStorage.getItem("user");
  const data = JSON.parse(res);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-pink-400 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Xin chào, {data.email}</h1>

        <button
          onClick={handleLogout}
          className="bg-pink-600 px-3 py-1 rounded hover:bg-pink-700"
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
