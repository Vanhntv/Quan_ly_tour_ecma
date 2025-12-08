import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");
  const [category, setCategory] = useState("Tour Nội địa");
  const [active, setActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/tours", {
        name,
        destination,
        duration,
        price: Number(price),
        image,
        description,
        available: Number(available),
        category,
        active,
      });
      toast.success("Thêm tour thành công!");
      navigate("/list");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Thêm Tour</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên tour"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          placeholder="Điểm đến"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          placeholder="Thời gian"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Số vé còn"
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="Tour Nội địa">Tour Nội địa</option>
          <option value="Tour Quốc tế">Tour Quốc tế</option>
        </select>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <label>active</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm tour
        </button>
      </form>
    </div>
  );
}

export default AddPage;
