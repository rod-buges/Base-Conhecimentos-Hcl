import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Shield size={48} className="mx-auto text-orange-500 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Acesso Administrativo
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Área restrita para administradores do sistema de procedimentos de TI.
          </p>
        </div>
        
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;