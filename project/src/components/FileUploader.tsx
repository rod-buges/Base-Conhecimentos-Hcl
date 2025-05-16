import React, { useState } from 'react';
import { useProcedures } from '../contexts/ProcedureContext';
import { Category, CATEGORIES } from '../types';
import { Upload, FileType, X } from 'lucide-react';

const FileUploader: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addNewProcedure } = useProcedures();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type !== 'application/pdf') {
        setError('Por favor, selecione apenas arquivos PDF.');
        setFile(null);
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('O arquivo é muito grande. Tamanho máximo: 10MB.');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name.trim()) {
      setError('Por favor, insira um nome para o procedimento.');
      return;
    }
    
    if (!file) {
      setError('Por favor, selecione um arquivo PDF.');
      return;
    }
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        
        // Add new procedure
        addNewProcedure({
          name: name.trim(),
          category,
          file: base64String,
          fileName: file.name
        });
        
        // Reset form
        setName('');
        setCategory(CATEGORIES[0]);
        setFile(null);
        setSuccess('Procedimento adicionado com sucesso!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      };
      
      reader.onerror = () => {
        setError('Erro ao processar o arquivo. Tente novamente.');
      };
    } catch (err) {
      setError('Ocorreu um erro ao adicionar o procedimento.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Novo Procedimento</h2>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Procedimento
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Ex: Configuração de Rede"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arquivo PDF
          </label>
          
          {!file ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-400 focus-within:outline-none"
                  >
                    <span>Selecionar arquivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-gray-500">Apenas arquivos PDF até 10MB</p>
              </div>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between p-4 border border-gray-300 rounded-md bg-gray-50">
              <div className="flex items-center">
                <FileType className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={clearFile}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
        >
          <Upload size={18} className="mr-2" />
          Adicionar Procedimento
        </button>
      </form>
    </div>
  );
};

export default FileUploader;