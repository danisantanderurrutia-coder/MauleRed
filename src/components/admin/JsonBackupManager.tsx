import React, { useState, useRef } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  FileJson, 
  ShieldCheck, 
  HardDrive
} from 'lucide-react';

export const JsonBackupManager: React.FC = () => {
  const { 
    exportBackupJson, 
    importBackupJson, 
    resetToDefaults, 
    articles, 
    emergencies, 
    pizarra, 
    moderationItems 
  } = useAppData();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importBackupJson(content);
        if (result.success) {
          setFeedback({ type: 'success', message: result.message });
        } else {
          setFeedback({ type: 'error', message: result.message });
        }
      }
    };

    reader.onerror = () => {
      setFeedback({ type: 'error', message: 'No se pudo leer el archivo de respaldo seleccionado.' });
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar todos los datos a las semillas iniciales del Maule Sur? Se limpiará la memoria local.')) {
      resetToDefaults();
      setFeedback({ type: 'success', message: 'Plataforma restaurada a los datos semilla iniciales.' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c22] p-5 rounded-2xl border border-gray-800">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider">
            Soberanía de Datos & Resguardo Comunitario
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Sistema de Respaldo y Restauración JSON
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Exporta e importa la totalidad de la base de datos comunitaria en un archivo .json estándar portátil.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#222831] px-3 py-1.5 rounded-xl border border-gray-700 text-gray-300">
          <HardDrive size={15} className="text-[#e4a834]" />
          <span>Sincronizado con localStorage</span>
        </div>
      </div>

      {/* Alerta de Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
          feedback.type === 'success' 
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' 
            : 'bg-red-950/60 text-red-300 border-red-800'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tarjetas de Acción de Respaldo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tarjeta 1: Exportar */}
        <div className="bg-[#181c22] p-6 rounded-3xl border border-gray-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#1b6ca8]/20 text-sky-400 border border-sky-800/40 flex items-center justify-center mb-3">
              <Download size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">
              📥 Exportar Respaldo JSON
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Genera y descarga un archivo <code className="text-amber-300 font-mono">.json</code> completo con todas las noticias, imágenes en base64, audios, alertas de cortes, clasificados de la pizarra y configuración de navegación.
            </p>

            <div className="mt-4 bg-[#202630] p-3 rounded-xl border border-gray-700 text-xs space-y-1 text-gray-300">
              <div className="flex justify-between">
                <span>Artículos incluidos:</span>
                <strong className="text-white">{articles.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Alertas y Emergencias:</span>
                <strong className="text-white">{emergencies.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Avisos de Pizarra:</span>
                <strong className="text-white">{pizarra.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Items en Moderación:</span>
                <strong className="text-white">{moderationItems.length}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={exportBackupJson}
            className="w-full py-3 rounded-xl bg-[#1b6ca8] hover:bg-[#155a8d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <Download size={16} />
            <span>Descargar Respaldo JSON Ahora</span>
          </button>
        </div>

        {/* Tarjeta 2: Importar */}
        <div className="bg-[#181c22] p-6 rounded-3xl border border-gray-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#b84227]/20 text-[#e86a38] border border-[#b84227]/40 flex items-center justify-center mb-3">
              <Upload size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">
              📤 Importar Respaldo JSON
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Restaura la plataforma al instante subiendo un archivo de respaldo previo. Se validará la estructura de los datos antes de aplicar los cambios en memoria.
            </p>

            <div className="mt-4 bg-[#202630] p-3 rounded-xl border border-gray-700 text-xs text-gray-400">
              <span className="font-bold text-gray-200 block mb-1">
                Validación de Seguridad:
              </span>
              El sistema analiza la firma de datos y reemplaza el estado actual manteniendo la persistencia en el navegador.
            </div>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl bg-[#b84227] hover:bg-[#a0361e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Upload size={16} />
              <span>Seleccionar Archivo JSON para Restaurar</span>
            </button>
          </div>
        </div>

      </div>

      {/* Tarjeta 3: Restaurar Datos Semilla */}
      <div className="bg-[#181c22] p-5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <RotateCcw size={16} className="text-amber-400" />
            <span>Restablecer Datos Semilla Originales</span>
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            Borra la memoria local y reestablece los artículos territoriales originales del Maule Sur.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-red-950/50 hover:text-red-300 text-gray-300 font-bold text-xs transition-colors border border-gray-700"
        >
          Restablecer a Semillas
        </button>
      </div>

    </div>
  );
};
