import React, { useState } from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { 
  ClipboardList, 
  Car, 
  Bus, 
  Repeat, 
  ShoppingBag, 
  Briefcase, 
  Wrench, 
  Phone, 
  MapPin, 
  Clock, 
  PlusCircle, 
  CheckCircle2, 
  X,
  Send,
  Users
} from 'lucide-react';
import { ComunaMaule, PizarraItem } from '../../../types';

export const Anuncios: React.FC = () => {
  const { 
    pizarra, 
    addPizarraItem, 
    carpool, 
    busSchedules, 
    selectedComuna 
  } = useAppData();

  const [subSection, setSubSection] = useState<'pizarra' | 'transporte'>('pizarra');
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Formulario nuevo aviso
  const [avisoTitle, setAvisoTitle] = useState('');
  const [avisoCategory, setAvisoCategory] = useState<PizarraItem['category']>('trueque');
  const [avisoDesc, setAvisoDesc] = useState('');
  const [avisoPrice, setAvisoPrice] = useState('');
  const [avisoName, setAvisoName] = useState('');
  const [avisoPhone, setAvisoPhone] = useState('');
  const [avisoComuna, setAvisoComuna] = useState<ComunaMaule>('Linares');

  const filteredPizarra = pizarra.filter(item => {
    if (item.status !== 'aprobado') return false;
    if (selectedComuna !== 'todas' && item.comuna !== selectedComuna) return false;
    return true;
  });

  const handleSubmitAviso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avisoTitle.trim() || !avisoName.trim() || !avisoPhone.trim()) return;

    addPizarraItem({
      title: avisoTitle.trim(),
      category: avisoCategory,
      description: avisoDesc.trim(),
      priceOrBarter: avisoPrice.trim() || 'A convenir / Trueque',
      contactName: avisoName.trim(),
      contactPhone: avisoPhone.trim(),
      comuna: avisoComuna
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setAvisoTitle('');
      setAvisoDesc('');
      setAvisoPrice('');
      setAvisoName('');
      setAvisoPhone('');
    }, 2000);
  };

  const getCategoryBadge = (cat: PizarraItem['category']) => {
    switch (cat) {
      case 'trueque':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
            <Repeat size={11} /> Trueque Campesino
          </span>
        );
      case 'venta_agricola':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
            <ShoppingBag size={11} /> Cosecha y Alimentos
          </span>
        );
      case 'empleo':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
            <Briefcase size={11} /> Trabajo en el Campo
          </span>
        );
      case 'apero':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
            <Wrench size={11} /> Aperos & Servicios
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#d97706] to-[#b45309] text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <ClipboardList size={28} className="text-[#fef3c7]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#fef3c7] uppercase tracking-wider">
                Economía Solidaria, Trueques y Movilidad Popular
              </span>
              <h2 className="text-2xl font-black font-serif">Trueques & Tablón Comunitario</h2>
              <p className="text-xs text-amber-100 mt-0.5">
                Clasificados gratuitos de trueque campesino, intercambio de semillas, forraje, faenas y traslados rurales.
              </p>
            </div>
          </div>

          {/* Toggle Pizarra vs Transporte */}
          <div className="flex items-center bg-black/25 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setSubSection('pizarra')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                subSection === 'pizarra' ? 'bg-white text-gray-900 font-bold shadow' : 'text-amber-100 hover:text-white'
              }`}
            >
              <ClipboardList size={14} /> Pizarra de Clasificados
            </button>
            <button
              onClick={() => setSubSection('transporte')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                subSection === 'transporte' ? 'bg-white text-gray-900 font-bold shadow' : 'text-amber-100 hover:text-white'
              }`}
            >
              <Car size={14} /> Viajes y Micros Rurales
            </button>
          </div>
        </div>
      </div>

      {/* Pestaña: Pizarra Vecinal */}
      {subSection === 'pizarra' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Avisos Comunitarios ({filteredPizarra.length} vigentes)
              </h3>
              <p className="text-xs text-gray-500">
                Pizarra pública de ayuda mutua sin intermediarios comerciales.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b84227] text-white hover:bg-[#a0361e] text-xs font-bold shadow-sm transition-all"
            >
              <PlusCircle size={15} /> Publicar mi Aviso Gratis
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredPizarra.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs hover:border-[#d97706] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {getCategoryBadge(item.category)}
                    <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      <MapPin size={12} className="text-[#b84227]" /> {item.comuna}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-gray-900 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 inline-block bg-[#fffbeb] text-[#92400e] text-xs font-extrabold px-3 py-1 rounded-lg border border-amber-200">
                    💰 {item.priceOrBarter}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500 text-[11px] block">Contacto:</span>
                    <span className="font-bold text-gray-900">{item.contactName}</span>
                  </div>
                  <a
                    href={`tel:${item.contactPhone}`}
                    className="flex items-center gap-1 bg-[#265842] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#1b4331] transition-colors"
                  >
                    <Phone size={13} /> {item.contactPhone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña: Viajes y Transporte */}
      {subSection === 'transporte' && (
        <div className="space-y-6">
          
          {/* Carpooling Rural */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
              <Car size={20} className="text-[#1b6ca8]" />
              <span>Traslados Compartidos (Carpooling Campesino)</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Vecinos y productores que bajan de la cordillera o viajan a Linares y comparten asientos para abaratar combustible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {carpool.map((c) => (
                <div key={c.id} className="bg-sky-50/60 p-4 rounded-xl border border-sky-200 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex items-center justify-between font-bold text-sky-900 mb-1">
                      <span>{c.driver}</span>
                      <span className="bg-sky-200 px-2 py-0.5 rounded text-[10px] font-black">
                        {c.availableSeats} cupos
                      </span>
                    </div>
                    <div className="space-y-1 my-2 text-gray-700">
                      <div><strong className="text-gray-900">Desde:</strong> {c.origin}</div>
                      <div><strong className="text-gray-900">Hasta:</strong> {c.destination}</div>
                      <div className="text-[11px] text-gray-600">{c.date} • {c.time}</div>
                    </div>
                    <div className="text-xs font-bold text-[#b84227] bg-white p-1.5 rounded border border-sky-100">
                      {c.contribution}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-sky-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Coordinar con chofer:</span>
                    <a href={`tel:${c.contact}`} className="font-bold text-[#1b6ca8] hover:underline">
                      {c.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horarios de Micros Rurales */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
              <Bus size={20} className="text-[#265842]" />
              <span>Horarios y Tarifas de Micros Rurales y Colectivos</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Líneas comunitarias de transporte público que conectan el campo con los centros urbanos.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f6f0] text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Recorrido</th>
                    <th className="p-3">Operador</th>
                    <th className="p-3">Frecuencia</th>
                    <th className="p-3">Primera / Última Salida</th>
                    <th className="p-3">Pasaje Normal / Adulto Mayor</th>
                    <th className="p-3">Paradas Clave</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {busSchedules.map((bus) => (
                    <tr key={bus.id} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-900">{bus.route}</td>
                      <td className="p-3 text-gray-600">{bus.operator}</td>
                      <td className="p-3 font-semibold text-emerald-800">{bus.frequency}</td>
                      <td className="p-3 text-gray-600">{bus.firstBus} — {bus.lastBus}</td>
                      <td className="p-3 font-extrabold text-[#b84227]">
                        {bus.fareRegular} <span className="font-normal text-gray-500 text-[11px]">({bus.fareAdultoMayor} AM)</span>
                      </td>
                      <td className="p-3 text-gray-500 text-[11px]">{bus.stops}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Modal para publicar en la pizarra */}
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
                <h3 className="text-xl font-bold text-gray-900">¡Aviso Recibido!</h3>
                <p className="text-sm text-gray-600">
                  Tu aviso ha sido incorporado a la Pizarra Vecinal para que otros vecinos del campo puedan contactarte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAviso} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[#d97706] font-bold text-sm mb-1">
                    <ClipboardList size={18} />
                    <span>Publicar Aviso en la Pizarra Vecinal</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Servicio gratuito de economía solidaria campesina.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={avisoCategory}
                    onChange={(e) => setAvisoCategory(e.target.value as PizarraItem['category'])}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                  >
                    <option value="trueque">Trueque de Semillas, Forraje o Animales</option>
                    <option value="venta_agricola">Venta de Cosecha, Huevos, Harina, Miel</option>
                    <option value="empleo">Ofrezco o Busco Trabajo en el Campo</option>
                    <option value="apero">Aperos, Rastra, Bombas o Servicios Técnicos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Título del aviso
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Cambio 10 fardos de pasto por saco de porotos"
                    value={avisoTitle}
                    onChange={(e) => setAvisoTitle(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Descripción del producto o servicio
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Indica cantidades, estado, lugar de entrega o si vas a domicilio..."
                    value={avisoDesc}
                    onChange={(e) => setAvisoDesc(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Precio o Propuesta de Trueque
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: $5.000 / Trueque"
                      value={avisoPrice}
                      onChange={(e) => setAvisoPrice(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Comuna
                    </label>
                    <select
                      value={avisoComuna}
                      onChange={(e) => setAvisoComuna(e.target.value as ComunaMaule)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-[#d97706] focus:outline-none"
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nombre de contacto
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Don René"
                      value={avisoName}
                      onChange={(e) => setAvisoName(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Teléfono o WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: +56 9 8765 4321"
                      value={avisoPhone}
                      onChange={(e) => setAvisoPhone(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#d97706] focus:outline-none"
                    />
                  </div>
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
                    <Send size={14} /> Publicar Aviso
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
