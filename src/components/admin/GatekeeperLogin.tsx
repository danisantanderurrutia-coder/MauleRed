import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { AuthUser, UserRole } from '../../types';
import { Lock, Shield, KeyRound, ArrowRight, UserCheck, Eye, EyeOff } from 'lucide-react';

interface GatekeeperLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const GatekeeperLogin: React.FC<GatekeeperLoginProps> = ({ onSuccess, onCancel }) => {
  const { loginUser } = useAppData();
  
  const [pinOrKey, setPinOrKey] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('editor');
  const [userName, setUserName] = useState('Mariana Gómez');
  const [errorMsg, setErrorMsg] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Claves maestras / PINs válidos
  // PIN maestro: 1342 o admin123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const input = pinOrKey.trim();

    if (input === '1342' || input === 'admin123' || input.toLowerCase() === 'maulesur') {
      const user: AuthUser = {
        username: userName.toLowerCase().replace(/\s+/g, '.'),
        name: userName,
        role: selectedRole,
        avatar: undefined
      };
      loginUser(user);
      onSuccess();
    } else {
      setErrorMsg('PIN o Clave Maestra incorrecta. (Prueba con el PIN rápido: 1342)');
    }
  };

  const handleQuickPreset = (role: UserRole, name: string) => {
    setSelectedRole(role);
    setUserName(name);
    setPinOrKey('1342');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1013]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#181c22] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-800 text-gray-200 relative">
        
        {/* Encabezado Gatekeeper */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b84227] to-[#e4a834] flex items-center justify-center mx-auto shadow-lg text-white">
            <Lock size={28} />
          </div>
          <span className="text-[10px] font-black tracking-widest text-[#e4a834] uppercase block">
            Acceso Seguro • Gatekeeper
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
            Santuario de Redacción
          </h2>
          <p className="text-xs text-gray-400">
            Panel de control, moderación territorial y gestión de audio de la Red Maule Sur.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Selección de Rol */}
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1.5">
              Rol de Acceso Territorial
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickPreset('admin', 'Directorio Popular')}
                className={`py-2 px-2 rounded-xl font-bold border transition-all text-center ${
                  selectedRole === 'admin'
                    ? 'bg-[#b84227] text-white border-[#b84227] shadow'
                    : 'bg-[#222831] text-gray-400 border-gray-700 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('editor', 'Mariana Gómez')}
                className={`py-2 px-2 rounded-xl font-bold border transition-all text-center ${
                  selectedRole === 'editor'
                    ? 'bg-[#b84227] text-white border-[#b84227] shadow'
                    : 'bg-[#222831] text-gray-400 border-gray-700 hover:text-white'
                }`}
              >
                Editor/a
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('corresponsal', 'Don Juan Sepúlveda')}
                className={`py-2 px-2 rounded-xl font-bold border transition-all text-center ${
                  selectedRole === 'corresponsal'
                    ? 'bg-[#b84227] text-white border-[#b84227] shadow'
                    : 'bg-[#222831] text-gray-400 border-gray-700 hover:text-white'
                }`}
              >
                Corresponsal
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Nombre de Redactor / Corresponsal
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-xs bg-[#222831] border border-gray-700 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-[#b84227] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Clave Maestra o PIN (Prueba: 1342)
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                required
                placeholder="Ingresa PIN o clave maestra..."
                value={pinOrKey}
                onChange={(e) => {
                  setPinOrKey(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full text-xs bg-[#222831] border border-gray-700 rounded-xl p-2.5 pr-10 text-white focus:ring-2 focus:ring-[#b84227] focus:outline-none tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                aria-label="Alternar visibilidad"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-800/50">
              {errorMsg}
            </div>
          )}

          {/* Acciones */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Volver a la Web
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-white bg-[#b84227] hover:bg-[#a0361e] shadow-lg flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <span>Ingresar</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </form>

        {/* Pista amigable */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-[11px] text-gray-500 text-center">
          Credencial de prueba preconfigurada: <strong className="text-amber-400">PIN: 1342</strong> o <strong className="text-amber-400">admin123</strong>
        </div>

      </div>
    </div>
  );
};
