import React from "react";

const AboutPage = ({ onBack }) => (
  <div className="about-page">
    <h2>Sobre mí</h2>
    <p>
      Hola, soy <strong>Kerosh dev</strong>, desarrollador de software apasionado por crear aplicaciones web modernas y funcionales.
    </p>
    <p>
      Puedes contactarme en: <a href="mailto:kerosh.dev@email.com">kerosh.dev@email.com</a>
    </p>
    <button onClick={onBack}>Volver</button>
  </div>
);

export default AboutPage;