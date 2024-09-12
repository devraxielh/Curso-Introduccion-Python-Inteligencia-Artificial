import React, { useState, useEffect } from 'react';
import { Slider, Button } from '@mui/material';
import { ArrowRight, RefreshCcw } from 'lucide-react';

const BuclesAnimacion = () => {
  const [forCount, setForCount] = useState(5);
  const [whileCount, setWhileCount] = useState(5);
  const [forProgress, setForProgress] = useState(0);
  const [whileProgress, setWhileProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let forInterval, whileInterval;
    if (isAnimating) {
      forInterval = setInterval(() => {
        setForProgress((prev) => (prev < forCount ? prev + 1 : prev));
      }, 1000);
      whileInterval = setInterval(() => {
        setWhileProgress((prev) => (prev < whileCount ? prev + 1 : prev));
      }, 1000);
    }
    return () => {
      clearInterval(forInterval);
      clearInterval(whileInterval);
    };
  }, [isAnimating, forCount, whileCount]);

  const resetAnimation = () => {
    setForProgress(0);
    setWhileProgress(0);
    setIsAnimating(false);
  };

  const forExample = `for i in range(${forCount}):
    print(f"Iteración {i + 1}")`;

  const whileExample = `i = 0
while i < ${whileCount}:
    print(f"Iteración {i + 1}")
    i += 1`;

  const generateOutput = (count, current) => {
    return Array.from({ length: current }, (_, i) => (
      <div key={i} className="text-sm font-mono">
        Iteración {i + 1}
      </div>
    ));
  };

  return (
    <div className="p-2">
      <p className='p-1 mb-3'>En Python, un bucle o ciclo es una estructura de control que permite ejecutar repetidamente un bloque de código mientras una condición específica se mantenga verdadera. Los bucles son muy útiles cuando necesitas realizar una misma tarea varias veces de manera automática, lo que evita tener que escribir el mismo código repetidamente.
</p>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Bucle For</h3>
        <p className="text-sm text-gray-600">
          En Python, el bucle "for" se utiliza comúnmente con la función range() para iterar sobre una secuencia de números.
        </p>
        <div className="flex items-center space-x-4">
          <span className="w-24">Iteraciones:</span>
          <Slider
            value={forCount}
            onChange={(e, value) => setForCount(value)}
            max={10}
            step={1}
            className="w-64"
          />
          <span>{forCount}</span>
        </div>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 flex items-center justify-end pr-2 text-white"
            style={{ width: `${(forProgress / forCount) * 100}%` }}
          >
            {forProgress}/{forCount}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Código:</h4>
            <pre className="bg-gray-100 p-2 rounded-md text-sm">
              <code>{forExample}</code>
            </pre>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Salida:</h4>
            <div className="bg-gray-100 p-2 rounded-md text-sm h-32 overflow-y-auto">
              {generateOutput(forCount, forProgress)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Bucle While</h3>
        <p className="text-sm text-gray-600">
          El bucle "while" en Python se ejecuta mientras una condición sea verdadera. Es útil cuando no se sabe exactamente cuántas iteraciones se necesitarán.
        </p>
        <div className="flex items-center space-x-4">
          <span className="w-24">Iteraciones:</span>
          <Slider
            value={whileCount}
            onChange={(e, value) => setWhileCount(value)}
            max={10}
            step={1}
            className="w-64"
          />
          <span>{whileCount}</span>
        </div>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 flex items-center justify-end pr-2 text-white"
            style={{ width: `${(whileProgress / whileCount) * 100}%` }}
          >
            {whileProgress}/{whileCount}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Código:</h4>
            <pre className="bg-gray-100 p-2 rounded-md text-sm">
              <code>{whileExample}</code>
            </pre>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Salida:</h4>
            <div className="bg-gray-100 p-2 rounded-md text-sm h-32 overflow-y-auto">
              {generateOutput(whileCount, whileProgress)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAnimating(!isAnimating)}
          className="flex items-center"
          startIcon={<ArrowRight />}
        >
          {isAnimating ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetAnimation}
          className="flex items-center"
          startIcon={<RefreshCcw />}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default BuclesAnimacion;