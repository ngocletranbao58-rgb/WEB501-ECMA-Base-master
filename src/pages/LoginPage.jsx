import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            toast.error("Vui lòng nhập đầy đủ email và password");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:3000/login", form);

            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Đăng nhập thành công");
            navigate("/list");
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
