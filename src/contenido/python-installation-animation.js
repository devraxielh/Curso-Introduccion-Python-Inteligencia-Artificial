import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Check, X } from 'lucide-react';

const InstallationStep = ({ title, description, icon: Icon, isCompleted, onClick, isActive, instructions }) => (
  <div className="mb-6 transform transition-all duration-300 hover:scale-102">
    <div 
      className={`flex items-center p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
        isCompleted ? 'bg-green-50 border-green-200' : 
        isActive ? 'bg-blue-50 border-blue-200' : 
        'bg-gray-50 border-gray-200 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-full mr-4 ${
        isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-400'
      }`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className="flex-grow">
        <h3 className={`font-bold text-lg ${isCompleted || isActive ? 'text-gray-800' : 'text-gray-600'}`}>{title}</h3>
        <p className={`text-sm ${isCompleted || isActive ? 'text-gray-700' : 'text-gray-500'}`}>{description}</p>
      </div>
      {isCompleted ? (
        <Check className="ml-auto text-green-500" size={24} />
      ) : isActive ? (
        <div className="ml-auto w-6 h-6 rounded-full bg-blue-500 animate-pulse" />
      ) : (
        <X className="ml-auto text-gray-400" size={24} />
      )}
    </div>
    {isActive && (
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 text-gray-700">
        <h4 className="font-bold mb-2">Instrucciones:</h4>
        <ol className="list-decimal pl-5">
          {instructions.map((instruction, idx) => (
            <li key={idx} className="mb-1">{instruction}</li>
          ))}
        </ol>
      </div>
    )}
  </div>
);

const PythonInstallationAnimation = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const steps = [
    {
      title: "Descargar Anaconda",
      description: "Obtén el instalador para tu sistema operativo",
      icon: Download,
      instructions: [
        "Ve a la página oficial de Anaconda: https://www.anaconda.com/products/distribution",
        "Selecciona tu sistema operativo (Windows, macOS, o Linux)",
        "Haz clic en el botón de descarga para la versión más reciente",
        "Espera a que se complete la descarga"
      ]
    },
    {
      title: "Instalar Anaconda",
      description: "Ejecuta el instalador y sigue las instrucciones",
      icon: ArrowRight,
      instructions: [
        "Localiza el archivo descargado y haz doble clic para ejecutarlo",
        "Sigue las instrucciones del instalador",
        "Cuando se te pregunte, elige 'Instalar para mí' a menos que necesites acceso multiusuario",
        "Selecciona la opción para agregar Anaconda a tu PATH si se te pregunta",
        "Espera a que la instalación se complete"
      ]
    },
    {
      title: "Verificar instalación",
      description: "Abre una terminal y ejecuta 'python --version'",
      icon: Check,
      instructions: [
        "Abre una nueva ventana de terminal o símbolo del sistema",
        "Escribe 'python --version' y presiona Enter",
        "Deberías ver la versión de Python instalada (por ejemplo, 'Python 3.9.7')",
        "Si ves un error, cierra la terminal, ábrela de nuevo e intenta otra vez"
      ]
    },
    {
      title: "Lanzar Jupyter Notebook",
      description: "Ejecuta 'jupyter notebook' en la terminal",
      icon: ArrowRight,
      instructions: [
        "En la misma terminal, escribe 'jupyter notebook' y presiona Enter",
        "Espera unos momentos mientras se inicia el servidor de Jupyter",
        "Se abrirá automáticamente una ventana del navegador con Jupyter Notebook",
        "Si no se abre automáticamente, copia la URL que aparece en la terminal y pégala en tu navegador"
      ]
    }
  ];

  useEffect(() => {
    if (completedSteps.length === steps.length) {
      setShowCongratulations(true);
    } else {
      setShowCongratulations(false);
    }
  }, [completedSteps]);

  const toggleStep = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
    setActiveStep(index);
  };

  return (
    <div>
      {steps.map((step, index) => (
        <InstallationStep
          key={index}
          {...step}
          isCompleted={completedSteps.includes(index)}
          isActive={activeStep === index}
          onClick={() => toggleStep(index)}
        />
      ))}
      {showCongratulations && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center animate-bounce">
          <h3 className="text-2xl font-bold text-green-800 mb-2">¡Felicitaciones!</h3>
          <p className="text-green-700">Has completado con éxito la instalación de Python y las herramientas necesarias.</p>
        </div>
      )}
    </div>
  );
};

export default PythonInstallationAnimation;
