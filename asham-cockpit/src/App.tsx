import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { BrandProvider } from './providers/BrandProvider';

const Providers = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AppRouter />;
  }

  return (
    <BrandProvider>
      <AppRouter />
    </BrandProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Providers />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
