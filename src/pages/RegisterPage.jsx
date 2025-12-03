import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/register', {
                email,
                password,
            });

            toast.success('Đăng ký thành công');
        } catch (error) {
            toast.error(error.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label htmlFor="register-email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="register-password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="register-password"
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

export default RegisterPage;
