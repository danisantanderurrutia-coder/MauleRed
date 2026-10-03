import React, { useState } from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { 
  CloudSun, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  HelpCircle, 
  Sprout, 
  Coins, 
  Calendar, 
  Phone, 
  ShieldAlert, 
  ThermometerSnowflake, 
  Wind,
  Droplet
} from 'lucide-react';

interface CampoClimaProps {
  onSelectArticle: (articleId: string) => void;
}

export const CampoClima: React.FC<CampoClimaProps> = ({ onSelectArticle }) => {
  const { feriaPrices, subsidies, articles, selectedComuna } = useAppData();
  const [activeTab, setActiveTab] = useState<'clima' | 'precios' | 'subsidios'>('clima');

  // Artículos de la sección campo
  const campoArticles = articles.filter(a => a.section === 'campo' && a.status === 'publicado');

  const filteredPrices = feriaPrices.filter(p => {
    if (selectedComuna !== 'todas' && p.comuna !== selectedComuna) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Cabecera de la Sección */}
      <div className="bg-gradient-to-r from-[#265842] to-[#173b2c] text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <Sprout size={28} className="text-[#e4a834]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#e4a834] uppercase tracking-wider">
                Periodismo Campesino y de Faena
              </span>
              <h2 className="text-2xl font-black font-serif">El Tiempo y el Campo</h2>
              <p className="text-xs text-gray-200 mt-0.5">
                Clima para siembra y cosecha, semáforo de precios en ferias libres del Maule Sur y fondos de emergencia.
              </p>
            </div>
          </div>

          {/* Sub-navegación */}
          <div className="flex items-center bg-black/25 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('clima')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'clima' ? 'bg-[#e4a834] text-[#14171a] font-bold shadow' : 'text-gray-200 hover:text-white'
              }`}
            >
              Clima Agrícola
            </button>
            <button
              onClick={() => setActiveTab('precios')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'precios' ? 'bg-[#e4a834] text-[#14171a] font-bold shadow' : 'text-gray-200 hover:text-white'
              }`}
            >
              Precios de la Feria
            </button>
            <button
              onClick={() => setActiveTab('subsidios')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'subsidios' ? 'bg-[#e4a834] text-[#14171a] font-bold shadow' : 'text-gray-200 hover:text-white'
              }`}
            >
              Subsidios & Trámites
            </button>
          </div>
        </div>
      </div>

      {/* Pestaña 1: Clima Agrícola y Alertas de Helada */}
      {activeTab === 'clima' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Alerta de Heladas */}
            <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-sky-800 uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <ThermometerSnowflake size={16} className="text-sky-600" /> Alerta de Helada
                </span>
                <span className="bg-sky-100 px-2 py-0.5 rounded text-sky-900">Riesgo Medio</span>
              </div>
              <div className="text-2xl font-black text-gray-900">1.8°C Mínima</div>
              <p className="text-xs text-gray-600 mt-1">
                Madrugada del viernes con cielo despejado en el llano de Linares, Longaví y Retiro.
              </p>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-medium text-sky-900 bg-sky-50 p-2 rounded-lg">
                💡 Consejo: Regar potreros de frutales la tarde previa para atenuar helada en floración temprana.
              </div>
            </div>

            {/* Viento Puelche & Secano */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Wind size={16} className="text-amber-600" /> Viento Puelche
                </span>
                <span className="bg-amber-100 px-2 py-0.5 rounded text-amber-900">Activo 28 km/h</span>
              </div>
              <div className="text-2xl font-black text-gray-900">Secado Rápido</div>
              <p className="text-xs text-gray-600 mt-1">
                Baja humedad ambiental en precordillera (Colbún, Melado y Achibueno).
              </p>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-medium text-amber-900 bg-amber-50 p-2 rounded-lg">
                ⚠️ Alerta: Prohibición total de quemas agrícolas de rastrojos por ráfagas térmicas.
              </div>
            </div>

            {/* Ventana de Riego y Humedad */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Droplet size={16} className="text-emerald-600" /> Ventana de Riego
                </span>
                <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-900">Óptima</span>
              </div>
              <div className="text-2xl font-black text-gray-900">Turno de Canales</div>
              <p className="text-xs text-gray-600 mt-1">
                Caudal del Río Achibueno y Maule con deshielo estable.
              </p>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] font-medium text-emerald-900 bg-emerald-50 p-2 rounded-lg">
                🌱 Aprovechar riego entre las 06:00 y las 10:30 am antes de que suba la temperatura.
              </div>
            </div>

          </div>

          {/* Noticias de la sección */}
          <div className="mt-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sprout size={18} className="text-[#265842]" /> Crónicas del Campo Maule Sur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campoArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art.id)}
                  className="bg-white rounded-2xl border border-[#e2dcd2] overflow-hidden hover:border-[#b84227] transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="font-bold text-[#b84227] uppercase">{art.comuna}</span>
                      <span>{art.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#b84227] leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                      {art.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#fcfaf7] px-4 py-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Por: {art.author}</span>
                    <span className="text-[#1b6ca8] font-bold group-hover:underline">Leer receta 3 bloques →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pestaña 2: Pizarra de Precios de Ferias Libres */}
      {activeTab === 'precios' && (
        <div className="bg-white rounded-2xl border border-[#e2dcd2] p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Coins size={18} className="text-[#e4a834]" /> Pizarra de Precios en Ferias Libres y Mercados
              </h3>
              <p className="text-xs text-gray-500">
                Precios de referencia al por mayor y detalle levantados por corresponsales populares en Linares, Parral y San Javier.
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
              Actualizado esta semana
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8f6f0] text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">Producto Campesino</th>
                  <th className="p-3">Mercado / Feria</th>
                  <th className="p-3">Unidad</th>
                  <th className="p-3">Precio Estimado</th>
                  <th className="p-3">Tendencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fffbf5] transition-colors">
                    <td className="p-3 font-bold text-gray-900">
                      {item.product}
                      {item.variety && (
                        <span className="block text-[11px] font-normal text-gray-500">{item.variety}</span>
                      )}
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className="font-semibold">{item.marketName}</span>
                      <span className="block text-[11px] text-[#793822]">({item.comuna})</span>
                    </td>
                    <td className="p-3 font-medium text-gray-600">{item.unit}</td>
                    <td className="p-3 font-extrabold text-sm text-[#b84227]">{item.price}</td>
                    <td className="p-3">
                      {item.trend === 'baja' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          <TrendingDown size={14} /> Baja
                        </span>
                      )}
                      {item.trend === 'alza' && (
                        <span className="inline-flex items-center gap-1 text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded">
                          <TrendingUp size={14} /> Alza
                        </span>
                      )}
                      {item.trend === 'estable' && (
                        <span className="inline-flex items-center gap-1 text-gray-700 font-bold bg-gray-100 px-2 py-0.5 rounded">
                          <Minus size={14} /> Estable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pestaña 3: Subsidios y Trámites */}
      {activeTab === 'subsidios' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subsidies.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-[#e2dcd2] p-4 flex flex-col justify-between shadow-2xs hover:border-[#265842] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-black text-[#265842] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {sub.institution}
                    </span>
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <Calendar size={12} /> Cierra: {sub.deadline}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">
                    {sub.title}
                  </h4>
                  <div className="mt-2 text-xs text-[#793822] font-semibold bg-[#fff8eb] p-2 rounded-lg border border-[#f3e0bf]">
                    Beneficio: {sub.amountOrBenefit}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    <strong className="text-gray-800">Quiénes postulan:</strong> {sub.targetAudience}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-700">
                  <div className="font-bold text-gray-900 mb-1 flex items-center gap-1">
                    <HelpCircle size={14} className="text-[#1b6ca8]" /> Cómo realizar el trámite:
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {sub.howToApply}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
