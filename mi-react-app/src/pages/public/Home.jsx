import React from "react";
import Carousel from "../../components/public/Carousel";
import Navbar from "../../components/public/Navbar";
import Features from "../../components/public/Features";
import Recognitions from "../../components/public/Recognitions";
import ValueProps from "../../components/public/ValueProps";
import Footer from "../../components/public/Footer";
import Quality from "../../components/public/Quality";
import Whatsapp from "../../components/public/Whatsapp";
import Copyright from "../../components/public/Copyright";

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
