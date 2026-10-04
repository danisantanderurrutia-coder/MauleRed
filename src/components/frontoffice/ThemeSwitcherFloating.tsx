import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Palette, Check } from 'lucide-react';

export const ThemeSwitcherFloating: React.FC = () => {
  const { themeStyle, setThemeStyle } = useAppData();

  return (
    <aside 
      aria-label="Selector de Estética Territorial"
      className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50 bg-[#0c1210]/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-1.5 text-xs animate-fadeIn"
      style={{ boxShadow: '0 12px 30px -4px rgba(0, 0, 0, 0.65)' }}
    >
      <div className="flex items-center gap-1.5 px-2 py-1 text-amber-300 font-extrabold tracking-wide">
        <Palette size={15} className="text-amber-400" />
        <span className="hidden sm:inline">Tema:</span>
      </div>

      <button
        type="button"
        onClick={() => setThemeStyle('opcionA')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
          themeStyle === 'opcionA'
            ? 'bg-[#1b4332] text-white ring-2 ring-[#c68b28] shadow-lg scale-105'
            : 'bg-white/10 text-gray-200 hover:bg-white/20'
        }`}
        title="Estética Roble Andino y Río Achibueno"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] ring-1 ring-[#c68b28] flex-shrink-0"></span>
        <span className="truncate">🌿 <span className="hidden sm:inline">Opción A: </span>Roble</span>
        {themeStyle === 'opcionA' && <Check size={13} className="text-[#c68b28] stroke-[3] flex-shrink-0" />}
      </button>

      <button
        type="button"
        onClick={() => setThemeStyle('opcionC')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
          themeStyle === 'opcionC'
            ? 'bg-[#7a3a29] text-[#fbf8f2] ring-2 ring-[#b37d14] shadow-lg scale-105'
            : 'bg-white/10 text-gray-200 hover:bg-white/20'
        }`}
        title="Estética Greda de Pilén y Lira Popular"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] ring-1 ring-[#b37d14] flex-shrink-0"></span>
        <span className="truncate">🏺 <span className="hidden sm:inline">Opción C: </span>Greda</span>
        {themeStyle === 'opcionC' && <Check size={13} className="text-amber-300 stroke-[3] flex-shrink-0" />}
      </button>
    </aside>
  );
};
