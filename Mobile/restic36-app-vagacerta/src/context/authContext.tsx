import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';


interface User {
  id: string
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 // Recupera o usuário do AsyncStorage ao iniciar
 useEffect(() => {
  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@VagaCerta:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento inicial
    }
  };

  loadUser();
}, []);


// Salva o usuário no AsyncStorage ao logar
const login = async (userData: User) => {
  try {
    await AsyncStorage.setItem('@VagaCerta:user', JSON.stringify(userData));
    setUser(userData); // Atualiza o estado do usuário
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
  }
};


// Remove o usuário do AsyncStorage ao deslogar
const logout = async () => {
  await AsyncStorage.removeItem('@VagaCerta:user');
  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


//Verificação de dados salvos localmente
export const debugStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);
    console.log('Dados salvos no AsyncStorage:', allData);
  } catch (error) {
    console.error('Erro ao verificar AsyncStorage:', error);
  }
};

// Custom Hook para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
