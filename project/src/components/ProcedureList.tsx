import React, { useState } from 'react';
import { useProcedures } from '../contexts/ProcedureContext';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Trash2, Download, Search, X } from 'lucide-react';
import CategorySelect from './CategorySelect';

const ProcedureList: React.FC = () => {
  const { 
    filteredProcedures, 
    selectedCategory, 
    setSelectedCategory, 
    searchTerm, 
    setSearchTerm,
    deleteProcedure
  } = useProcedures();
  
  const { isLoggedIn } = useAuth();
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; name: string } | null>(null);
  
  const handleOpenPdf = (base64Data: string, fileName: string) => {
    setSelectedPdf({ url: base64Data, name: fileName });
  };
  
  const handleClosePdf = () => {
    setSelectedPdf(null);
  };
  
  const handleDownloadPdf = (base64Data: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {selectedPdf.name}
              </h3>
              <button
                onClick={handleClosePdf}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 bg-gray-50">
              <iframe
                src={selectedPdf.url}
                className="w-full h-full rounded-b-lg"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Procedimentos</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-[42%] -translate-y-1/2 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar procedimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <CategorySelect 
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          
          {filteredProcedures.length === 0 ? (
            <div className="text-center py-10">
              <FileText size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Nenhum procedimento encontrado</p>
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-1">
                  Tente ajustar sua busca ou selecionar outra categoria
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProcedures.map((procedure) => (
                <div 
                  key={procedure.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <FileText size={18} className="text-orange-500 mr-2" />
                      <h3 className="font-medium text-gray-800 truncate" title={procedure.name}>
                        {procedure.name}
                      </h3>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                      {procedure.category}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-3">
                    Adicionado em: {formatDate(procedure.dateAdded)}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-3 truncate" title={procedure.fileName}>
                    Arquivo: {procedure.fileName}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenPdf(procedure.file, procedure.fileName)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <FileText size={16} className="mr-1" />
                        Visualizar
                      </button>
                      
                      <button
                        onClick={() => handleDownloadPdf(procedure.file, procedure.fileName)}
                        className="flex items-center text-sm text-green-600 hover:text-green-800"
                      >
                        <Download size={16} className="mr-1" />
                        Baixar
                      </button>
                    </div>
                    
                    {isLoggedIn && (
                      <button
                        onClick={() => deleteProcedure(procedure.id)}
                        className="flex items-center text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcedureList;