import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "layout/Layout";
import NotFoundView from "views/not-found/not-found";
import AppHomePage from "views/home/home-view/home-view";

export default function DefaultRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AppHomePage />} />
      </Route>

      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
