import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Radio, Heart, Shield, Lock, Droplet, Flame, BookOpen, Palette, Users } from 'lucide-react';
import { SectionType } from '../../types';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigateSection?: (section: SectionType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigateSection }) => {
  const { selectedLogoSrc } = useAppData();

  return (
    <footer className="bg-[#14171a] text-gray-400 text-xs border-t-4 border-theme-primary mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Identidad y Logo Oficial */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img 
                  src={selectedLogoSrc} 
                  alt="Emblema Popular Maule Sur" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './images/logo_chucao_andes.png';
                  }}
                />
              </div>
              <div>
                <span className="font-serif font-black text-base text-gray-100 block leading-tight">
                  Red de Noticias y Comunicación Popular del Maule Sur
                </span>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  Voz campesina, comunitaria y defensora de las cuencas
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              Medio comunitario, independiente y autogestionado al servicio de las juntas de vecinos, comités de agua potable rural (APR), campesinas, arrieros y organizaciones territoriales de las provincias de Linares y Cauquenes.
            </p>
            <div className="flex items-center gap-2 text-gray-300 font-medium pt-1">
              <Radio size={14} className="text-[#e4a834]" />
              <span>Emisión comunitaria en FM y señal digital ultraliviana para redes rurales 3G.</span>
            </div>

            {/* Accesos Rápidos Especiales */}
            {onNavigateSection && (
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onNavigateSection('editorial');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-theme-primary hover:text-white text-gray-300 transition-colors border border-gray-700 text-xs font-semibold"
                >
                  <BookOpen size={13} className="text-[#e4a834]" />
                  <span>Línea Editorial & Medios Amigos (6x2)</span>
                </button>

                <button
                  onClick={() => {
                    onNavigateSection('logos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-theme-accent hover:text-gray-900 text-gray-300 transition-colors border border-gray-700 text-xs font-semibold"
                >
                  <Palette size={13} className="text-[#e4a834]" />
                  <span>Ver los 10 Logos Oficiales</span>
                </button>

                <button
                  onClick={() => {
                    onNavigateSection('corresponsales');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 transition-colors border border-gray-700 text-xs"
                >
                  <Users size={13} />
                  <span>Corresponsales</span>
                </button>
              </div>
            )}
          </div>

          {/* Columna 2: Frecuencias */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Diales Comunitarios</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-center justify-between border-b border-gray-800 pb-1">
                <span>Linares & Achibueno:</span>
                <span className="font-bold text-[#e4a834]">104.5 FM</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-800 pb-1">
                <span>Colbún & Panimávida:</span>
                <span className="font-bold text-[#e4a834]">98.3 FM</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-800 pb-1">
                <span>Parral & Retiro:</span>
                <span className="font-bold text-[#e4a834]">101.1 FM</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Secano & Costa Cauquenes:</span>
                <span className="font-bold text-[#e4a834]">95.7 FM</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Principios y Redacción */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Sala de Redacción</h4>
            <p className="text-xs text-gray-400">
              Coordinación abierta en Linares. Recepción de comunicados comunitarios y denuncias socioambientales las 24 horas.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gray-800 text-gray-200 hover:bg-theme-primary hover:text-white transition-colors border border-gray-700 text-xs font-bold"
              >
                <Lock size={13} />
                <span>Acceso Santuario / Redacción</span>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span>Diseñado con tecnología libre para el pueblo del Maule Sur</span>
            <Heart size={12} className="text-red-500 fill-current" />
          </div>
          <div>
            Licencia Popular Comunitaria • Maule Sur, Chile • 2026
          </div>
        </div>

      </div>
    </footer>
  );
};
