import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FileUploader from '../components/FileUploader';
import ProcedureList from '../components/ProcedureList';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center">
          <Shield size={32} className="text-orange-500 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Painel Administrativo
            </h1>
            <p className="text-gray-600">
              Gerencie os procedimentos de TI do hospital.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FileUploader />
          </div>
          
          <div className="lg:col-span-2">
            <ProcedureList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;