import { useState, useEffect } from "react";
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
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Ảnh</th>
              <th className="px-4 py-2 border border-gray-300">Tên tour</th>
              <th className="px-4 py-2 border border-gray-300">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300">Giá (VND)</th>
              <th className="px-4 py-2 border border-gray-300">Còn trống</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img src={tour.image} alt={tour.name} className="w-20 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.price.toLocaleString()}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
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
