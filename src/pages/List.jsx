import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/tours");
        setTours(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getTours();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xoá tour?")) {
      try {
        await axios.delete(`http://localhost:3000/tours/${id}`);
        setTours(tours.filter((tour) => tour.id !== id));
        confirm("Đã xoá thành công!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên Tour</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Hình Ảnh</th>
              <th className="px-4 py-2 border">Số vé còn</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>
                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">
                  {tour.price.toLocaleString()}
                </td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>
                <td className="px-4 py-2 border">
                  <img src={tour.image} alt={tour.name} className="w-24 h-16" />
                </td>
                <td className="px-4 py-2 border">{tour.available}</td>
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
