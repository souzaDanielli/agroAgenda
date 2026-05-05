import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Briefcase, 
  Plus, 
  Settings, 
  LogOut 
} from "lucide-react";
import { authService } from "../../services/api";

const Sidebar = ({ onNewAppointment }) => {
  const navigate = useNavigate();
  const navLinks = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard size={20} /> },
    { name: "Agendamentos", path: "/appointments", icon: <Calendar size={20} /> },
    { name: "Clientes", path: "/clients", icon: <Users size={20} /> },
    { name: "Serviços", path: "/services", icon: <Briefcase size={20} /> },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const activeStyle = "flex items-center gap-3 px-4 py-3 bg-white/10 text-agro-bege border-r-4 border-agro-bege transition-all";
  const inactiveStyle = "flex items-center gap-3 px-4 py-3 text-agro-bege/70 hover:bg-white/5 hover:text-agro-bege transition-all";

  return (
    <aside className="w-64 h-screen bg-agro-brown flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-8 text-center md:text-left">
        <h1 className="font-serif text-2xl font-bold text-agro-bege tracking-tight">
          AgroAgenda
        </h1>
      </div>

      <div className="px-4 mb-8">
        <button 
          onClick={onNewAppointment}
          className="w-full bg-agro-wine hover:opacity-90 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} />
          <span>Novo agendamento</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1 mt-auto">
        <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </NavLink>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 transition-all rounded-md"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
