import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Settings, 
  Edit2, 
  Trash2, 
  Loader2,
  PackageOpen,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import { agendaService } from '../services/api';
import ServiceModal from '../components/Modals/ServiceModal';
import NewAppointmentModal from '../components/Modals/NewAppointmentModal';

const ServiceItem = ({ service, onEdit, onDelete }) => (
  <tr className="hover:bg-agro-bege/5 transition-colors group">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-agro-bege flex items-center justify-center text-agro-wine shadow-inner">
          <Settings size={20} />
        </div>
        <div>
          <div className="font-bold text-agro-brown font-serif italic text-lg">{service.name}</div>
          <div className="text-xs text-agro-gray font-medium line-clamp-1 max-w-xs">
            {service.description || 'Sem descrição cadastrada'}
          </div>
        </div>
      </div>
    </td>
    <td className="px-8 py-6">
      {service.estimated_duration ? (
        <div className="flex items-center gap-2 text-agro-gray text-sm font-medium">
          <Clock size={16} className="text-agro-sand" />
          {service.estimated_duration} min
        </div>
      ) : (
        <span className="text-agro-sand text-xs italic">Não informada</span>
      )}
    </td>
    <td className="px-8 py-6 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(service)}
          className="p-2 text-agro-sand hover:text-agro-brown transition-colors hover:bg-white rounded-lg shadow-sm"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(service.id)}
          className="p-2 text-agro-sand hover:text-red-500 transition-colors hover:bg-white rounded-lg shadow-sm"
          title="Excluir"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </td>
  </tr>
);

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await agendaService.getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedService(null);
    setIsServiceModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await agendaService.deleteService(id);
        fetchServices();
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Não foi possível excluir o serviço.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-agro-bege flex">
      <Sidebar onNewAppointment={() => setIsApptModalOpen(true)} />

      <main className="flex-1 ml-64 p-10">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-agro-brown">Serviços</h1>
              <p className="text-agro-gray font-medium">Gerencie seu catálogo de atendimentos e atividades</p>
            </div>
            <button 
              onClick={handleCreate}
              className="bg-agro-wine text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-agro-wine/20 flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer"
            >
              <Plus size={20} />
              Novo Serviço
            </button>
          </header>

          <div className="bg-white rounded-3xl shadow-sm border border-agro-sand/30 overflow-hidden">
            <div className="p-6 border-b border-agro-sand/20 bg-white/50">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar serviço por nome ou descrição..." 
                  className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10 font-medium text-agro-brown placeholder:text-agro-gray/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-agro-bege/10 text-agro-gray font-bold text-[10px] uppercase tracking-widest">
                    <th className="px-8 py-5">Serviço</th>
                    <th className="px-8 py-5">Duração</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-agro-sand/10">
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="px-8 py-20 text-center">
                        <Loader2 className="w-8 h-8 text-agro-wine animate-spin mx-auto mb-2" />
                        <p className="text-agro-gray font-medium">Carregando catálogo...</p>
                      </td>
                    </tr>
                  ) : filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <ServiceItem 
                        key={service.id} 
                        service={service} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-8 py-20 text-center">
                        <div className="w-16 h-16 bg-agro-bege/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PackageOpen className="text-agro-sand" size={32} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-agro-brown italic">
                          {search ? 'Nenhum resultado encontrado' : 'Catálogo vazio'}
                        </h3>
                        <p className="text-agro-gray mb-6 text-sm font-medium">
                          {search ? 'Tente buscar por termos diferentes ou limpe o filtro.' : 'Você ainda não possui serviços cadastrados.'}
                        </p>
                        {!search && (
                          <button 
                            onClick={handleCreate}
                            className="text-agro-wine font-bold flex items-center gap-2 mx-auto hover:underline text-sm uppercase tracking-widest"
                          >
                            <Plus size={16} />
                            Cadastrar primeiro serviço
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <ServiceModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={fetchServices}
        initialData={selectedService}
      />

      <NewAppointmentModal 
        isOpen={isApptModalOpen} 
        onClose={() => setIsApptModalOpen(false)}
      />
    </div>
  );
};

export default Services;
