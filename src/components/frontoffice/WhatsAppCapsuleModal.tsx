import React, { useState } from 'react';
import { Article } from '../../types';
import { MessageSquare, Copy, Check, ExternalLink, X, Radio } from 'lucide-react';

interface WhatsAppCapsuleModalProps {
  article: Article;
  onClose: () => void;
}

export const WhatsAppCapsuleModal: React.FC<WhatsAppCapsuleModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Formato editorial para grupos de WhatsApp comunitarios
  const whatsappMessage = `📢 *RED DE NOTICIAS POPULAR DEL MAULE SUR*
📻 _Cápsula Informativa Territorial (Radio 104.5 FM)_

🔴 *${article.title}*
📍 Sector: ${article.comuna} (${article.cuenca})
📅 ${article.date}

1️⃣ *¿QUÉ PASÓ?:*
${article.block1WhatHappened}

2️⃣ *LA CAUSA (En simple):*
${article.block2TheCause}

3️⃣ *¿QUÉ HACER? / LLAMADO:*
${article.block3SolutionCall}

📌 *FICHA PRÁCTICA:*
${article.utilityCard.dates ? `⏱️ Fechas: ${article.utilityCard.dates}\n` : ''}${article.utilityCard.phones?.length ? `📞 Teléfonos de ayuda: ${article.utilityCard.phones.join(' | ')}\n` : ''}${article.utilityCard.locations ? `📍 Lugar de trámite: ${article.utilityCard.locations}\n` : ''}
🔗 *Escucha la cápsula de audio (90s) y lee la nota completa en:*
https://maulesur.red/noticia/${article.id}

_Compartido solidariamente para juntas de vecinos, APRs y familias del Maule Sur_`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
          aria-label="Cerrar ventana"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2.5 text-[#25D366] mb-1">
          <MessageSquare size={24} className="fill-current" />
          <h3 className="text-lg font-bold text-gray-900">
            Cápsula de Difusión para WhatsApp
          </h3>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Mensaje formateado especialmente para reenviar a grupos comunitarios, comités de APR y vecinos sin cobertura para abrir páginas pesadas.
        </p>

        {/* Vista previa del mensaje de WhatsApp */}
        <div className="bg-[#e5ddd5] p-3.5 rounded-xl text-xs font-mono text-gray-800 max-h-72 overflow-y-auto border border-[#c4b9aa] whitespace-pre-wrap leading-relaxed shadow-inner">
          {whatsappMessage}
        </div>

        {/* Botones de acción */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Texto'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#25D366] text-white hover:bg-[#1ebc59] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <ExternalLink size={16} />
            <span>Abrir en WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
