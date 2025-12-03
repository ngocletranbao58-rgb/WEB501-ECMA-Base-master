import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            localStorage.setItem('token', data.accessToken);
            toast.success('Đăng nhập thành công');
        } catch (error) {
            toast.error(error.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label htmlFor="login-email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="login-password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
