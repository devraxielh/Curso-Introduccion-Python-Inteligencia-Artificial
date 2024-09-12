import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertTitle } from '@mui/material';

const CondicionalesInteractivos = () => {
  const [edad, setEdad] = useState(18);
  const [tienePermiso, setTienePermiso] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const puedeConducir = () => {
    if (edad >= 18) {
      return "Sí, puedes conducir";
    } else if (edad >= 16 && tienePermiso) {
      return "Puedes conducir con permiso";
    } else {
      return "No puedes conducir";
    }
  };

  const mensajeResultado = puedeConducir();

  const alertVariant = () => {
    if (mensajeResultado === "Sí, puedes conducir") {
      return { icon: CheckCircle, variant: "default" };
    } else if (mensajeResultado === "Puedes conducir con permiso") {
      return { icon: AlertCircle, variant: "warning" };
    } else {
      return { icon: XCircle, variant: "destructive" };
    }
  };

  const { icon: AlertIcon, variant } = alertVariant();

  useEffect(() => {
    const animationSequence = () => {
      setAnimationStep(0);
      const timer1 = setTimeout(() => setAnimationStep(1), 500);
      const timer2 = setTimeout(() => setAnimationStep(2), 1000);
      const timer3 = setTimeout(() => setAnimationStep(3), 1500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    };
    const cleanup = animationSequence();
    return cleanup;
  }, [edad, tienePermiso]);

  const AnimatedDiagram = () => {
    const getColor = (step) => animationStep >= step ? 'text-blue-500' : 'text-gray-400';
    const getBackground = (step) => animationStep === step ? 'bg-yellow-200' : '';

    return (
      <div className="mt-4 p-4 border rounded-lg">
        <div className={`mb-2 p-2 rounded ${getBackground(1)}`}>
          <span className={getColor(1)}>if (edad >= 18)</span>
        </div>
        <div className={`mb-2 ml-4 p-2 rounded ${getBackground(2)}`}>
          <span className={getColor(2)}>else if (edad >= 16 && tienePermiso)</span>
        </div>
        <div className={`mb-2 ml-4 p-2 rounded ${getBackground(3)}`}>
          <span className={getColor(3)}>else</span>
        </div>
      </div>
    );
  };

  const explicacionCondicionales = () => {
    if (edad >= 18) {
      return (
        <p>
          En este caso, se ejecuta el primer bloque <code>if (edad >= 18)</code> porque la edad es mayor o igual a 18.
          Las demás condiciones no se evalúan.
        </p>
      );
    } else if (edad >= 16 && tienePermiso) {
      return (
        <p>
          Aquí, el primer <code>if</code> es falso, por lo que se evalúa el <code>else if (edad >= 16 && tienePermiso)</code>.
          Como ambas condiciones son verdaderas (edad entre 16 y 17, y tiene permiso), se ejecuta este bloque.
        </p>
      );
    } else {
      return (
        <p>
          En este caso, ninguna de las condiciones anteriores es verdadera, por lo que se ejecuta el bloque <code>else</code>.
          Este bloque se ejecuta cuando todas las condiciones anteriores son falsas.
        </p>
      );
    }
  };

  return (
    <div>
      <p className='p-1 mb-3'>Los condicionales en Python son estructuras de control que permiten que un programa tome decisiones en función de ciertas condiciones. Es decir, los condicionales permiten ejecutar diferentes bloques de código dependiendo de si una condición se cumple (es verdadera) o no (es falsa).</p>
      <div className="mb-4">
        <label className="block mb-2">
          Edad: {edad}
          <input
            type="range"
            min="0"
            max="30"
            value={edad}
            onChange={(e) => setEdad(parseInt(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={tienePermiso}
            onChange={() => setTienePermiso(!tienePermiso)}
            className="mr-2"
          />
          Tiene permiso de conducir
        </label>
      </div>
    
        <AlertIcon className="h-4 w-4" />
        <AlertTitle>Resultado</AlertTitle>
        {mensajeResultado}

      <AnimatedDiagram />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Explicación del código:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {`if (edad >= 18) {
  return "Sí, puedes conducir";
} else if (edad >= 16 && tienePermiso) {
  return "Puedes conducir con permiso";
} else {
  return "No puedes conducir";
}`}
        </pre>
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Explicación:</h3>
          {explicacionCondicionales()}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">¿Cómo funcionan los condicionales?</h2>
        <ul className="list-disc pl-5">
          <li><strong>if:</strong> Evalúa una condición. Si es verdadera, ejecuta el código dentro del bloque.</li>
          <li><strong>else if:</strong> Se evalúa solo si el <code>if</code> anterior es falso. Permite comprobar múltiples condiciones.</li>
          <li><strong>else:</strong> Se ejecuta cuando todas las condiciones anteriores son falsas.</li>
          <li>Las condiciones se evalúan en orden, de arriba a abajo.</li>
          <li>Solo se ejecuta un bloque de código, el primero que cumpla la condición.</li>
        </ul>
      </div>
    </div>
  );
};

export default CondicionalesInteractivos;
