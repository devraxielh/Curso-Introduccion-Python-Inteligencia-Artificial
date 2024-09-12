import React, { useState } from 'react';
import { Slider, Box, Typography, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { Add as Plus, Remove as Minus, Close as X, ClearAll as Divide, Check, ChevronRight, ChevronLeft, ExpandMore } from '@mui/icons-material';

const OperadoresInteractivos = () => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [showPython, setShowPython] = useState(false);

  const operadoresAritmeticos = [
    { simbolo: <Plus />, operacion: (a, b) => a + b, nombre: 'Suma', python: 'a + b' },
    { simbolo: <Minus />, operacion: (a, b) => a - b, nombre: 'Resta', python: 'a - b' },
    { simbolo: <X />, operacion: (a, b) => a * b, nombre: 'Multiplicación', python: 'a * b' },
    { simbolo: <Divide />, operacion: (a, b) => b !== 0 ? (a / b).toFixed(2) : 'Error', nombre: 'División', python: 'a / b' },
    { simbolo: '%', operacion: (a, b) => b !== 0 ? a % b : 'Error', nombre: 'Módulo', python: 'a % b' },
    { simbolo: '**', operacion: (a, b) => Math.pow(a, b), nombre: 'Exponente', python: 'a ** b' },
  ];

  const operadoresComparacion = [
    { simbolo: <ChevronRight />, operacion: (a, b) => a > b, nombre: 'Mayor que', python: 'a > b' },
    { simbolo: <ChevronLeft />, operacion: (a, b) => a < b, nombre: 'Menor que', python: 'a < b' },
    { simbolo: '>=', operacion: (a, b) => a >= b, nombre: 'Mayor o Igual', python: 'a >= b' },
    { simbolo: '<=', operacion: (a, b) => a <= b, nombre: 'Menor o Igual', python: 'a <= b' },
    { simbolo: '==', operacion: (a, b) => a === b, nombre: 'Igual', python: 'a == b' },
    { simbolo: '!=', operacion: (a, b) => a !== b, nombre: 'Diferente', python: 'a != b' },
  ];

  const pythonExplanation = `
# Operadores en Python

# Aritméticos
a, b = ${num1}, ${num2}
print(f"Suma: {a + b}")
print(f"Resta: {a - b}")
print(f"Multiplicación: {a * b}")
print(f"División: ${num2 !== 0 ? num1 / num2 : 'Error'}")
print(f"Módulo: ${num2 !== 0 ? num1 % num2 : 'Error'}")
print(f"Exponente: {Math.pow(num1, num2)}")

# Comparación
print(f"Mayor que: {a > b}")
print(f"Menor que: {a < b}")
print(f"Mayor o Igual: {a >= b}")
print(f"Menor o Igual: {a <= b}")
print(f"Igual: {a == b}")
print(f"Diferente: {a != b}")
`;

  return (
    <Box>
      <div className='p-1 mb-3'>En Python, los operadores son símbolos o palabras clave que se utilizan para realizar operaciones en valores y variables. Python soporta varios tipos de operadores que permiten manipular datos de diversas maneras. </div>
      <Box className="flex justify-between mb-6">
        <Box>
          <Typography variant="subtitle1">Número 1</Typography>
          <Slider
            value={num1}
            onChange={(e, value) => setNum1(value)}
            min={0}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            className="w-48"
          />
        </Box>
        <Box>
          <Typography variant="subtitle1">Número 2</Typography>
          <Slider
            value={num2}
            onChange={(e, value) => setNum2(value)}
            min={0}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            className="w-48"
          />
        </Box>
      </Box>

      {/* Operadores Aritméticos */}
      <Card className="mb-6 shadow-lg">
        <CardHeader title="Operadores Aritméticos" />
        <CardContent>
          {operadoresAritmeticos.map((op, index) => (
            <Box key={index} className="flex items-center justify-between mb-2">
              <Typography>{num1} {op.simbolo} {num2} = {op.operacion(num1, num2)}</Typography>
              <Typography variant="caption" className="italic">({op.nombre})</Typography>
              {showPython && <Typography variant="caption">Python: {op.python}</Typography>}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Operadores de Comparación */}
      <Card className="mb-6 shadow-lg">
        <CardHeader title="Operadores de Comparación" />
        <CardContent>
          {operadoresComparacion.map((op, index) => (
            <Box key={index} className="flex items-center justify-between mb-2">
              <Typography>{num1} {op.simbolo} {num2} = {op.operacion(num1, num2) ? <Check /> : 'X'}</Typography>
              <Typography variant="caption" className="italic">({op.nombre})</Typography>
              {showPython && <Typography variant="caption">Python: {op.python}</Typography>}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Python Code Toggle Button */}
      <button
        onClick={() => setShowPython(!showPython)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {showPython ? 'Ocultar Python' : 'Mostrar Python'}
      </button>

      {showPython && (
        <Card className="mt-6 shadow-lg">
          <CardHeader title="Explicación en Python" />
          <CardContent>
            <pre className="bg-gray-200 p-4 rounded-lg overflow-x-auto">
              {pythonExplanation}
            </pre>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default OperadoresInteractivos;