import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { 
  MessageCircle, 
  Mic, 
  Camera, 
  AlertTriangle, 
  Send, 
  X, 
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { ComunaMaule } from '../../types';

export const WhatsAppFloatingBtn: React.FC = () => {
  const { addModerationItem } = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'audio' | 'foto' | 'denuncia'>('audio');
  
  // Formulario rápido
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [comuna, setComuna] = useState<ComunaMaule>('Linares');
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSimulateRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setAudioRecorded(true);
    }, 2500);
  };

  const handleSubmitContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !audioRecorded) return;

    addModerationItem({
      source: 'whatsapp',
      title: activeTab === 'audio' 
        ? `Nota de Voz recibida: ${messageText.slice(0, 50) || 'Audio sin texto'}` 
        : `Denuncia WhatsApp: ${messageText.slice(0, 50)}`,
      content: messageText || 'Cápsula de audio grabada por vecina del Maule Sur.',
      senderName: senderName.trim() || 'Vecino/a del Maule Sur',
      senderPhone: senderPhone.trim() || '+56 9 (WhatsApp Web)',
      comuna,
      audioUrl: audioRecorded ? 'https://actions.google.com/sounds/v1/foley/paper_rustling.ogg' : undefined,
      targetSection: 'alerta'
    });

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsOpen(false);
      setMessageText('');
      setSenderName('');
      setSenderPhone('');
      setAudioRecorded(false);
    }, 2000);
  };

  return (
    <>
      {/* Botón Flotante Permanente */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="group relative flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-2xl hover:bg-[#1ebc59] transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
          aria-label="Contactar a la Redacción Popular por WhatsApp"
        >
          <div className="relative">
            <MessageCircle size={28} className="fill-current" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <span className="font-extrabold text-xs tracking-wide hidden sm:inline">
            WhatsApp Redacción
          </span>
        </button>
      </div>

      {/* Modal / Menú Desplegable */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {sentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">¡Mensaje Enviado a la Redacción!</h3>
                <p className="text-xs text-gray-600">
                  Tu audio o denuncia ha llegado a la mesa de moderación y será revisada para salir al aire en Radio Maule Sur.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#25D366]">
                  <MessageCircle size={24} className="fill-current" />
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Envío Directo a la Redacción Popular
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manda tu testimonio, fotos o audios de WhatsApp para emitir en la radio.
                    </p>
                  </div>
                </div>

                {/* Tabs de tipo de mensaje */}
                <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('audio')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                      activeTab === 'audio' ? 'bg-white text-gray-900 shadow font-bold' : 'text-gray-600'
                    }`}
                  >
                    <Mic size={13} /> Audio de Voz
                  </button>
                  <button
                    onClick={() => setActiveTab('foto')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                      activeTab === 'foto' ? 'bg-white text-gray-900 shadow font-bold' : 'text-gray-600'
                    }`}
                  >
                    <Camera size={13} /> Foto / Noticia
                  </button>
                  <button
                    onClick={() => setActiveTab('denuncia')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                      activeTab === 'denuncia' ? 'bg-white text-gray-900 shadow font-bold' : 'text-gray-600'
                    }`}
                  >
                    <AlertTriangle size={13} /> Denuncia
                  </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmitContribution} className="space-y-3">
                  
                  {activeTab === 'audio' && (
                    <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-center space-y-2">
                      <p className="text-xs font-semibold text-amber-900">
                        Graba un audio rápido con tu teléfono para la radio comunitaria
                      </p>
                      
                      <button
                        type="button"
                        onClick={handleSimulateRecord}
                        disabled={isRecording}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 mx-auto transition-all shadow ${
                          isRecording 
                            ? 'bg-red-600 text-white animate-pulse' 
                            : audioRecorded 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-[#b84227] text-white hover:bg-[#a0361e]'
                        }`}
                      >
                        <Mic size={15} />
                        <span>
                          {isRecording ? 'Grabando audio (2s)...' : audioRecorded ? '✓ Audio grabado (00:42)' : 'Mantener para grabar nota de voz'}
                        </span>
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mensaje, denuncia o descripción del hecho
                    </label>
                    <textarea
                      rows={2}
                      required={!audioRecorded}
                      placeholder="Indica qué ocurre, el callejón o sector, y si hay personas en riesgo..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-[#25D366] focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tu Nombre o Junta Vecinal
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Sra. María / Anónimo"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-[#25D366] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Comuna
                      </label>
                      <select
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value as ComunaMaule)}
                        className="w-full text-xs border border-gray-300 rounded-xl p-2 bg-white focus:ring-2 focus:ring-[#25D366] focus:outline-none"
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

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Teléfono WhatsApp (Para que la radio verifique)
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej: +56 9 1234 5678"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-[#25D366] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <a
                      href="https://wa.me/56984521199?text=Hola%20Radio%20Maule%20Sur,%20quiero%20enviar%20una%20denuncia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#25D366] font-bold flex items-center gap-1 hover:underline"
                    >
                      <PhoneCall size={13} /> Abrir WhatsApp Web
                    </a>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebc59] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Send size={13} /> Enviar a Redacción
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
