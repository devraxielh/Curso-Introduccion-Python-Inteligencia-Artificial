import React, { useState } from 'react';
import { Laptop, Package, FolderPlus, PlayCircle, Terminal, Check } from 'lucide-react';

const VirtualEnvAnimation = () => {
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState('mi_proyecto');
  const [packages, setPackages] = useState(['numpy', 'pandas', 'matplotlib']);

  const steps = [
    {
      title: 'Instalar virtualenv',
      icon: <Package />,
      command: 'pip install virtualenv',
      explanation: 'virtualenv es una herramienta que crea un entorno Python aislado. Este paso instala virtualenv en tu sistema, permitiéndote crear entornos virtuales.'
    },
    {
      title: 'Crear entorno virtual',
      icon: <FolderPlus />,
      command: `python -m venv ${projectName}_env`,
      explanation: 'Este comando crea un nuevo entorno virtual con el nombre especificado. Genera una estructura de directorios que contiene una copia independiente de Python.'
    },
    {
      title: 'Activar entorno virtual',
      icon: <PlayCircle />,
      command: `source ${projectName}_env/bin/activate`,
      explanation: 'Activar el entorno virtual modifica tu PATH para que Python y pip se refieran a la versión en el entorno virtual, aislando tu proyecto de otros entornos Python en tu sistema.'
    },
    {
      title: 'Instalar paquetes',
      icon: <Terminal />,
      command: `pip install ${packages.join(' ')}`,
      explanation: 'Una vez activado el entorno virtual, puedes instalar paquetes específicos para tu proyecto. Estos se instalarán solo en este entorno, sin afectar a tu instalación global de Python.'
    },
    {
      title: '¡Configuración completada!',
      icon: <Check />,
      command: '',
      explanation: '¡Felicitaciones! Has configurado con éxito tu entorno virtual. Ahora tienes un espacio aislado para tu proyecto Python con los paquetes que necesitas.'
    }
  ];

  return (
    <div>
      <p className="mb-4">Un entorno virtual en Python es una herramienta que permite crear un espacio aislado dentro de tu sistema donde puedes instalar paquetes y bibliotecas de Python de manera independiente a los instalados de forma global en tu sistema operativo. Esto es útil para evitar conflictos de versiones entre proyectos y mantener cada uno con sus dependencias bien organizadas.</p>
      <div className="mb-4">
        <label className="block mb-2">Nombre del Proyecto (puedes cambiarlo):</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Paquetes a instalar (puedes agregar más, separados por coma):</label>
        <input
          type="text"
          value={packages.join(', ')}
          onChange={(e) => setPackages(e.target.value.split(',').map(pkg => pkg.trim()))}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex items-center mb-4">
        <Laptop className="text-blue-500 mr-2" />
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(step + 1) / steps.length * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">{steps[step].title}</h3>
        <div className="flex items-center mb-2">
          {steps[step].icon}
          {steps[step].command && <code className="ml-2 bg-black text-white p-2 rounded">{steps[step].command}</code>}
        </div>
        <p className="text-sm text-gray-700">{steps[step].explanation}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default VirtualEnvAnimation;
