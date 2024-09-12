import React, { useState } from 'react';
import { AlertCircle, Code2, ListOrdered, Hash, Type, Box } from 'lucide-react';
import { Alert, AlertTitle } from '@mui/material';
const PythonSyntaxDemo = () => {
  const [integer, setInteger] = useState(42);
  const [float, setFloat] = useState(3.14);
  const [string, setString] = useState("Hola, Python!");
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [dictionary, setDictionary] = useState({ "nombre": "Python", "año": 1991 });

  const handleListChange = (index, value) => {
    const newList = [...list];
    newList[index] = Number(value);
    setList(newList);
  };

  const handleDictChange = (key, value) => {
    setDictionary({...dictionary, [key]: value});
  };

  const DataTypeCard = ({ title, icon, children, explanation, pythonCode }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <p className="mb-4 text-gray-600">{explanation}</p>
      {children}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Código Python:</h4>
        <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
          <code>{pythonCode}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="p-1 mb-2">

      <Alert variant="info" className="mb-6">
        <AlertTitle>Variable</AlertTitle>
        Una variable en programación es un espacio de memoria donde se almacena un valor que puede cambiar o ser reutilizado a lo largo de un programa. En otras palabras, una variable es un nombre simbólico que se utiliza para referirse a un dato o valor en el código.
      </Alert>

      <Alert variant="info" className="mb-6">
        <AlertTitle>Tipos de Datos en Python</AlertTitle>
        Python es un lenguaje de tipado dinámico, lo que significa que no necesitas declarar el tipo de una variable al crearla. El intérprete de Python infiere el tipo basándose en el valor asignado. Los tipos de datos básicos en Python incluyen enteros, flotantes, cadenas, listas y diccionarios, entre otros. Cada tipo tiene sus propias características y métodos asociados.
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataTypeCard 
          title="Enteros (int)" 
          icon={<Hash className="h-6 w-6" />}
          explanation="Los enteros son números sin parte decimal. Pueden ser positivos o negativos y no tienen límite de tamaño en Python 3."
          pythonCode={`# Definición y operaciones con enteros
numero = ${integer}
suma = numero + 10
multiplicacion = numero * 2
print(f"Número: {numero}")
print(f"Tipo: {type(numero).__name__}")
print(f"Suma: {suma}")
print(f"Multiplicación: {multiplicacion}")
`}
        >
          <input 
            type="number" 
            value={integer} 
            onChange={(e) => setInteger(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-2">Valor: <span className="font-mono bg-gray-200 px-1 rounded">{integer}</span></p>
          <p>Tipo: <span className="font-mono bg-gray-200 px-1 rounded">{typeof integer}</span></p>
        </DataTypeCard>

        <DataTypeCard 
          title="Flotantes (float)" 
          icon={<Code2 className="h-6 w-6" />}
          explanation="Los flotantes son números con parte decimal. Se utilizan para representar números reales en Python."
          pythonCode={`# Definición y operaciones con flotantes
numero = ${float}
suma = numero + 1.5
multiplicacion = numero * 2
print(f"Número: {numero}")
print(f"Tipo: {type(numero).__name__}")
print(f"Suma: {suma}")
print(f"Multiplicación: {multiplicacion}")
`}
        >
          <input 
            type="number" 
            step="0.01"
            value={float} 
            onChange={(e) => setFloat(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-2">Valor: <span className="font-mono bg-gray-200 px-1 rounded">{float}</span></p>
          <p>Tipo: <span className="font-mono bg-gray-200 px-1 rounded">{typeof float}</span></p>
        </DataTypeCard>

        <DataTypeCard 
          title="Cadenas (str)" 
          icon={<Type className="h-6 w-6" />}
          explanation="Las cadenas son secuencias de caracteres. En Python, pueden definirse con comillas simples o dobles."
          pythonCode={`# Definición y operaciones con cadenas
texto = "${string}"
mayusculas = texto.upper()
longitud = len(texto)
print(f"Texto: {texto}")
print(f"Tipo: {type(texto).__name__}")
print(f"En mayúsculas: {mayusculas}")
print(f"Longitud: {longitud}")
`}
        >
          <input 
            type="text" 
            value={string} 
            onChange={(e) => setString(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-2">Valor: <span className="font-mono bg-gray-200 px-1 rounded">"{string}"</span></p>
          <p>Tipo: <span className="font-mono bg-gray-200 px-1 rounded">{typeof string}</span></p>
        </DataTypeCard>

        <DataTypeCard 
          title="Listas (list)" 
          icon={<ListOrdered className="h-6 w-6" />}
          explanation="Las listas son colecciones ordenadas y mutables de elementos. Pueden contener elementos de diferentes tipos."
          pythonCode={`# Definición y operaciones con listas
numeros = ${JSON.stringify(list)}
numeros.append(6)
suma = sum(numeros)
print(f"Lista: {numeros}")
print(f"Tipo: {type(numeros).__name__}")
print(f"Suma de elementos: {suma}")
print(f"Primer elemento: {numeros[0]}")
`}
        >
          <div className="flex flex-wrap -mx-2">
            {list.map((item, index) => (
              <input 
                key={index}
                type="number" 
                value={item} 
                onChange={(e) => handleListChange(index, e.target.value)}
                className="w-1/5 p-2 m-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <p className="mt-2">Lista: <span className="font-mono bg-gray-200 px-1 rounded">[{list.join(', ')}]</span></p>
        </DataTypeCard>

        <DataTypeCard 
          title="Diccionarios (dict)" 
          icon={<Box className="h-6 w-6" />}
          explanation="Los diccionarios son colecciones de pares clave-valor. Son mutables y no ordenados en Python < 3.7."
          pythonCode={`# Definición y operaciones con diccionarios
info = ${JSON.stringify(dictionary)}
info["creador"] = "Guido van Rossum"
print(f"Diccionario: {info}")
print(f"Tipo: {type(info).__name__}")
print(f"Nombre: {info['nombre']}")
print(f"Año: {info['año']}")
`}
        >
          {Object.entries(dictionary).map(([key, value]) => (
            <div key={key} className="flex mb-2">
              <input 
                type="text" 
                value={key} 
                readOnly
                className="w-1/2 p-2 border border-gray-300 rounded-l bg-gray-100"
              />
              <input 
                type="text" 
                value={value} 
                onChange={(e) => handleDictChange(key, e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <p className="mt-2">Diccionario: <span className="font-mono bg-gray-200 px-1 rounded">{JSON.stringify(dictionary)}</span></p>
        </DataTypeCard>
      </div>
    </div>
  );
};

export default PythonSyntaxDemo;