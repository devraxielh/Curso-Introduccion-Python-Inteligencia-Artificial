import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const ExceptionHandlingAnimation = () => {
  const [step, setStep] = useState(0);
  const [exceptionType, setExceptionType] = useState('ZeroDivisionError');
  const [showExplanation, setShowExplanation] = useState(false);

  const steps = [
    { text: 'Inicio del programa', color: 'bg-green-500' },
    { text: 'try:', color: 'bg-blue-500' },
    { text: '    # Código que puede generar una excepción', color: 'bg-blue-300' },
    { text: 'except ' + exceptionType + ':', color: 'bg-yellow-500' },
    { text: '    # Manejo de la excepción', color: 'bg-yellow-300' },
    { text: 'else:', color: 'bg-green-300' },
    { text: '    # Se ejecuta si no hay excepción', color: 'bg-green-200' },
    { text: 'finally:', color: 'bg-purple-500' },
    { text: '    # Se ejecuta siempre', color: 'bg-purple-300' },
    { text: 'Fin del programa', color: 'bg-red-500' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const resetAnimation = () => {
    setStep(0);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="p-2">
      <p className='p-2'>El manejo de excepciones en Python es una técnica que permite gestionar y controlar los errores que ocurren durante la ejecución de un programa. En lugar de que el programa falle completamente y se detenga, Python permite capturar estos errores y tomar medidas correctivas o mostrar mensajes personalizados. Esto mejora la robustez del código y evita interrupciones inesperadas.</p>
      <div className="mb-4">
        <label className="mr-2">Tipo de excepción:</label>
        <select 
          value={exceptionType} 
          onChange={(e) => setExceptionType(e.target.value)}
          className="border rounded p-1"
        >
          <option value="ZeroDivisionError">ZeroDivisionError</option>
          <option value="ValueError">ValueError</option>
          <option value="TypeError">TypeError</option>
        </select>
      </div>
      <div className="space-y-2">
        {steps.map((s, index) => (
          <div 
            key={index} 
            className={`p-2 rounded transition-all duration-300 flex items-center ${
              index === step ? s.color + ' transform scale-105' : 'bg-gray-300'
            }`}
          >
            {index === step && <ArrowRight className="mr-2" />}
            <span>{s.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-2">
        <button 
          onClick={resetAnimation} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reiniciar Animación
        </button>
        <button 
          onClick={toggleExplanation} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showExplanation ? 'Ocultar' : 'Mostrar'} Explicación
        </button>
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Explicación:</h3>
          <ul className="list-disc list-inside">
            <li><strong>try:</strong> Aquí se coloca el código que puede generar una excepción.</li>
            <li><strong>except {exceptionType}:</strong> Se ejecuta si ocurre la excepción especificada.</li>
            <li><strong>else:</strong> Se ejecuta si no ocurre ninguna excepción en el bloque try.</li>
            <li><strong>finally:</strong> Se ejecuta siempre, haya ocurrido una excepción o no.</li>
          </ul>
          <p className="mt-2">
            <AlertTriangle className="inline mr-2 text-yellow-600" />
            El manejo de excepciones permite que tu programa continúe ejecutándose incluso cuando ocurren errores.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExceptionHandlingAnimation;
