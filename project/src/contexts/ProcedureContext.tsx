import React, { createContext, useState, useEffect, useContext } from 'react';
import { Procedure, Category } from '../types';
import { getProcedures, addProcedure, removeProcedure } from '../utils/localStorage';

interface ProcedureContextType {
  procedures: Procedure[];
  filteredProcedures: Procedure[];
  selectedCategory: Category | 'Todos';
  searchTerm: string;
  setSelectedCategory: (category: Category | 'Todos') => void;
  setSearchTerm: (term: string) => void;
  addNewProcedure: (procedure: Omit<Procedure, 'id' | 'dateAdded'>) => void;
  deleteProcedure: (id: string) => void;
}

const ProcedureContext = createContext<ProcedureContextType>({
  procedures: [],
  filteredProcedures: [],
  selectedCategory: 'Todos',
  searchTerm: '',
  setSelectedCategory: () => {},
  setSearchTerm: () => {},
  addNewProcedure: () => {},
  deleteProcedure: () => {},
});

export const useProcedures = () => useContext(ProcedureContext);

export const ProcedureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    const storedProcedures = getProcedures();
    setProcedures(storedProcedures);
  }, []);
  
  const filteredProcedures = procedures.filter(procedure => {
    const matchesCategory = selectedCategory === 'Todos' || procedure.category === selectedCategory;
    const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const addNewProcedure = (procedureData: Omit<Procedure, 'id' | 'dateAdded'>) => {
    const newProcedure: Procedure = {
      ...procedureData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    
    addProcedure(newProcedure);
    setProcedures(prev => [...prev, newProcedure]);
  };
  
  const deleteProcedure = (id: string) => {
    removeProcedure(id);
    setProcedures(prev => prev.filter(p => p.id !== id));
  };
  
  return (
    <ProcedureContext.Provider
      value={{
        procedures,
        filteredProcedures,
        selectedCategory,
        searchTerm,
        setSelectedCategory,
        setSearchTerm,
        addNewProcedure,
        deleteProcedure,
      }}
    >
      {children}
    </ProcedureContext.Provider>
  );
};