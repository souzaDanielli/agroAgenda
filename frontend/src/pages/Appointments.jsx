import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2,
  Trash2, 
  Calendar,
  Loader2
} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import api, { agendaService } from '../services/api';
import AppointmentModal from '../components/Modals/AppointmentModal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Removendo filtro de data para ver todos os agendamentos na lista geral
      const response = await api.get('/appointments/');
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/${id}`, { status: newStatus });
      // Atualiza o estado local para evitar uma nova requisição completa se quiser mais performance
      // Mas chamar fetchAppointments() garante que os dados estão sincronizados
      fetchAppointments();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Não foi possível atualizar o status.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        await agendaService.deleteAppointment(id);
        fetchAppointments();
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Não foi possível excluir o agendamento.");
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appt => {
    const searchLower = searchTerm.toLowerCase();
    const clientName = (appt.client?.name || '').toLowerCase();
    const serviceName = (appt.service?.name || '').toLowerCase();
    
    return clientName.includes(searchLower) || serviceName.includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-agro-bege flex">
      <Sidebar onNewAppointment={() => {
        setSelectedAppointment(null);
        setIsModalOpen(true);
      }} />

      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-agro-brown">Agendamentos</h1>
              <p className="text-agro-gray">Gerencie suas visitas e consultorias</p>
            </div>
          </header>

          <div className="bg-white rounded-3xl shadow-sm border border-agro-sand/30 overflow-hidden">
            <div className="p-6 border-b border-agro-sand/20 bg-white/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar agendamento..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-agro-gray font-medium">{filteredAppointments.length} agendamentos encontrados</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-agro-bege/10 text-agro-brown font-bold text-sm uppercase tracking-wider">
                    <th className="px-8 py-5">Cliente</th>
                    <th className="px-8 py-5">Serviço</th>
                    <th className="px-8 py-5">Data / Hora</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Observações</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-agro-sand/10">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center">
                        <Loader2 className="w-8 h-8 text-agro-wine animate-spin mx-auto mb-2" />
                        <p className="text-agro-gray">Carregando agendamentos...</p>
                      </td>
                    </tr>
                  ) : filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-agro-bege/5 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="text-agro-brown">{appt.client?.name || 'Cliente'}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-agro-sand/20 text-agro-wine px-3 py-1 rounded-lg text-sm font-medium">
                            {appt.service?.name || 'Visita Técnica'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-agro-gray font-medium">
                          {new Date(appt.appointment_date).toLocaleDateString()} às {new Date(appt.appointment_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="px-8 py-6">
                          <select
                            value={appt.status || 'pendente'}
                            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border cursor-pointer outline-none focus:ring-2 focus:ring-agro-wine/10 appearance-none text-center
                              ${appt.status === 'concluído' ? 'bg-green-100 text-green-700 border-green-200' : 
                                appt.status === 'em andamento' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                appt.status === 'cancelado' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-amber-100 text-amber-700 border-amber-200'}`}
                          >
                            <option value="pendente" className="bg-white text-agro-brown">PENDENTE</option>
                            <option value="em andamento" className="bg-white text-agro-brown">EM ANDAMENTO</option>
                            <option value="concluído" className="bg-white text-agro-brown">CONCLUÍDO</option>
                            <option value="cancelado" className="bg-white text-agro-brown">CANCELADO</option>
                          </select>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm text-agro-gray truncate max-w-[200px]" title={appt.observations}>
                            {appt.observations || <span className="italic opacity-50">Sem obs.</span>}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                setSelectedAppointment(appt);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-agro-sand hover:text-agro-brown transition-colors hover:bg-white rounded-lg shadow-sm"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(appt.id)}
                              className="p-2 text-agro-sand hover:text-red-500 transition-colors hover:bg-white rounded-lg shadow-sm"
                              title="Excluir"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-8 py-20 text-center">
                        <div className="w-16 h-16 bg-agro-bege/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="text-agro-sand" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-agro-brown">Nenhum agendamento encontrado</h3>
                        <p className="text-agro-gray">Você ainda não possui agendamentos cadastrados neste período.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSuccess={fetchAppointments}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default Appointments;
