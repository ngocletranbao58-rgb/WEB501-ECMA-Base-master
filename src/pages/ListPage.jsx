import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu từ db.json
  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Lấy dữ liệu thất bại!");
        setLoading(false);
      });
  }, []);

  // Xóa tour
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/tours/${id}`, { method: "DELETE" })
      .then(() => {
        setTours(tours.filter((tour) => tour.id !== id));
        toast.success("Xóa tour thành công!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Xóa thất bại!");
      });
  };

  if (loading)
    return <p className="text-center py-6 text-gray-500">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên tour</th>
              <th className="px-4 py-2 border">Điểm đến</th>
              <th className="px-4 py-2 border">Thời gian</th>
              <th className="px-4 py-2 border">Giá (VND)</th>
              <th className="px-4 py-2 border">Còn trống</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
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
                <td className="px-4 py-2 border">{tour.price.toLocaleString()}</td>
                <td className="px-4 py-2 border">{tour.available}</td>

                <td className="px-4 py-2 border">
                  <div className="flex items-center gap-2">

                    {/* Nút Sửa */}
                    <Link
                      to={`/edit/${tour.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Sửa
                    </Link>

                    {/* Nút Xóa */}
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

            {tours.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
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