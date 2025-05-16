import React from 'react';
import { Category, CATEGORIES } from '../types';

interface CategorySelectProps {
  selectedCategory: Category | 'Todos';
  onChange: (category: Category | 'Todos') => void;
  showAllOption?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  onChange,
  showAllOption = true
}) => {
  return (
    <div className="w-full md:w-60 -mt-6">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Categoria
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value as Category | 'Todos')}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 h-[42px]"
      >
        {showAllOption && <option value="Todos">Todos</option>}
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;