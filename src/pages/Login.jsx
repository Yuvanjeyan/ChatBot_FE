import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                `${apiUrl}/api/auth/login`,
                formData
            );

            // Save JWT Token
            localStorage.setItem(
                'token',
                response.data.token
            );

            // Save User Details
            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            // Redirect to Chat Page
            navigate('/chat');

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                'Login Failed'
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className='auth-container'>

            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >

                <h1>Welcome Back</h1>

                <p className='auth-subtitle'>
                    Login to continue chatting
                </p>

                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type='submit'
                    disabled={loading}
                >
                    {
                        loading
                            ? 'Logging in...'
                            : 'Login'
                    }
                </button>

                <p className='auth-switch'>

                    Don't have an account?

                    <Link to='/register'>
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;
