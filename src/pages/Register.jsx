import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const [formData, setFormData] = useState({
        username: '',
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

            await axios.post(
                `${apiUrl}/api/auth/register`,
                formData
            );

            alert('Registration Successful');

            navigate('/');

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                'Registration Failed'
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

                <h1>Create Account</h1>

                <p className='auth-subtitle'>
                    Register to start chatting
                </p>

                <input
                    type='text'
                    name='username'
                    placeholder='Enter username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
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
                            ? 'Registering...'
                            : 'Register'
                    }
                </button>

                <p className='auth-switch'>

                    Already have an account?

                    <Link to='/'>
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Register;
