import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { agendaService } from '../../services/api';

const ServiceModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    estimated_duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        estimated_duration: initialData.estimated_duration || ''
      });
    } else {
      setFormData({ name: '', description: '', estimated_duration: '' });
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        estimated_duration: formData.estimated_duration ? parseInt(formData.estimated_duration) : null
      };

      if (initialData) {
        await agendaService.updateService(initialData.id, payload);
      } else {
        await agendaService.createService(payload);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao salvar serviço:', err);
      setError('Erro ao salvar serviço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-agro-brown/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-white">
        <div className="px-8 py-6 border-b border-agro-bege/30 flex justify-between items-center bg-agro-bege/10">
          <h3 className="text-xl font-serif font-bold text-agro-brown italic">
            {initialData ? 'Editar Serviço' : 'Novo Serviço'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-agro-bege/50 rounded-full transition-colors text-agro-gray">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-agro-gray uppercase tracking-widest mb-2">Nome do Serviço</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-agro-bege/10 border border-agro-sand/30 rounded-xl focus:ring-2 focus:ring-agro-wine/10 focus:border-agro-wine/30 transition-all outline-none text-agro-brown font-medium placeholder:text-agro-gray/30"
              placeholder="Ex: Consultoria Técnica"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-agro-gray uppercase tracking-widest mb-2">Descrição</label>
            <textarea
              className="w-full px-4 py-3 bg-agro-bege/10 border border-agro-sand/30 rounded-xl focus:ring-2 focus:ring-agro-wine/10 focus:border-agro-wine/30 transition-all outline-none resize-none text-agro-brown font-medium placeholder:text-agro-gray/30"
              rows="3"
              placeholder="Descreva brevemente o serviço..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-agro-gray uppercase tracking-widest mb-2">Duração Estimada (min)</label>
            <input
              type="number"
              className="w-full px-4 py-3 bg-agro-bege/10 border border-agro-sand/30 rounded-xl focus:ring-2 focus:ring-agro-wine/10 focus:border-agro-wine/30 transition-all outline-none text-agro-brown font-medium placeholder:text-agro-gray/30"
              placeholder="60"
              value={formData.estimated_duration}
              onChange={(e) => setFormData({ ...formData, estimated_duration: e.target.value })}
            />
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-agro-sand/30 text-agro-gray font-bold rounded-xl hover:bg-agro-bege/10 transition-all text-sm uppercase tracking-widest disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-agro-wine text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-agro-wine/20 transition-all active:scale-95 text-sm uppercase tracking-widest disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                'Salvar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
