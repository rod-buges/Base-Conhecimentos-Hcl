import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="https://hcl.org.br/images/logo_hcl.png" 
            alt="Hospital do Câncer de Londrina" 
            className="h-10 w-auto"
          />
        </div>
        
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span>Administrador</span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-white text-orange-500 px-3 py-1 rounded-md hover:bg-orange-100 transition-colors"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-orange-500 px-4 py-1 rounded-md hover:bg-orange-100 transition-colors"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;