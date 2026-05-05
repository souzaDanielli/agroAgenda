import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar,
  Loader2
} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import { agendaService } from '../services/api';
import NewAppointmentModal from '../components/Modals/NewAppointmentModal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await agendaService.getTodayAppointments(); // Ou getAppointments() se existir
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-agro-bege flex">
      <Sidebar onNewAppointment={() => setIsModalOpen(true)} />

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
                  className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-agro-gray hover:bg-agro-bege/50 rounded-lg transition-colors border border-agro-sand/30">
                  <Filter size={18} />
                  <span>Filtrar</span>
                </button>
                <div className="h-8 w-px bg-agro-sand/30 mx-2"></div>
                <span className="text-sm text-agro-gray font-medium">{appointments.length} agendamentos encontrados</span>
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
                  ) : appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-agro-bege/5 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-agro-brown">{appt.client?.name || 'Cliente'}</div>
                          <div className="text-xs text-agro-gray">ID: #{appt.id}</div>
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
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                            ${appt.status === 'concluído' ? 'bg-green-100 text-green-700 border-green-200' : 
                              appt.status === 'em andamento' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                              'bg-amber-100 text-amber-700 border-amber-200'}`}>
                            {(appt.status || 'pendente').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-agro-sand hover:text-agro-brown transition-colors">
                            <MoreVertical size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center">
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

      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchAppointments}
      />
    </div>
  );
};

export default Appointments;
