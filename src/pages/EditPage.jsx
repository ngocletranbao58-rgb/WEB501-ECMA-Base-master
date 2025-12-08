import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tourApi } from "../api";

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
    discount: "",
    category: "tour nội địa",
    active: true,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const validate = (values) => {
    const err = {};

    if (!values.name.trim()) {
      err.name = "Tên tour là bắt buộc";
    } else if (values.name.trim().length < 5 || values.name.trim().length > 100) {
      err.name = "Tên tour phải từ 5-100 ký tự";
    }

    if (!values.destination.trim()) {
      err.destination = "Điểm đến là bắt buộc";
    } else if (
      values.destination.trim().length < 2 ||
      values.destination.trim().length > 50
    ) {
      err.destination = "Điểm đến phải từ 2-50 ký tự";
    }

    if (!values.duration.trim()) {
      err.duration = "Thời lượng là bắt buộc";
    }

    if (values.price === "" || values.price === null) {
      err.price = "Giá là bắt buộc";
    } else if (Number.isNaN(Number(values.price)) || Number(values.price) <= 0) {
      err.price = "Giá phải là số > 0";
    }

    if (!values.image.trim()) {
      err.image = "Ảnh là bắt buộc";
    } else if (!isValidUrl(values.image.trim())) {
      err.image = "Ảnh phải là URL hợp lệ";
    }

    if (!values.description.trim()) {
      err.description = "Mô tả là bắt buộc";
    } else if (
      values.description.trim().length < 10 ||
      values.description.trim().length > 1000
    ) {
      err.description = "Mô tả phải từ 10-1000 ký tự";
    }

    if (values.available === "" || values.available === null) {
      err.available = "Còn trống là bắt buộc";
    } else if (
      Number.isNaN(Number(values.available)) ||
      Number(values.available) < 0
    ) {
      err.available = "Còn trống phải là số ≥ 0";
    }

    if (!values.category) {
      err.category = "Loại tour là bắt buộc";
    }

    return err;
  };
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await tourApi.getById(id);
        setForm({
          name: data.name || "",
          destination: data.destination || "",
          duration: data.duration || "",
          price: data.price ?? "",
          image: data.image || "",
          description: data.description || "",
          available: data.available ?? "",
          discount: data.discount ?? "",
          category: data.category || "tour nội địa",
          active: data.active ?? true,
        });
      } catch (error) {
        console.error(error);
        toast.error("Không tải được dữ liệu tour!");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);
    setTouched({
      name: true,
      destination: true,
      duration: true,
      price: true,
      image: true,
      description: true,
      available: true,
      category: true,
      active: true,
    });

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...form,
      price: Number(form.price),
      available: Number(form.available),
      discount:
        form.discount === "" || form.discount === null
          ? 0
          : Number(form.discount),
    };

    try {
      await tourApi.update(id, payload);
      toast.success("Cập nhật tour thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại!");
    }
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
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.destination && errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination}
            </p>
          )}
        </div>
        <div>
          <label className="font-medium">Thời lượng</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.duration && errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration}
            </p>
          )}
        </div>
        <div>
          <label className="font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.price && errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <label className="font-medium">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.image && errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>
        <div>
          <label className="font-medium">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded h-24"
          ></textarea>
          {touched.description && errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description}
            </p>
          )}
        </div>
        <div>
          <label className="font-medium">Còn trống</label>
          <input
            type="number"
            name="available"
            value={form.available}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {touched.available && errors.available && (
            <p className="text-red-500 text-sm mt-1">
              {errors.available}
            </p>
          )}
        </div>
        <div>
          <label className="font-medium">Loại tour</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          >
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
          {touched.category && errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category}
            </p>
          )}
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
