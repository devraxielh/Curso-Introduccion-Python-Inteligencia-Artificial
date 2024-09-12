import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button } from '@mui/material';

const PythonFunctionAnimation = () => {
  const [functionName, setFunctionName] = useState('saludar');
  const [parameter, setParameter] = useState('Mundo');
  const [result, setResult] = useState('');
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const updateFunction = () => {
    setStep(0);
    setResult('');
  };

  const executeStep = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setResult(`¡Hola, ${parameter}!`);
      setStep(2);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="">
      <div className="mb-2">
        <div>
          <div className="mb-4">
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="text-lg font-semibold mb-2 ">¿Qué es una función en Python?</h3>
                <p className="text-gray-700">
                  Una función en Python es un bloque de código reutilizable que realiza una tarea específica. Las funciones tienen varias características importantes:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li><code className="bg-gray-200 px-1 py-0.5 rounded">def</code> se utiliza para definir funciones.</li>
                  <li>Pueden tomar parámetros (datos de entrada).</li>
                  <li>Pueden devolver un resultado usando <code className="bg-gray-200 px-1 py-0.5 rounded">return</code>.</li>
                  <li>Ayudan a organizar y modularizar el código.</li>
                  <li>Permiten la reutilización de código, evitando repeticiones.</li>
                </ul>
              </div>
  
          </div>
          
          <div className="mb-4">
            {/* Campo de entrada para el nombre de la función */}
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="functionName">
                Nombre de la función
              </label>
              <input
                id="functionName"
                type="text"
                placeholder="Nombre de la función"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Campo de entrada para el parámetro */}
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parameter">
                Parámetro
              </label>
              <input
                id="parameter"
                type="text"
                placeholder="Parámetro"
                value={parameter}
                onChange={(e) => setParameter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Button
              variant="contained"
              color="secondary"
              onClick={updateFunction}
            >
              Actualizar Función
            </Button>
          </div>

          <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              {`def ${functionName}(nombre):
    return f"¡Hola, {nombre}!"

# Llamada a la función
resultado = ${functionName}("${parameter}")
print(resultado)`}
            </pre>
          </div>
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={executeStep}
              disabled={step === 2}
            >
              {step === 0 ? 'Iniciar Ejecución' : 'Siguiente Paso'}
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Paso actual: <span className="font-semibold">{step + 1}/3</span></p>
            {step >= 1 && (
              <p className="text-gray-700">
                Llamando a la función: <span className="font-mono font-bold">{functionName}("{parameter}")</span>
              </p>
            )}
            {step === 2 && (
              <p className="text-gray-700">
                <span className="font-bold text-green-600">Resultado:</span> <span className="font-mono bg-green-100 px-2 py-1 rounded">{result}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonFunctionAnimation;