import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Route } from './components/route';

function App() {
  const [opened, { toggle }] = useDisclosure();
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
      <Route />
      
      </AppShell.Main>
  </AppShell>
  );
}

export default App;
