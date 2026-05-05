import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, User, Mail, Lock, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from './services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      await authService.register(formData);
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Ocorreu um erro ao criar sua conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agro-bege flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-2xl shadow-agro-brown/5 border border-agro-sand/30">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agro-wine rounded-2xl mb-6 shadow-lg shadow-agro-wine/20">
            <ShieldCheck className="text-agro-bege" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-agro-brown mb-2">Criar sua conta</h1>
          <p className="text-agro-gray text-sm">Junte-se a centenas de agrônomos que já usam o AgroAgenda</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-brown uppercase tracking-wider ml-1">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="text" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="Ex: Pedro Silva"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-brown uppercase tracking-wider ml-1">E-mail Profissional</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="exemplo@agro.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-brown uppercase tracking-wider ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-brown uppercase tracking-wider ml-1">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-agro-bege/30 border border-agro-sand/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/20 transition-all"
                placeholder="Repita sua senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-agro-wine text-agro-bege py-5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-agro-wine/10 flex items-center justify-center space-x-2 disabled:opacity-70 mt-4 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span>Cadastrar agora</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-agro-gray text-sm">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-agro-wine font-bold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;