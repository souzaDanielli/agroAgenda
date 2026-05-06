import React, { useState } from 'react';
import { X, User, Phone, MapPin, Mail, Loader2 } from 'lucide-react';
import { agendaService } from '../../services/api';

const ClientModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farm_name: '',
    location: ''
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        farm_name: initialData.farm_name || '',
        location: initialData.location || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', farm_name: '', location: '' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (initialData?.id) {
        await agendaService.updateClient(initialData.id, formData);
      } else {
        await agendaService.createClient(formData);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      alert("Erro ao salvar cliente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-agro-brown/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-agro-sand/20 flex items-center justify-between bg-agro-bege/10">
          <h2 className="text-xl font-bold text-agro-brown flex items-center gap-2">
            <User className="text-agro-wine" size={24} />
            {initialData ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-agro-sand/20 rounded-full transition-colors">
            <X size={24} className="text-agro-gray" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Nome Completo
            </label>
            <input
              required
              type="text"
              placeholder="Ex: João Silva"
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> E-mail
            </label>
            <input
              type="email"
              placeholder="joao@exemplo.com"
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
                <Phone size={14} /> Telefone
              </label>
              <input
                type="text"
                placeholder="(11) 99999-9999"
                className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Localização
              </label>
              <input
                type="text"
                placeholder="Ex: R. Jamil, 120"
                className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} /> Nome da Fazenda
            </label>
            <input
              type="text"
              placeholder="Ex: Fazenda Santa Maria"
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
              value={formData.farm_name}
              onChange={(e) => setFormData({...formData, farm_name: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-agro-gray hover:bg-agro-sand/10 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-agro-wine text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? <Loader2 className="animate-spin" size={20} /> : (initialData ? "Salvar" : "Cadastrar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;