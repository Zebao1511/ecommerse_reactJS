import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import '@styles/main.scss';
import MainLayout from '@components/Layout/Layout';

import Footer from '@components/Footer/Footer';
import HomePage from '@components/HomePage/HomePage';

function App() {
    return (
        <>
            <HomePage />
        </>
    );
}

export default App;
