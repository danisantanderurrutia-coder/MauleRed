import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { NavItemConfig } from '../../types';
import { 
  Navigation, 
  Save, 
  Check, 
  Eye, 
  EyeOff, 
  Edit2, 
  RotateCcw, 
  Sparkles,
  Layers
} from 'lucide-react';
import { INITIAL_NAV_ITEMS } from '../../data/mockData';

export const NavigationManager: React.FC = () => {
  const { navItems, updateNavItems } = useAppData();
  const [items, setItems] = useState<NavItemConfig[]>(navItems);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLabelChange = (id: string, newLabel: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, label: newLabel } : item));
  };

  const handleBadgeChange = (id: string, newBadge: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, badge: newBadge || undefined } : item));
  };

  const handleToggleVisible = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const handleSave = () => {
    updateNavItems(items);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    setItems(INITIAL_NAV_ITEMS);
    updateNavItems(INITIAL_NAV_ITEMS);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c22] p-5 rounded-2xl border border-gray-800">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider">
            Arquitectura Dinámica sin Tocar Código
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Gestor de Navegación Popular
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Renombra botones de la cabecera, añade badges de alerta o activa/desactiva secciones en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-gray-700"
            title="Restaurar nombres originales"
          >
            <RotateCcw size={13} />
            <span>Restablecer</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#b84227] hover:bg-[#a0361e] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all active:scale-95"
          >
            {savedSuccess ? <Check size={15} /> : <Save size={15} />}
            <span>{savedSuccess ? '¡Guardado!' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </div>

      {/* Lista de Botones del Menú */}
      <div className="bg-[#181c22] p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="text-xs text-gray-400">
          Los cambios se reflejan inmediatamente en la barra de navegación del Frontoffice.
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
                item.visible ? 'bg-[#202630] border-gray-700' : 'bg-[#14171a] border-gray-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center font-bold text-[11px]">
                  {index + 1}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-mono text-[11px] uppercase">
                      ID: {item.key}
                    </span>
                    {item.badge && (
                      <span className="bg-[#e4a834]/30 text-[#e4a834] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controles de Edición */}
              <div className="flex items-center gap-3 flex-wrap flex-1 justify-end">
                <div className="flex items-center gap-1.5 min-w-[200px]">
                  <label className="text-gray-400 font-medium text-[11px]">Texto Botón:</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleLabelChange(item.id, e.target.value)}
                    className="flex-1 bg-[#181c22] border border-gray-700 rounded-xl p-2 text-white font-bold focus:outline-none focus:ring-1 focus:ring-[#b84227]"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-32">
                  <label className="text-gray-400 font-medium text-[11px]">Badge:</label>
                  <input
                    type="text"
                    placeholder="Ej: En vivo"
                    value={item.badge || ''}
                    onChange={(e) => handleBadgeChange(item.id, e.target.value)}
                    className="w-full bg-[#181c22] border border-gray-700 rounded-xl p-2 text-amber-400 font-bold focus:outline-none focus:ring-1 focus:ring-[#b84227]"
                  />
                </div>

                {/* Toggle Visibilidad */}
                <button
                  onClick={() => handleToggleVisible(item.id)}
                  className={`p-2 rounded-xl flex items-center gap-1 font-bold text-xs transition-colors ${
                    item.visible
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                  title={item.visible ? 'Ocultar botón del menú' : 'Mostrar botón en el menú'}
                >
                  {item.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                  <span className="hidden sm:inline">{item.visible ? 'Visible' : 'Oculto'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
