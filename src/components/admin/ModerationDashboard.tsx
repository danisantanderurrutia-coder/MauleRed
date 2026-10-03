import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { ModerationItem } from '../../types';
import { 
  MessageCircle, 
  AlertTriangle, 
  ClipboardList, 
  Check, 
  X, 
  Edit3, 
  ShieldAlert, 
  Sliders, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Volume2, 
  Play, 
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const ModerationDashboard: React.FC = () => {
  const { 
    moderationItems, 
    approveModerationItem, 
    rejectModerationItem, 
    autoApproval, 
    updateAutoApproval 
  } = useAppData();

  const [filterSource, setFilterSource] = useState<'todos' | 'whatsapp' | 'avisador_cortes' | 'pizarra'>('todos');
  const [editingItem, setEditingItem] = useState<ModerationItem | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const filteredItems = moderationItems.filter(item => {
    if (filterSource !== 'todos' && item.source !== filterSource) return false;
    return true;
  });

  const pendingCount = moderationItems.filter(m => m.status === 'pendiente').length;

  const handleStartEdit = (item: ModerationItem) => {
    setEditingItem(item);
    setEditedTitle(item.title);
    setEditedContent(item.content);
  };

  const handleSaveEditAndApprove = () => {
    if (!editingItem) return;
    approveModerationItem(editingItem.id, {
      title: editedTitle,
      content: editedContent
    });
    setEditingItem(null);
  };

  const getSourceIcon = (source: ModerationItem['source']) => {
    switch (source) {
      case 'whatsapp': return <MessageCircle size={15} className="text-[#25D366]" />;
      case 'avisador_cortes': return <AlertTriangle size={15} className="text-amber-500" />;
      case 'pizarra': return <ClipboardList size={15} className="text-sky-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera & Contador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c22] p-5 rounded-2xl border border-gray-800">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider">
            Bandeja Ciudadana en Tiempo Real
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Moderación de Lectores-Auditores
            <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
              {pendingCount} Pendientes
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Aportes recibidos por el Botón de WhatsApp, Avisador de Cortes de Agua/Luz y la Pizarra Vecinal.
          </p>
        </div>

        {/* Filtros rápidos de fuente */}
        <div className="flex items-center gap-1.5 bg-[#222831] p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setFilterSource('todos')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterSource === 'todos' ? 'bg-[#b84227] text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterSource('whatsapp')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${filterSource === 'whatsapp' ? 'bg-[#25D366] text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setFilterSource('avisador_cortes')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${filterSource === 'avisador_cortes' ? 'bg-[#e4a834] text-[#14171a] font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            Cortes APR
          </button>
          <button
            onClick={() => setFilterSource('pizarra')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${filterSource === 'pizarra' ? 'bg-sky-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            Pizarra
          </button>
        </div>
      </div>

      {/* MÓDULO DE AUTO-APROBACIÓN PREDEFINIDA */}
      <div className="bg-[#1e242c] p-4 rounded-2xl border border-gray-700/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-700 pb-3">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[#e4a834]" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Configuración de Auto-Aprobación Predefinida
              </h3>
              <p className="text-[11px] text-gray-400">
                Permite que ciertos aportes vecinales se publiquen de inmediato sin pasar por revisión previa.
              </p>
            </div>
          </div>

          {/* Switch General */}
          <button
            onClick={() => updateAutoApproval({ enabled: !autoApproval.enabled })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              autoApproval.enabled
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            {autoApproval.enabled ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} />}
            <span>{autoApproval.enabled ? 'Auto-Aprobación ACTIVA' : 'Auto-Aprobación APAGADA'}</span>
          </button>
        </div>

        {/* Interruptores por categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#14171a] border border-gray-800 cursor-pointer">
            <span className="text-gray-300 font-medium">Pizarra Vecinal (Trueques)</span>
            <input
              type="checkbox"
              checked={autoApproval.autoApprovePizarra}
              onChange={(e) => updateAutoApproval({ autoApprovePizarra: e.target.checked })}
              className="rounded accent-[#b84227]"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#14171a] border border-gray-800 cursor-pointer">
            <span className="text-gray-300 font-medium">Avisador de Cortes y Luz</span>
            <input
              type="checkbox"
              checked={autoApproval.autoApproveCortes}
              onChange={(e) => updateAutoApproval({ autoApproveCortes: e.target.checked })}
              className="rounded accent-[#b84227]"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#14171a] border border-gray-800 cursor-pointer">
            <span className="text-gray-300 font-medium">Audios de WhatsApp</span>
            <input
              type="checkbox"
              checked={autoApproval.autoApproveWhatsApp}
              onChange={(e) => updateAutoApproval({ autoApproveWhatsApp: e.target.checked })}
              className="rounded accent-[#b84227]"
            />
          </label>
        </div>
      </div>

      {/* Lista de Aportes Recibidos */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#181c22] p-8 rounded-2xl border border-gray-800 text-center text-gray-400 text-xs">
          No hay elementos en esta bandeja.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isPending = item.status === 'pendiente';

            return (
              <div
                key={item.id}
                className={`bg-[#181c22] p-4 rounded-2xl border transition-all ${
                  isPending ? 'border-amber-500/40 bg-gradient-to-r from-[#181c22] to-[#201c18]' : 'border-gray-800 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs">
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 font-bold text-gray-200 bg-gray-800 px-2 py-0.5 rounded">
                        {getSourceIcon(item.source)}
                        <span className="uppercase text-[10px]">{item.source.replace('_', ' ')}</span>
                      </span>

                      <span className="text-gray-400 font-medium flex items-center gap-1 text-[11px]">
                        <MapPin size={11} className="text-[#b84227]" /> {item.comuna}
                      </span>

                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-[11px]">{item.timestamp}</span>

                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.status === 'aprobado' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                          : item.status === 'rechazado'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="text-gray-300 leading-relaxed bg-[#121519] p-3 rounded-xl border border-gray-800">
                      {item.content}
                    </p>

                    <div className="flex items-center gap-4 text-gray-400 text-[11px]">
                      <span>Remitente: <strong className="text-gray-200">{item.senderName}</strong></span>
                      <span className="flex items-center gap-1 text-[#25D366]">
                        <Phone size={11} /> {item.senderPhone}
                      </span>
                    </div>

                    {/* Audio o Foto Adjunta */}
                    {item.audioUrl && (
                      <div className="inline-flex items-center gap-2 bg-[#2a241b] text-[#e4a834] px-3 py-1.5 rounded-lg border border-amber-800/40 text-xs font-bold">
                        <Volume2 size={14} />
                        <span>Contiene nota de voz para la radio</span>
                      </div>
                    )}
                  </div>

                  {/* Acciones de Moderación */}
                  <div className="flex flex-row md:flex-col items-center gap-2 self-end md:self-center flex-shrink-0">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => approveModerationItem(item.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-all active:scale-95"
                          title="Aceptar y publicar en el Frontoffice"
                        >
                          <Check size={14} />
                          <span>Aceptar & Publicar</span>
                        </button>

                        <button
                          onClick={() => handleStartEdit(item)}
                          className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs flex items-center gap-1 transition-colors border border-gray-700"
                          title="Editar el texto antes de dar el visto bueno"
                        >
                          <Edit3 size={14} />
                          <span>Editar antes</span>
                        </button>

                        <button
                          onClick={() => rejectModerationItem(item.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-red-900/40"
                          title="Descartar reporte"
                        >
                          <X size={14} />
                          <span>Descartar</span>
                        </button>
                      </>
                    ) : (
                      <div className="text-[11px] text-gray-500 italic">
                        Item ya procesado
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal para Editar Antes de Publicar */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#181c22] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-800 text-gray-200">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Edit3 size={18} className="text-[#e4a834]" />
              <span>Editar Contenido antes de Publicar</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Corrige faltas de ortografía o ajusta el lenguaje respetando el fondo del testimonio.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Título público
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full text-xs bg-[#222831] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Cuerpo / Contenido
                </label>
                <textarea
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full text-xs bg-[#222831] border border-gray-700 rounded-xl p-3 text-white focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditAndApprove}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#b84227] text-white hover:bg-[#a0361e] shadow"
                >
                  Guardar & Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
