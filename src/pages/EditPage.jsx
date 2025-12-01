import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EditPage() {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "",
    active: true,
  });

  const [loading, setLoading] = useState(true);

  // Fetch tour theo ID
  useEffect(() => {
    fetch(`http://localhost:3001/tours/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Không tải được dữ liệu tour!");
        setLoading(false);
      });
  }, [id]);

  // Change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/tours/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        toast.success("Cập nhật tour thành công!");
        navigate("/list");
      })
      .catch(() => toast.error("Cập nhật thất bại!"));
  };

  if (loading) return <p className="text-center py-6">Đang tải...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Cập nhật Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-medium">Tên tour</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Thời lượng</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-medium">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          ></textarea>
        </div>

        <div>
          <label className="font-medium">Còn trống</label>
          <input
            type="number"
            name="available"
            value={form.available}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-medium">Loại tour</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <label>Hoạt động</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
