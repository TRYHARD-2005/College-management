import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Book, Calendar, Phone, Hash, Award, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function StudentProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    return;
                }
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-[#C08A28] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm border border-red-100 flex items-center gap-2">
                    <span className="font-semibold">Error:</span> {error}
                </div>
            </div>
        );
    }

    if (!profile) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
                >
                    {/* Header Section */}
                    <div className="relative h-48 bg-[#0F2A4A]">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                        <div className="absolute -bottom-16 left-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                className="w-32 h-32 bg-white rounded-full p-2 shadow-lg flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-[#E5E7EB] rounded-full flex items-center justify-center text-[#0F2A4A]">
                                    <User size={48} />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="pt-20 pb-8 px-8">
                        <motion.div variants={itemVariants} className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-gray-900">{profile.name}</h1>
                                <p className="text-[#C08A28] font-medium mt-1 flex items-center gap-1">
                                    <Award size={18} /> {profile.role === 'student' ? 'Student Profile' : 'Faculty Profile'}
                                </p>
                            </div>
                            <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 border border-green-200">
                                <CheckCircle size={16} /> Active Account
                            </div>
                        </motion.div>

                        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 text-gray-500 mb-2">
                                    <User size={20} className="text-[#C08A28]" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Email Address</span>
                                </div>
                                <div className="text-lg font-medium text-gray-900 ml-8">{profile.email}</div>
                            </motion.div>

                            {profile.rollNo && (
                                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                                        <Hash size={20} className="text-[#C08A28]" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Roll Number</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 ml-8">{profile.rollNo}</div>
                                </motion.div>
                            )}

                            {profile.department && (
                                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                                        <Book size={20} className="text-[#C08A28]" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Department</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 ml-8">{profile.department}</div>
                                </motion.div>
                            )}

                            {profile.year && (
                                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                                        <Calendar size={20} className="text-[#C08A28]" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Year</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 ml-8">Year {profile.year}</div>
                                </motion.div>
                            )}

                            {profile.phone && (
                                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                                        <Phone size={20} className="text-[#C08A28]" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Phone</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 ml-8">{profile.phone}</div>
                                </motion.div>
                            )}

                            {profile.facultyId && (
                                <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                                        <Hash size={20} className="text-[#C08A28]" />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Faculty ID</span>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 ml-8">{profile.facultyId}</div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
