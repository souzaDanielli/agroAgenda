import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Briefcase, FileText, Loader2 } from 'lucide-react';
import Select from 'react-select';
import { agendaService } from '../../services/api';

const NewAppointmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    service_id: '',
    appointment_date: '',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      const loadOptions = async () => {
        try {
          const [clientsData, servicesData] = await Promise.all([
            agendaService.getClients(),
            agendaService.getServices()
          ]);
          
          // Formatar clientes para o padrão do react-select
          const clientOptions = clientsData.map(c => ({
            value: c.id,
            label: c.name
          }));
          
          setClients(clientOptions);
          setServices(servicesData);
        } catch (err) {
          console.error("Erro ao carregar opções:", err);
        } finally {
          setLoading(false);
        }
      };
      loadOptions();
    }
  }, [isOpen]);

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(237, 224, 212, 0.2)', // agro-bege/20
      borderColor: state.isFocused ? '#7F5539' : 'rgba(127, 85, 57, 0.5)', // agro-wine vs agro-sand/50
      borderRadius: '1rem', // 2xl
      padding: '0.2rem',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(127, 85, 57, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#7F5539',
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#7F5539' : state.isFocused ? 'rgba(127, 85, 57, 0.1)' : 'white',
      color: state.isSelected ? 'white' : '#4A3F35',
      '&:active': {
        backgroundColor: '#7F5539',
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#4A3F35',
      fontWeight: '500'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#7F5539',
      opacity: 0.6
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // O backend espera o formato ISO ou compatível. 
      // O input datetime-local já fornece algo próximo, mas vamos garantir.
      await agendaService.createAppointment(formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      alert("Erro ao criar agendamento. Verifique os campos.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-agro-brown/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-agro-sand/20 flex items-center justify-between bg-agro-bege/10">
          <h2 className="text-xl font-bold text-agro-brown flex items-center gap-2">
            <Calendar className="text-agro-wine" size={24} />
            Novo Agendamento
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-agro-sand/20 rounded-full transition-colors"
          >
            <X size={24} className="text-agro-gray" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <User size={16} /> Cliente
            </label>
            <Select
              required
              isLoading={loading}
              options={clients}
              placeholder="Digite o nome do cliente..."
              noOptionsMessage={() => "Nenhum cliente encontrado"}
              styles={customSelectStyles}
              onChange={(option) => setFormData({...formData, client_id: option.value})}
              isSearchable={true}
              classNamePrefix="react-select"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} /> Serviço
            </label>
            <select
              required
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
              value={formData.service_id}
              onChange={(e) => setFormData({...formData, service_id: e.target.value})}
            >
              <option value="">Selecione um serviço</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} /> Data e Hora
            </label>
            <input
              required
              type="datetime-local"
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
              value={formData.appointment_date}
              onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-agro-gray uppercase tracking-wider flex items-center gap-2">
              <FileText size={16} /> Observações
            </label>
            <textarea
              rows="3"
              placeholder="Descreva brevemente o objetivo da visita..."
              className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-agro-gray hover:bg-agro-sand/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 bg-agro-wine text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-agro-wine/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" size={20} /> : "Agendar Visita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;