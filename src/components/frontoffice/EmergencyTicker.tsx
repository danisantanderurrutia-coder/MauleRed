import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { 
  AlertTriangle, 
  Droplet, 
  Zap, 
  Flame, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  X,
  Send
} from 'lucide-react';
import { ComunaMaule, CuencaMaule, EmergencyAlert } from '../../types';

export const EmergencyTicker: React.FC = () => {
  const { 
    emergencies, 
    addEmergency, 
    selectedComuna, 
    selectedCuenca 
  } = useAppData();

  const [filterType, setFilterType] = useState<string>('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Formulario de nuevo reporte ciudadano
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState<EmergencyAlert['type']>('apr');
  const [reportSector, setReportSector] = useState('');
  const [reportComuna, setReportComuna] = useState<ComunaMaule>('Linares');
  const [reportCuenca, setReportCuenca] = useState<CuencaMaule>('Río Achibueno');
  const [reportAffected, setReportAffected] = useState('');
  const [reportNotes, setReportNotes] = useState('');

  // Filtrado de emergencias activas
  const filteredEmergencies = emergencies.filter(emg => {
    if (filterType !== 'todos' && emg.type !== filterType) return false;
    if (selectedComuna !== 'todas' && emg.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && emg.cuenca && emg.cuenca !== selectedCuenca) return false;
    return true;
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim() || !reportSector.trim()) return;

    addEmergency({
      title: reportTitle.trim(),
      type: reportType,
      sector: reportSector.trim(),
      comuna: reportComuna,
      cuenca: reportCuenca,
      affectedCount: reportAffected ? `${reportAffected} familias/vecinos` : undefined,
      status: 'en_curso',
      notes: reportNotes.trim() || 'Reporte ingresado directamente por vecino del sector.'
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setReportTitle('');
      setReportSector('');
      setReportNotes('');
      setReportAffected('');
    }, 2000);
  };

  const getBadgeIcon = (type: EmergencyAlert['type']) => {
    switch (type) {
      case 'apr': return <Droplet size={14} className="text-blue-500" />;
      case 'luz': return <Zap size={14} className="text-amber-500" />;
      case 'incendio': return <Flame size={14} className="text-red-500" />;
      default: return <AlertTriangle size={14} className="text-orange-500" />;
    }
  };

  const getStatusBadge = (status: EmergencyAlert['status']) => {
    switch (status) {
      case 'cuadrilla_en_camino':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
            <Clock size={11} /> Cuadrilla en camino
          </span>
        );
      case 'en_curso':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full animate-pulse">
            <AlertTriangle size={11} /> En progreso
          </span>
        );
      case 'resuelto':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
            <CheckCircle2 size={11} /> Resuelto
          </span>
        );
    }
  };

  return (
    <div className="bg-[#ffffff]/90 backdrop-blur-xs border-y border-[#b8c9bc] py-3.5 px-4 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado del Avisador */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#8c2d19] text-white shadow-sm">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-2 flex-wrap">
                <span>Avisador de Cortes de Agua (APR), Luz y Alertas Maule Sur</span>
                <span className="bg-[#1c5274] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                  {filteredEmergencies.length} Activas
                </span>
              </h2>
              <p className="text-xs text-gray-700 font-medium">
                Monitoreo vecinal continuo en directo. Marca o reporta fallas en tu sector.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filtros rápidos de tipo */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-300 text-xs font-bold">
              <button
                onClick={() => setFilterType('todos')}
                className={`px-3 py-1 rounded-lg transition-colors ${filterType === 'todos' ? 'bg-[#1b4332] text-white shadow-xs' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('apr')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${filterType === 'apr' ? 'bg-[#1c5274] text-white shadow-xs' : 'text-gray-700 hover:text-gray-900'}`}
              >
                <Droplet size={12} className={filterType === 'apr' ? 'text-sky-200' : 'text-blue-600'} /> Agua APR
              </button>
              <button
                onClick={() => setFilterType('luz')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${filterType === 'luz' ? 'bg-[#b37d14] text-white shadow-xs' : 'text-gray-700 hover:text-gray-900'}`}
              >
                <Zap size={12} className={filterType === 'luz' ? 'text-amber-200' : 'text-amber-600'} /> Luz CGE
              </button>
            </div>

            {/* Botón de acción: Reportar falla */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8c2d19] text-white hover:bg-[#a3351e] font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <PlusCircle size={15} />
              <span>Reportar Corte o Falla</span>
            </button>
          </div>
        </div>

        {/* Grilla de Emergencias Activas */}
        {filteredEmergencies.length === 0 ? (
          <div className="bg-white rounded-xl p-4 text-center border border-gray-300 text-xs text-gray-700 font-semibold">
            No hay cortes o emergencias reportadas activas bajo los filtros seleccionados ({selectedComuna !== 'todas' ? `Comuna: ${selectedComuna}` : 'Todo el territorio'}).
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredEmergencies.map((emg) => (
              <div
                key={emg.id}
                className="bg-theme-surface rounded-xl p-3 border border-theme-border shadow-2xs hover:border-theme-primary transition-all flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-theme-textMuted uppercase">
                      {getBadgeIcon(emg.type)}
                      {emg.type === 'apr' ? 'Agua Potable Rural' : emg.type === 'luz' ? 'Corte Eléctrico' : 'Emergencia'}
                    </span>
                    {getStatusBadge(emg.status)}
                  </div>
                  <h3 className="font-bold text-xs text-theme-textMain line-clamp-2 leading-snug">
                    {emg.title}
                  </h3>
                  <div className="text-[11px] text-theme-textMuted mt-1">
                    <span className="font-semibold text-theme-primary">{emg.sector}</span>, {emg.comuna}
                  </div>
                  {emg.affectedCount && (
                    <div className="text-[11px] text-red-600 font-medium mt-0.5">
                      Afecta a: {emg.affectedCount}
                    </div>
                  )}
                  {emg.urgentNotice && (
                    <div className="mt-2 text-[10px] bg-amber-50 text-amber-900 p-1.5 rounded border border-amber-200 font-medium">
                      ⚠️ {emg.urgentNotice}
                    </div>
                  )}
                </div>

                <div className="border-t border-theme-border/60 pt-2 mt-2 flex items-center justify-between text-[10px] text-theme-textMuted">
                  <span>Reportado: {emg.reportedAt}</span>
                  <span className="font-medium text-theme-textMain">{emg.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal de Reporte Vecinal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">¡Reporte Ingresado!</h3>
                <p className="text-sm text-gray-600">
                  Tu aviso ha sido recibido por la redacción comunitaria y puesto en alerta territorial para los vecinos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[#b84227] font-bold text-sm mb-1">
                    <AlertTriangle size={18} />
                    <span>Avisar Falla o Emergencia en tu Sector</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    La información se difunde en la web y en la radio para organizar la ayuda y presionar a las cuadrillas.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tipo de Emergencia
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as EmergencyAlert['type'])}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                  >
                    <option value="apr">Agua Potable Rural (APR) - Corte o Turbiedad</option>
                    <option value="luz">Corte Eléctrico (CGE / Cooperativa)</option>
                    <option value="incendio">Foco de Fuego o Humo / Pastizales</option>
                    <option value="socioambiental">Emergencia Socioambiental / Contaminación Canal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ¿Qué pasó en breve? (Título del reporte)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Falla de matriz en APR Vara Gruesa deja sin agua a 300 casas"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Comuna
                    </label>
                    <select
                      value={reportComuna}
                      onChange={(e) => setReportComuna(e.target.value as ComunaMaule)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                    >
                      <option value="Linares">Linares</option>
                      <option value="Colbún">Colbún</option>
                      <option value="Panimávida">Panimávida</option>
                      <option value="Longaví">Longaví</option>
                      <option value="Parral">Parral</option>
                      <option value="Retiro">Retiro</option>
                      <option value="San Javier">San Javier</option>
                      <option value="Yerbas Buenas">Yerbas Buenas</option>
                      <option value="Cauquenes">Cauquenes</option>
                      <option value="Chanco">Chanco</option>
                      <option value="Pelluhue">Pelluhue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Cuenca Hidrográfica
                    </label>
                    <select
                      value={reportCuenca}
                      onChange={(e) => setReportCuenca(e.target.value as CuencaMaule)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                    >
                      <option value="Río Achibueno">Río Achibueno</option>
                      <option value="Río Maule">Río Maule</option>
                      <option value="Río Melado">Río Melado</option>
                      <option value="Río Loncomilla">Río Loncomilla</option>
                      <option value="Río Perquilauquén">Río Perquilauquén</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Sector o Callejón
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Callejón Los Aromos km 4"
                      value={reportSector}
                      onChange={(e) => setReportSector(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Afectados aprox. (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 150 familias"
                      value={reportAffected}
                      onChange={(e) => setReportAffected(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Detalles para los vecinos y cuadrillas
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Indicar si hay cables en el suelo, puntos de agua cercanos o si ya se llamó a la empresa..."
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold rounded-lg bg-[#b84227] text-white hover:bg-[#a0361e] flex items-center gap-1.5 shadow-md"
                  >
                    <Send size={14} /> Publicar Alerta
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
