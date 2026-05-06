import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Briefcase, FileText, Loader2 } from 'lucide-react';
import Select from 'react-select';
import { agendaService } from '../../services/api';

const AppointmentModal = ({ isOpen, onClose, onSuccess, appointment = null }) => {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const isEditing = !!appointment;

  const [formData, setFormData] = useState({
    client_id: '',
    service_id: '',
    appointment_date: '',
    observations: '',
    status: 'pendente'
  });

  useEffect(() => {
    if (isOpen) {
      const loadOptions = async () => {
        try {
          const [clientsData, servicesData] = await Promise.all([
            agendaService.getClients(),
            agendaService.getServices()
          ]);
          
          const clientOptions = clientsData.map(c => ({
            value: c.id,
            label: c.name
          }));
          
          setClients(clientOptions);
          setServices(servicesData);

          if (appointment) {
            // Formatar data para datetime-local (YYYY-MM-DDTHH:MM)
            const date = new Date(appointment.appointment_date);
            const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
              .toISOString()
              .slice(0, 16);

            setFormData({
              client_id: appointment.client_id,
              service_id: appointment.service_id,
              appointment_date: formattedDate,
              observations: appointment.observations || '',
              status: appointment.status || 'pendente'
            });
          } else {
            setFormData({
              client_id: '',
              service_id: '',
              appointment_date: '',
              observations: '',
              status: 'pendente'
            });
          }
        } catch (err) {
          console.error("Erro ao carregar opções:", err);
        } finally {
          setLoading(false);
        }
      };
      loadOptions();
    }
  }, [isOpen, appointment]);

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(237, 224, 212, 0.2)',
      borderColor: state.isFocused ? '#7F5539' : 'rgba(127, 85, 57, 0.5)',
      borderRadius: '1rem',
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
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        await agendaService.updateAppointment(appointment.id, formData);
      } else {
        await agendaService.createAppointment(formData);
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      alert("Erro ao salvar agendamento. Verifique os campos.");
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
            <Calendar size={24} className="text-agro-wine" />
            {isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-agro-bege rounded-full transition-colors">
            <X size={20} className="text-agro-gray" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-agro-brown mb-2 flex items-center gap-2">
                <User size={16} /> Produtor / Cliente
              </label>
              <Select
                options={clients}
                value={clients.find(c => c.value === formData.client_id)}
                onChange={(opt) => setFormData({...formData, client_id: opt.value})}
                placeholder="Selecione o produtor..."
                styles={customSelectStyles}
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-agro-brown mb-2 flex items-center gap-2">
                <Briefcase size={16} /> Serviço
              </label>
              <select
                required
                value={formData.service_id}
                onChange={(e) => setFormData({...formData, service_id: e.target.value})}
                className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 text-agro-brown font-medium"
              >
                <option value="">Selecione o serviço...</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - R$ {s.base_price}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-agro-brown mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Data e Hora
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.appointment_date}
                  onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                  className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 text-agro-brown font-medium"
                />
              </div>
              {isEditing && (
                <div>
                  <label className="text-sm font-bold text-agro-brown mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 text-agro-brown font-medium"
                  >
                    <option value="pendente">PENDENTE</option>
                    <option value="em andamento">EM ANDAMENTO</option>
                    <option value="concluido">CONCLUÍDO</option>
                    <option value="cancelado">CANCELADO</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-bold text-agro-brown mb-2 flex items-center gap-2">
                <FileText size={16} /> Observações
              </label>
              <textarea
                placeholder="Detalhes adicionais da visita..."
                value={formData.observations}
                onChange={(e) => setFormData({...formData, observations: e.target.value})}
                className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 text-agro-brown font-medium min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border border-agro-sand text-agro-brown font-bold rounded-2xl hover:bg-agro-bege transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-4 bg-agro-wine text-white font-bold rounded-2xl hover:bg-agro-brown transition-all shadow-lg shadow-agro-wine/20 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isEditing ? 'Salvar Edição' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;