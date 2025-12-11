import AppProviders from 'presentation/contexts/providers/AppProviders';
import AppRouter from 'presentation/routes/AppRouter';

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

export default App;
