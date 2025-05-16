import { Procedure, User } from '../types';

// Auth utils
export const saveUser = (user: User): void => {
  localStorage.setItem('admin_user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export const setAuthenticated = (value: boolean): void => {
  if (value) {
    localStorage.setItem('auth_token', 'true');
  } else {
    localStorage.removeItem('auth_token');
  }
};

// Procedures utils
export const saveProcedures = (procedures: Procedure[]): void => {
  localStorage.setItem('procedures', JSON.stringify(procedures));
};

export const getProcedures = (): Procedure[] => {
  const procedures = localStorage.getItem('procedures');
  return procedures ? JSON.parse(procedures) : [];
};

export const addProcedure = (procedure: Procedure): void => {
  const procedures = getProcedures();
  procedures.push(procedure);
  saveProcedures(procedures);
};

export const removeProcedure = (id: string): void => {
  const procedures = getProcedures();
  const updatedProcedures = procedures.filter(p => p.id !== id);
  saveProcedures(updatedProcedures);
};

// Initialize with default admin if not exists
export const initializeAdmin = (): void => {
  if (!getUser()) {
    saveUser({
      username: 'admin',
      password: 'hospital123'
    });
  }
};