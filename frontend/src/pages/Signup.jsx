import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signup } from '../api/api';
import './Signup.css';

export default function Signup() {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNo: '',
        facultyId: '',
        department: '',
        year: '',
        designation: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // AuthContext currently might not have a register method, we might need to handle login manually after signup.
    // Let's implement fetch directly here.
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // On success, we get token and user
            if (data.token) {
                // Manually trigger the context login if we can, or just save token and redirect
                localStorage.setItem('token', data.token);
                // We should ideally call the context `login(token)` but since the context usually just verifies, we'll reload or navigate.
                // Or let's redirect them to login page to login normally to ensure context updates perfectly.
                navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Profile</h2>
                    <p>Join the college portal based on your role</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="role-selector">
                    <button
                        className={`role-btn ${role === 'student' ? 'active' : ''}`}
                        onClick={() => setRole('student')}
                    >Student</button>
                    <button
                        className={`role-btn ${role === 'faculty' ? 'active' : ''}`}
                        onClick={() => setRole('faculty')}
                    >Faculty</button>
                    <button
                        className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                        onClick={() => setRole('admin')}
                    >Admin</button>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label>Email ID</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="johndoe@example.com" />
                    </div>

                    {role === 'student' && (
                        <>
                            <div className="form-group">
                                <label>Roll Number</label>
                                <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required placeholder="e.g. STU1234" />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" value={formData.department} onChange={handleChange} required placeholder="Computer Science" />
                            </div>
                            <div className="form-group">
                                <label>Year / Semester</label>
                                <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="1" />
                            </div>
                        </>
                    )}

                    {role === 'faculty' && (
                        <>
                            <div className="form-group">
                                <label>Faculty ID</label>
                                <input type="text" name="facultyId" value={formData.facultyId} onChange={handleChange} required placeholder="e.g. FAC5678" />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" value={formData.department} onChange={handleChange} required placeholder="Computer Science" />
                            </div>
                            <div className="form-group">
                                <label>Designation</label>
                                <input type="text" name="designation" value={formData.designation} onChange={handleChange} required placeholder="Assistant Professor" />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a strong password" />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Profile...' : 'Sign Up'}
                    </button>

                    <p className="login-prompt">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
