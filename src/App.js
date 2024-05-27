import logo from './logo.svg';
import './App.css';
import AddUsers from './components/AddUsers/AddUsers.tsx';
import ViewUser from './components/ViewUsers/ViewUser.tsx';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <AddUsers />
        <ViewUser />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
