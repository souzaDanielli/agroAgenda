import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  User, 
  Phone, 
  MapPin, 
  Edit2, 
  Eye, 
  Loader2,
  Users
} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import { agendaService } from '../services/api';
import ClientModal from '../components/Modals/ClientModal';
import NewAppointmentModal from '../components/Modals/NewAppointmentModal';

const ClientItem = ({ client, onEdit }) => (
  <tr className="hover:bg-agro-bege/5 transition-colors group">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-agro-bege flex items-center justify-center text-agro-wine font-bold text-lg">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-bold text-agro-brown">{client.name}</div>
          <div className="text-xs text-agro-gray">{client.email || 'Sem e-mail'}</div>
        </div>
      </div>
    </td>
    <td className="px-8 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-agro-gray text-sm">
          <MapPin size={16} className="text-agro-sand" />
          {client.farm_name || 'Fazenda não informada'}
        </div>
        {client.location && (
          <div className="text-xs text-agro-gray/60 ml-6">
            {client.location}
          </div>
        )}
      </div>
    </td>
    <td className="px-8 py-6">
      <div className="flex items-center gap-2 text-agro-gray text-sm font-medium">
        <Phone size={16} className="text-agro-sand" />
        {client.phone || 'Sem telefone'}
      </div>
    </td>
    <td className="px-8 py-6 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(client)}
          className="p-2 text-agro-sand hover:text-agro-brown transition-colors hover:bg-white rounded-lg shadow-sm"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        <button 
          className="p-2 text-agro-sand hover:text-agro-wine transition-colors hover:bg-white rounded-lg shadow-sm"
          title="Ver Detalhes"
        >
          <Eye size={18} />
        </button>
      </div>
    </td>
  </tr>
);

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await agendaService.getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.farm_name && c.farm_name.toLowerCase().includes(search.toLowerCase())) ||
    (c.location && c.location.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedClient(null);
    setIsClientModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-agro-bege flex">
      <Sidebar onNewAppointment={() => setIsApptModalOpen(true)} />

      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-agro-brown">Clientes</h1>
              <p className="text-agro-gray">Gerencie sua carteira de produtores e propriedades</p>
            </div>
            <button 
              onClick={handleCreate}
              className="bg-agro-wine text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <Plus size={20} />
              Novo Cliente
            </button>
          </header>

          <div className="bg-white rounded-3xl shadow-sm border border-agro-sand/30 overflow-hidden">
            <div className="p-6 border-b border-agro-sand/20 bg-white/50">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-agro-sand" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar cliente por nome ou propriedade..." 
                  className="w-full bg-agro-bege/20 border border-agro-sand/50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-wine/10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-agro-bege/10 text-agro-brown font-bold text-sm uppercase tracking-wider">
                    <th className="px-8 py-5">Cliente</th>
                    <th className="px-8 py-5">Propriedade</th>
                    <th className="px-8 py-5">Contato</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-agro-sand/10">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                        <Loader2 className="w-8 h-8 text-agro-wine animate-spin mx-auto mb-2" />
                        <p className="text-agro-gray">Carregando clientes...</p>
                      </td>
                    </tr>
                  ) : filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <ClientItem 
                        key={client.id} 
                        client={client} 
                        onEdit={handleEdit}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center">
                        <div className="w-16 h-16 bg-agro-bege/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="text-agro-sand" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-agro-brown">
                          {search ? 'Nenhum resultado encontrado' : 'Nenhum cliente cadastrado'}
                        </h3>
                        <p className="text-agro-gray mb-6">
                          {search ? 'Tente buscar por termos diferentes.' : 'Sua lista está vazia. Comece agora!'}
                        </p>
                        {!search && (
                          <button 
                            onClick={handleCreate}
                            className="text-agro-wine font-bold flex items-center gap-2 mx-auto hover:underline"
                          >
                            <Plus size={18} />
                            Cadastrar primeiro cliente
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

      <ClientModal 
        isOpen={isClientModalOpen} 
        onClose={() => setIsClientModalOpen(false)}
        onSuccess={fetchClients}
        initialData={selectedClient}
      />

      <NewAppointmentModal 
        isOpen={isApptModalOpen} 
        onClose={() => setIsApptModalOpen(false)}
      />
    </div>
  );
};

export default Clients;