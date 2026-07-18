import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Admission from './pages/Admission';
import Students from './pages/Students';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNotices from './pages/admin/Notices';
import AdminCourses from './pages/admin/Courses';
import AdminFaculty from './pages/admin/Faculty';
import AdminStudents from './pages/admin/Students';
import AdminAdmissions from './pages/admin/Admissions';

function ProtectedRoute({ children, roles, loginPath = "/login" }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={loginPath} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="admission" element={<Admission />} />
          <Route path="notices" element={<Notices />} />
          <Route path="contact" element={<Contact />} />
          <Route path="students" element={
            <ProtectedRoute roles={['admin', 'faculty', 'student']}>
              <Students />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']} loginPath="/admin/login">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="admissions" element={<AdminAdmissions />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
