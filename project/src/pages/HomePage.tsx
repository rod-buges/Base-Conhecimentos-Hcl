import React from 'react';
import Layout from '../components/Layout';
import ProcedureList from '../components/ProcedureList';
import { Database, FileText, Users, Cpu } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Base de Conhecimentos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acesse todos os procedimentos e instruções para os sistemas do hospital.
            Organizados por categoria para facilitar sua consulta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full mr-4">
              <Database size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Sistemas</h3>
              <p className="text-sm text-gray-500">Tasy, Senior e mais</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full mr-4">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Documentação</h3>
              <p className="text-sm text-gray-500">Procedimentos e guides</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full mr-4">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Acessos</h3>
              <p className="text-sm text-gray-500">Gerenciamento de contas</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full mr-4">
              <Cpu size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Hardware</h3>
              <p className="text-sm text-gray-500">Equipamentos e rede</p>
            </div>
          </div>
        </div>
        
        <ProcedureList />
      </div>
    </Layout>
  );
};

export default HomePage;