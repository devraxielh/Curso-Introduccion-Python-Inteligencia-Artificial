import React, { useState } from 'react';
import Home  from './Home';
import About from './About';
import Evaluation from './Evaluation';
import Temas from './Temas';
import MainLayout from './MainLayout';
import config from './jsons/config.json';

const HomeApp = () => {
  const renderHome= () => <Home />;
  const renderAcercaDe = () => <About />;
  const renderEvaluacion = () => <Evaluation />;
  const renderTemas = () => <Temas />;
  const [activeSection, setActiveSection] = useState('inicio');
  const renderContent = () => {
    switch(activeSection) {
      case 'Presentación': return renderHome();
      case 'Temas': return renderTemas();
      case 'Evaluación': return renderEvaluacion();
      case 'acerca de': return renderAcercaDe();
      default: return renderHome();
    }
  };

  return (
    <MainLayout
      appName={config.appName}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      renderContent={renderContent}
    />
  );
};

export default HomeApp;
