"use client"
import Image from "next/image";
import Link from "next/image";
import styles from "./page.module.css";
import './globals.css'
import { useEffect, useState } from "react";
import { Boton } from "./components/Boton/page";

export default function Home() {
  const urlApi = "https://countriesnow.space/api/v0.1/countries/flag/images";
  const [paises, setPaises] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [timerActivo, setTimerActivo] = useState(true);
  const [letrasReveladas, setLetrasReveladas] = useState([]);
   
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
      if(puntos != 0){
        setPuntos(puntos - 1);
      }
      setMensaje('Incorrecto.');
    }
    setInputValue('');
    setRandomIndex(Math.floor(Math.random() * paises.length));
    setTiempoRestante(15);
    setTimerActivo(true);
    setLetrasReveladas([]);
  };

  useEffect(() => {
    let timer;
    if(timerActivo){
      timer = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    }else if(tiempoRestante <= 0 && puntos != 0){
      timer = setInterval(() => {
        setPuntos((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  },[tiempoRestante, timerActivo]);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      setTimerActivo(false);
    }
  }, [tiempoRestante]);

  const revelarLetra = () => {
    if (paisRandom && tiempoRestante > 2) {
      const letrasSinRevelar = paisRandom.name.split('').filter((letra, index) => !letrasReveladas.includes(index));
      if (letrasSinRevelar.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * letrasSinRevelar.length);
        const nuevaLetraRevelada = paisRandom.name.indexOf(letrasSinRevelar[indiceAleatorio]);
        setLetrasReveladas([...letrasReveladas, nuevaLetraRevelada]);
        setTiempoRestante(tiempoRestante - 2);
      }
    }
  };
  
  const mostrarNombreConAyuda = () => {
    if (paisRandom) {
      return paisRandom.name.split('').map((letra, index) => (
        letrasReveladas.includes(index) ? letra : '_'
      )).join(' ');
    }
    return '';
  };
  

  return (
    <main>
      <div>
        {mensaje && (
          <p className={`${styles.mensaje} ${mensaje === '¡Correcto!' ? styles.mensajeCorrecto : styles.mensajeIncorrecto}`}>
            {mensaje}
          </p>
        )}
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>PUNTOS: {puntos}</h1>
          <h1 className= {styles.title}>ADIVINA EL PAIS!</h1>
          <h1 className= {styles.title}>TIEMPO: {tiempoRestante > 0 ? tiempoRestante : 0}</h1>
        </div>
        {paisRandom && (
          <>
            <div className={styles.imageContainer}>
              <Image src={paisRandom.flag} alt={paisRandom.name} width={500} height={300}/>
            </div>
            <h2 className={styles.title}>{mostrarNombreConAyuda()}</h2>
            <div className={styles.inputContainer}>
              <input className={styles.input}type="text" value={inputValue} onChange={handleInputChange} placeholder="Introduce el nombre del país"/>
            </div>
            <div className={styles.botonesContainer}>
              <Boton style={styles.boton} onClick={verificarRespuesta} label="VERIFICAR"/>
              <Boton style={styles.boton} onClick={revelarLetra} label="AYUDA"/>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
