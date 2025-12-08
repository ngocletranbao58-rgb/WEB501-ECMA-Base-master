import { useState } from "react";
import toast from "react-hot-toast";
import { tourApi } from "../api";

function AddPage() {
  const [tour, setTour] = useState({
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
      err.duration = "Thời gian là bắt buộc";
    }
    if (values.price === "" || values.price === null) {
      err.price = "Giá là bắt buộc";
    } else if (Number.isNaN(Number(values.price)) || Number(values.price) <= 0) {
      err.price = "Giá phải là số > 0";
    }
    if (!values.image.trim()) {
      err.image = "Hình ảnh (URL) là bắt buộc";
    } else if (!isValidUrl(values.image.trim())) {
      err.image = "Hình ảnh phải là URL hợp lệ";
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
      err.available = "Số lượng là bắt buộc";
    } else if (
      Number.isNaN(Number(values.available)) ||
      Number(values.available) < 0
    ) {
      err.available = "Số lượng phải là số ≥ 0";
    }
    if (!values.category) {
      err.category = "Category là bắt buộc";
    }

    return err;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(tour));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate(tour);
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
      ...tour,
      price: Number(tour.price),
      available: Number(tour.available),
      discount:
        tour.discount === "" || tour.discount === null
          ? 0
          : Number(tour.discount),
    };

    try {
      await tourApi.create(payload);
      toast.success("Thêm tour thành công!");
      setTour({
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
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi thêm tour");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Thêm Tour mới</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Tên tour</label>
          <input
            type="text"
            name="name"
            value={tour.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={tour.destination}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.destination && errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={tour.duration}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ví dụ: 5 ngày 4 đêm"
          />
          {touched.duration && errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Giá (VND)</label>
          <input
            type="number"
            name="price"
            value={tour.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.price && errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Hình ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={tour.image}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.image && errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          ></textarea>
          {touched.description && errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Số lượng còn trống</label>
          <input
            type="number"
            name="available"
            value={tour.available}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.available && errors.available && (
            <p className="text-red-500 text-sm mt-1">
              {errors.available}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={tour.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border px-3 py-2 rounded"
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
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            checked={tour.active}
            onChange={handleChange}
            id="active"
          />
          <label htmlFor="active">Kích hoạt</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
}

export default AddPage;
