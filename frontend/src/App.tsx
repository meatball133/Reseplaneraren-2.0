import logo from './logo.svg';
import './App.css';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RouteSearch } from './components/searchPage/routeSearch';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import { DetailedPage } from './components/detailedPage/detailedPage';

function App() {
  const [opened, { toggle }] = useDisclosure();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RouteSearch />}/>
              <Route path="/:id" element={<DetailedPage />} />
              </>
    )
  );
  

  return (
    <AppShell
    header={{ height: 70 }}
    padding="md"
  >
    <AppShell.Header>
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
      />
      <div>Logo</div>
    </AppShell.Header>

    <AppShell.Main>
      <RouterProvider router={router} />
      
      </AppShell.Main>
  </AppShell>
  );
}

export default App;
