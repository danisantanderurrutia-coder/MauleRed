import React, { useState } from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Phone, 
  Tag, 
  Plus, 
  Heart, 
  Users, 
  Sparkles,
  Search
} from 'lucide-react';
import { CommunityEvent } from '../../../types';

export const Calendario: React.FC = () => {
  const { events, selectedComuna } = useAppData();
  const [filterType, setFilterType] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(ev => {
    if (filterType !== 'todos' && ev.type !== filterType) return false;
    if (selectedComuna !== 'todas' && ev.comuna !== selectedComuna) return false;
    if (searchTerm && !ev.title.toLowerCase().includes(searchTerm.toLowerCase()) && !ev.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getEventBadge = (type: CommunityEvent['type']) => {
    switch (type) {
      case 'trafkintu':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Trafkintu / Semillas</span>;
      case 'bingo':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Bingo a Beneficio</span>;
      case 'asamblea':
        return <span className="bg-sky-100 text-sky-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Asamblea APR / Vecinal</span>;
      case 'feria':
        return <span className="bg-orange-100 text-orange-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Feria Costumbrista</span>;
      default:
        return <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">Encuentro Cultural</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#2c3e50] to-[#1a252f] text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <CalendarIcon size={28} className="text-[#e4a834]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#e4a834] uppercase tracking-wider">
                Agenda Solidaria y Comunitaria
              </span>
              <h2 className="text-2xl font-black font-serif">Calendario del Territorio</h2>
              <p className="text-xs text-gray-200 mt-0.5">
                Fechas de ferias campesinas, intercambio de semillas, bingos solidarios y asambleas de APR en el Maule Sur.
              </p>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
            <button
              onClick={() => setFilterType('todos')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'todos' ? 'bg-[#e4a834] text-[#14171a] font-bold' : 'bg-black/30 text-gray-200 hover:text-white'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('trafkintu')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'trafkintu' ? 'bg-[#e4a834] text-[#14171a] font-bold' : 'bg-black/30 text-gray-200 hover:text-white'}`}
            >
              Semillas
            </button>
            <button
              onClick={() => setFilterType('bingo')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'bingo' ? 'bg-[#e4a834] text-[#14171a] font-bold' : 'bg-black/30 text-gray-200 hover:text-white'}`}
            >
              Bingos
            </button>
            <button
              onClick={() => setFilterType('asamblea')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'asamblea' ? 'bg-[#e4a834] text-[#14171a] font-bold' : 'bg-black/30 text-gray-200 hover:text-white'}`}
            >
              Asambleas
            </button>
          </div>
        </div>
      </div>

      {/* Buscador rápido */}
      <div className="flex items-center bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs max-w-md">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Buscar evento por nombre o actividad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Grid de Eventos */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
          No hay eventos convocados con este criterio en la zona.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs hover:border-[#b84227] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  {getEventBadge(ev.type)}
                  <span className="text-xs font-bold text-[#b84227] flex items-center gap-1">
                    <MapPin size={12} /> {ev.comuna}
                  </span>
                </div>

                <h3 className="font-bold text-base text-gray-900 leading-snug">
                  {ev.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {ev.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <CalendarIcon size={14} className="text-[#b84227]" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock size={14} className="text-[#1b6ca8]" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin size={14} className="text-emerald-700" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              {ev.contact && (
                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <span>Contacto / Info:</span>
                  <span className="font-bold text-[#14171a]">{ev.contact}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
