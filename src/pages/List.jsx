import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const getTours = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/tours");
      setTours(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTours();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xoá tour?")) return;
    try {
      await axios.delete(`http://localhost:3000/tours/${id}`);
      setTours(tours.filter((tour) => tour.id !== id));
      toast.success("Xoá thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await axios.patch(`http://localhost:3000/tours/${id}`, {
        active: !current,
      });
      getTours();
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái!");
    }
  };

  const filteredTours = tours
    .filter((tour) => tour.name.toLowerCase().includes(keyword.toLowerCase()))
    .filter((tour) => (category ? tour.category === category : true))
    .filter((tour) =>
      status === "active"
        ? tour.active === true
        : status === "inactive"
          ? tour.active === false
          : true
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border px-3 py-2 rounded"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Category --</option>
          <option value="Tour Noi dia">Tour nội địa</option>
          <option value="Tour Quoc te">Tour quốc tế</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">-- Status --</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">name</th>
              <th className="px-4 py-2 border">price</th>
              <th className="px-4 py-2 border">destination</th>
              <th className="px-4 py-2 border">category</th>

              <th className="px-4 py-2 border">duration</th>
              <th className="px-4 py-2 border">image</th>
              <th className="px-4 py-2 border">available</th>
              <th className="px-4 py-2 border">active</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>
                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">
                  {tour.price.toLocaleString()}
                </td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.category}</td>

                <td className="px-4 py-2 border">{tour.duration}</td>
                <td className="px-4 py-2 border">
                  <img src={tour.image} alt={tour.name} className="w-24 h-16" />
                </td>
                <td className="px-4 py-2 border">{tour.available}</td>

                <td className="px-4 py-2 border text-center">
                  <div
                    className={`switch ${tour.active ? "on" : "off"}`}
                    onClick={() => toggleStatus(tour.id, tour.active)}
                  ></div>
                </td>

                <td className="px-4 py-2 border">
                  <div className="flex gap-3">
                    <Link
                      to={`/edit/${tour.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(tour.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
