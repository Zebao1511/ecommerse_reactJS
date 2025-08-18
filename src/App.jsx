import { Suspense, useState } from 'react';

import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routers from '@/routers/routers';

import SideBar from '@components/Sidebar/Sidebar';
import { SideBarProvider } from '@/contexts/SidebarProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import { StoreProvider } from '@/contexts/storeProvider';

function App() {
    return (
        <StoreProvider>
            <ToastProvider>
                <SideBarProvider>
                    <SideBar />

                    <BrowserRouter>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                {routers.map((item, index) => {
                                    return (
                                        <Route
                                            path={item.path}
                                            element={<item.component />}
                                            key={index}
                                        />
                                    );
                                })}
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </SideBarProvider>
            </ToastProvider>
        </StoreProvider>
    );
}

export default App;
