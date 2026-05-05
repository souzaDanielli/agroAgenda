import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { authService } from './services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authService.login(email, password);
      navigate('/home'); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agro-bege flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-2xl shadow-agro-brown/5 border border-agro-sand/30">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agro-brown rounded-2xl mb-6 shadow-lg shadow-agro-brown/20">
            <span className="text-agro-bege font-serif text-3xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-agro-brown mb-2">Bem-vindo de volta</h1>
          <p className="text-agro-gray">Acesse sua conta AgroAgenda</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-brown uppercase tracking-wider ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-agro-brown uppercase tracking-wider">Senha</label>
              <a href="#" className="text-xs font-bold text-agro-wine hover:underline">Esqueceu?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-agro-brown text-agro-bege py-5 rounded-2xl font-bold hover:bg-agro-wine transition-all shadow-xl shadow-agro-brown/10 flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span>Entrar na conta</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-agro-gray">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-agro-wine font-bold hover:underline">
              Crie agora gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;