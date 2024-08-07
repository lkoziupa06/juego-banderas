"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const urlApi = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const [paises, setPaises] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);

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

  return (
    <>

    </>
  );
}
