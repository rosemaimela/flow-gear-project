import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'layout/Layout';
import NotFoundView from 'views/not-found/not-found';
import AppHomePage from 'views/home/home-view';
import AppProductPage from 'views/product/product-view';
import AppManagementPage from 'views/management/management-view';

export default function DefaultRouter() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<AppHomePage />} />
                <Route path='/product' element={<AppProductPage />} />
                <Route path='/management' element={<AppManagementPage />} />
            </Route>

            <Route path='*' element={<NotFoundView />} />
        </Routes>
    );
}
