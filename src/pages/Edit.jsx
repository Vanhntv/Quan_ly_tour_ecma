import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "Tour Nội địa",
    active: true,
  });

  useEffect(() => {
    const getTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
        setForm({
          ...data,
          price: data.price,
          available: data.available,
        });
      } catch (error) {
        toast.error("Không tìm thấy tour!");
      }
    };
    getTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/tours/${id}`, {
        ...form,
        price: Number(form.price),
        available: Number(form.available),
      });
      confirm("Cập nhật tour thành công!");
      navigate("/list");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sửa Tour — ID: {id}</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên tour"
          value={form.name}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          name="destination"
          placeholder="Điểm đến"
          value={form.destination}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          name="duration"
          placeholder="Thời gian"
          value={form.duration}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="URL ảnh"
          value={form.image}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="number"
          name="available"
          placeholder="Số vé còn"
          value={form.available}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        >
          <option value="Tour Nội địa">Tour Nội địa</option>
          <option value="Tour Quốc tế">Tour Quốc tế</option>
        </select>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <label>Kích hoạt</label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditPage;
