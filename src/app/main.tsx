"use client";

import { useState } from "react";
import { api } from "./services/api";

interface Animal {
  id: number;
  name: string;
  species: string;
}

export function Main() {
  let [animals, setAnimals] = useState<Animal[]>([]);
  let [inputNameAdd, setInputNameAdd] = useState("");
  let [inputSpeciesAdd, setInputSpeciesAdd] = useState("");
  let [inputIdDelete, setInputIdDelete] = useState(0);
  let [inputIdPut, setInputIdPut] = useState(0);
  let [inputNamePut, setInputNamePut] = useState("");

  async function loadAnimals() {
    console.log("Carregando os animais");
    try {
      const response = await api.get("/animal");
      console.log(response.data);
      setAnimals(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddAnimal(nome: string, especie: string) {
    try {
      const response = await api.post("/animal", {
        nome: nome,
        especie: especie,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Animal adicionado com sucesso!");
    loadAnimals();
  }
  async function handleDeleteAnimal(animalId: number) {
    try {
      const response = await api.delete(`/animal/${animalId}`, {
        id: animalId,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Animal deletado com sucesso!");
    loadAnimals();
  }
  async function handleUpdateAnimal(animalId: number, newName: string) {
    try {
      const response = await api.put(`/animal/${animalId}`, {
        nome: newName,
      });
      loadAnimals();
    } catch (error) {
      console.log(error);
    }
    console.log("Animal atualizado com sucesso!");
  }
  return (
    <div className="flex flex-wrap bg-blue-800 text-blue-400">
      <div className="flex flex-col justify-between items-stretch bg-green-950 border rounded-md gap-5 text-gray-100 mx-20 my-10 pb-10 pt-5 px-4">
        <section className="flex flex-col justify-center items-center">
          <label>Carregar Animais</label>
          <button onClick={loadAnimals}>Confirmar</button>
        </section>
        <section className="flex flex-col justify-center items-center">
          <label>Adcionar novo Animal</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Nome do Animal"
            onChange={(e) => {
              setInputNameAdd(e.target.value);
            }}
            className="text-center"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Especie do Animal"
            onChange={(e) => {
              setInputSpeciesAdd(e.target.value);
            }}
            className="text-center"
          />
          <button
            onClick={() => {
              handleAddAnimal(inputNameAdd, inputSpeciesAdd);
            }}
          >
            Confirmar
          </button>
        </section>
        <section className="flex flex-col justify-center items-center">
          <label>Deletar Animal</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="id do Animal"
            onChange={(e) => {
              setInputIdDelete(Number(e.target.value));
            }}
            className="text-center"
          />
          <button
            onClick={() => {
              handleDeleteAnimal(inputIdDelete);
            }}
          >
            Confirmar
          </button>
        </section>
        <section className="flex flex-col justify-center items-center">
          <label>Modificar nome de Animal existente</label>
          <input
            type="number"
            onChange={(e) => setInputIdPut(Number(e.target.value))}
            placeholder="0"
            className="text-center"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Nome do Animal"
            onChange={(e) => setInputNamePut(e.target.value)}
            className="text-center"
          />
          <button onClick={() => handleUpdateAnimal(inputIdPut, inputNamePut)}>
            Confirmar
          </button>
        </section>
      </div>
      <div className="flex flex-col justify-start items-stretch bg-green-950 border rounded-md gap-5 text-gray-100 mx-20 my-10 pb-10 pt-5 px-4 text-green-200">
        <label>Animais</label>
        <ul className="py-4">
          {animals.map((item) => (
            <li key={item.id}>
              ID: {item.id} / NAME: {item.nome} / Especie : {item.especie}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
