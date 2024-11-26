import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import AnimalOverview from "./pages/AnimalOverview";
import NavBar from "./pages/NavBar";
import { Route, Routes } from "react-router-dom";
import { AnimalDetail } from "./pages/AnimalDetail";
import NavTest from "./pages/NavTest";
import Organization from "./pages/Organization";
import Sport from "./pages/Sport";
import FullFeaturedCrudGrid from "./pages/Temp";
import CustomColumnFullExample from "./complexTable_Delete/CustomColumnFullExample";
import Title from "./pages/Title";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        {/* <NavTest /> */}
        <Routes>
          <Route path="/" Component={AnimalOverview} />
          <Route path="/AnimalDetail/:id" Component={AnimalDetail} />
          <Route path="/Organization" Component={Organization} />
          <Route path="/Sport" Component={Sport} />
          <Route path="/Title" Component={Title} />
          <Route path="/Example" Component={CustomColumnFullExample} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
