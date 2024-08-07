"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const urlApi = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const [paises, setPaises] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(()=>{
    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.data && data.data.length > 0) {
        setPaises(data.data);
        setRandomIndex(Math.floor(Math.random() * data.data.length));
      }
    })
    .catch(error => console.log('Hubo un error: ' + error))
  }, [])

  const randomCountry = paises[randomIndex];
  return (
    <>
      <div>
          <Image src={randomCountry.flag} alt={`Flag of ${randomCountry.name}`} width={50} height={30}/>
      </div>
    </>
  );
}
