"use client";

import { useState } from "react";
import { api } from "./services/api";
import { Main } from "./main";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Animal {
  id: number;
  name: string;
  species: string;
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-200 overflow-hidden">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </main>
  );
}
