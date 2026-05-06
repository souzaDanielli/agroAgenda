import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Briefcase, 
  Loader2,
  ChevronRight
} from 'lucide-react';
import { agendaService } from '../services/api';
import Sidebar from '../components/Layout/Sidebar';
import NewAppointmentModal from '../components/Modals/NewAppointmentModal';

const TimelineItem = ({ appt }) => {
  const statusConfig = {
    'pendente': { color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Pendente' },
    'em andamento': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Em andamento' },
    'concluido': { color: 'bg-green-100 text-green-700 border-green-200', label: 'Concluído' },
    'concluído': { color: 'bg-green-100 text-green-700 border-green-200', label: 'Concluído' },
    'cancelado': { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelado' }
  };

  const config = statusConfig[appt.status.toLowerCase()] || statusConfig.pendente;

  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-agro-wine mt-6 z-10"></div>
        <div className="w-px h-full bg-agro-sand group-last:hidden"></div>
      </div>
      <div className="flex-1 pb-6">
        <div className="bg-white p-5 rounded-2xl border border-agro-sand/30 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-agro-gray w-12">{appt.time}</span>
            <div>
              <h4 className="font-bold text-agro-brown text-lg">{appt.title}</h4>
              <p className="text-sm text-agro-gray">{appt.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
              {config.label.toUpperCase()}
            </span>
            <button className="p-2 text-agro-sand hover:text-agro-wine transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ clients: 0, services: 0 });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [appts, clients, services] = await Promise.all([
        agendaService.getTodayAppointments(),
        agendaService.getClients(),
        agendaService.getServices()
      ]);
      
      const formattedAppts = appts
        .filter(a => a.status !== 'cancelado' && a.status !== 'concluído')
        .map(a => ({
          id: a.id,
          time: new Date(a.appointment_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          title: a.service?.name || 'Visita Técnica',
          subtitle: `${a.client?.name || 'Cliente'} • ${a.observations || 'Sem observações'}`,
          status: a.status || 'pendente'
        }));

      setAppointments(formattedAppts);
      setStats({ clients: clients.length, services: services.length });
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('agro_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      } catch {
        setUserName('Produtor');
      }
    }

    const init = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agro-bege">
        <Loader2 className="w-8 h-8 text-agro-wine animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agro-bege flex">
      <Sidebar onNewAppointment={() => setIsModalOpen(true)} />
      
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h2 className="text-agro-gray font-bold uppercase tracking-widest text-xs mb-2">Painel de Controle</h2>
            <h1 className="text-3xl font-serif font-bold text-agro-brown italic">
              Olá, {userName || 'Produtor'}! 
            </h1>
          </header>

          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-agro-brown flex items-center gap-2">
                <Calendar className="text-agro-wine" size={24} />
                Agenda do Dia
              </h3>
              <div className="text-sm font-bold text-agro-gray bg-agro-sand/20 px-4 py-2 rounded-full">
                {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </div>
            </div>

            {appointments.length > 0 ? (
              <div className="space-y-1">
                {appointments.map(appt => (
                  <TimelineItem key={appt.id} appt={appt} />
                ))}
              </div>
            ) : (
              <div className="bg-white/50 rounded-3xl border-2 border-dashed border-agro-sand p-20 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Calendar className="text-agro-sand" size={32} />
                </div>
                <h4 className="text-xl font-bold text-agro-brown mb-2">Sem atendimentos hoje</h4>
                <p className="text-agro-gray">Sua agenda está livre. Aproveite para organizar seus contatos!</p>
              </div>
            )}
          </section>

          <footer className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80 decoration-agro-sand">
              <div className="bg-white/40 p-6 rounded-2xl flex items-center gap-4 border border-white">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-agro-wine shadow-sm">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-agro-gray uppercase tracking-tighter">Total de Clientes</p>
                  <p className="text-2xl font-bold text-agro-brown">{stats.clients}</p>
                </div>
              </div>
              <div className="bg-white/40 p-6 rounded-2xl flex items-center gap-4 border border-white">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-agro-wine shadow-sm">
                  <Briefcase size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-agro-gray uppercase tracking-tighter">Serviços no Mês</p>
                  <p className="text-2xl font-bold text-agro-brown">{stats.services}</p>
                </div>
              </div>
          </footer>
        </div>
      </main>

      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboardData}
      />
    </div>
  );
};

export default Home;