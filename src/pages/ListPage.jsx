import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then(res => res.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Lấy dữ liệu thất bại!");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tour này?")) return;

    fetch(`http://localhost:3001/tours/${id}`, { method: "DELETE" })
      .then(() => {
        setTours(tours.filter(t => t.id !== id));
        toast.success("Xóa thành công!");
      })
      .catch(() => toast.error("Xóa thất bại!"));
  };

  const handleToggleActive = (tour) => {
    fetch(`http://localhost:3001/tours/${tour.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !tour.active })
    })
      .then(res => res.json())
      .then(updated => {
        setTours(prev =>
          prev.map(t => (t.id === tour.id ? updated : t))
        );
      })
      .catch(() => toast.error("Đổi trạng thái thất bại!"));
  };

  const filteredTours = tours.filter(t =>
    t.name.toLowerCase().includes(searchName.toLowerCase())
  );

  if (loading) {
    return <p className="text-center py-6 text-gray-500">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <input
        type="text"
        placeholder="Tìm theo tên tour..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="border px-3 py-2 rounded w-60 mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên tour</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Còn trống</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredTours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{index + 1}</td>

                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>

                <td className="px-4 py-2 border">
                  {(tour.price || 0).toLocaleString()}
                </td>

                <td className="px-4 py-2 border">{tour.available}</td>

                <td className="px-4 py-2 border text-center">
                  <label className="flex items-center justify-center gap-1">
                    <input
                      type="checkbox"
                      checked={tour.active ?? true}
                      onChange={() => handleToggleActive(tour)}
                    />
                    <span className="text-sm">
                      {tour.active ? "Đang hoạt động" : "Không hoạt động"}
                    </span>
                  </label>
                </td>

                <td className="px-4 py-2 border">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/edit/${tour.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Sửa
                    </Link>

                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredTours.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  Không có tour nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
