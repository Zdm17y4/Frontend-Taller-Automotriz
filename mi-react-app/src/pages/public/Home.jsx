import React from "react";
import Carousel from "../../Carousel";
import Navbar from "../../Navbar";
import Features from "../../Features";
import Recognitions from "../../Recognitions";
import ValueProps from "../../ValueProps";
import Footer from "../../Footer";
import Quality from "../../Quality";
import Whatsapp from "../../Whatsapp";
import Copyright from "../../Copyright";

import lamboUrus from '../../assets/images/lamboUrus.png'
import calidad from '../../assets/images/calidad.png'
import mecanico from '../../assets/images/mecanico.png'

const Home = () => {
  const carouselItems = [
    {
      image: calidad,
      title: "Servicio de Planchado y Pintura",
      subtitle: "Calidad profesional"
    },
    {
      image: lamboUrus,
      title: "Electromovilidad",
      subtitle: "Vehículos del futuro"
    },
    {
      image: mecanico,
      title: "Mecánica Especializada",
      subtitle: "Diagnóstico preciso"
    },
  ];

  return (
    <>
      <div>
        <Navbar />
        <Carousel items={carouselItems} />
        <Features />
        <Recognitions />
        <ValueProps />
        <Quality />
        <Footer />
        <Copyright />
      </div>
      <Whatsapp />
    </>
  );
};

export default Home;
