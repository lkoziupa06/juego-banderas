"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Boton } from "./components/Boton/page";

export default function Home() {
  const urlApi = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const [paises, setPaises] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState('');

  useEffect(()=>{
    const fetchPaises = async () => {
      try {
        const response = await fetch(urlApi);
        const data = await response.json();
        setPaises(data.data);
        if (data.data.length > 0) {
          setRandomIndex(Math.floor(Math.random() * data.data.length));
        }
      } catch (error) {
        console.error('Hubo un error: ', error);
      }
    };
    
    fetchPaises();
  }, [])

  const paisRandom = randomIndex !== null ? paises[randomIndex] : null;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const verificarRespuesta = () => {
    if (paisRandom && inputValue.toLowerCase() === paisRandom.name.toLowerCase()) {
      setPuntos(puntos + 10);
      setMensaje('¡Correcto!');
    } else {
      setPuntos(puntos - 1);
      setMensaje('Incorrecto. Intenta de nuevo.');
    }
    setInputValue('');
    setRandomIndex(Math.floor(Math.random() * paises.length));
  };

  return (
    <>
      <div>
        <h1>Adivina la bandera!</h1>
        {paisRandom && (
          <>
            <Image src={paisRandom.flag} alt={paisRandom.name} width={200} height={100}/>
            <div>
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange} 
              placeholder="Introduce el nombre del país" 
            />
            <Boton onClick={verificarRespuesta} label="Verificar"/>
            </div>
          </>
        )}
        <h2>Puntos: {puntos}</h2>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </>
  );
}
