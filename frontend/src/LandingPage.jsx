import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Settings, 
  Users, 
  ClipboardCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Menu,
  X,
  PieChart
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-agro-bege/80 backdrop-blur-md border-b border-agro-sand px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-agro-brown rounded flex items-center justify-center">
              <span className="text-agro-bege font-serif font-bold">A</span>
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">AgroAgenda</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#problema" className="hover:text-agro-wine transition-colors">O Desafio</a>
            <a href="#solucao" className="hover:text-agro-wine transition-colors">A Solução</a>
            <a href="#como-funciona" className="hover:text-agro-wine transition-colors">Como Funciona</a>
            <Link to="/login" className="bg-agro-brown text-agro-bege px-5 py-2 rounded-agro hover:bg-agro-wine transition-all shadow-sm">
              Entrar
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-agro-bege border-b border-agro-sand p-6 flex flex-col space-y-4">
            <a href="#problema" onClick={() => setIsMenuOpen(false)}>O Desafio</a>
            <a href="#solucao" onClick={() => setIsMenuOpen(false)}>A Solução</a>
            <a href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como Funciona</a>
            <button className="bg-agro-brown text-agro-bege px-5 py-2 rounded-agro w-full">Entrar</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Organic Background Shape */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-agro-sand/20 rounded-bl-[100px] pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 -z-10 w-96 h-96 bg-agro-wine/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-agro-sand/50 px-4 py-1.5 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agro-wine opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-agro-wine"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-agro-brown">Organização simples para serviços no campo</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl leading-[1.05] tracking-tight text-agro-brown">
              O futuro do <br />
              <span className="italic font-serif text-agro-wine">agronegócio</span> <br />
              é organizado.
            </h1>
            
            <p className="text-agro-gray text-xl max-w-lg leading-relaxed font-light">
              Transforme sua consultoria técnica com uma plataforma premium desenhada para a precisão do campo e a agilidade do escritório.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/cadastro" className="bg-agro-brown text-agro-bege px-10 py-5 rounded-full hover:bg-agro-wine hover:-translate-y-1 transition-all flex items-center space-x-3 shadow-xl shadow-agro-brown/20 font-bold group">
                <span>Começar Gratuitamente</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Premium Mockup Section */}
          <div className="relative lg:h-[600px] flex items-center">
            {/* Real Field Background with Organic Shape */}
            <div className="absolute inset-0 -z-10 transform scale-110 lg:scale-125">
              <div className="w-full h-full opacity-30 grayscale-[0.2] blur-[2px] rounded-[60px_20px_100px_40px] overflow-hidden rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
                  alt="Agro field" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Laptop Mockup */}
            <div className="relative z-10 w-full group">
              <div className="relative mx-auto max-w-[540px] perspective-1000">
                {/* Visual Notebook Frame */}
                <div className="bg-[#1a1a1a] p-3 rounded-[24px] shadow-[0_50px_100px_-20px_rgba(74,63,53,0.3)] border-t border-white/10 transform transition-transform duration-500 group-hover:-rotate-1 group-hover:-translate-y-2">
                  <div className="bg-[#2a2a2a] rounded-[18px] overflow-hidden aspect-[16/10] relative">
                    {/* Simulated Interface */}
                    <div className="absolute inset-0 bg-agro-bege p-6">
                      <div className="flex items-center justify-between mb-8">
                        <div className="h-6 w-32 bg-agro-brown/10 rounded-lg"></div>
                        <div className="flex space-x-2">
                           <div className="w-8 h-8 rounded-full bg-agro-brown/5"></div>
                           <div className="w-8 h-8 rounded-full bg-agro-brown/5"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-24 bg-white rounded-2xl border border-agro-sand/30 p-4 shadow-sm">
                            <div className="h-2 w-1/2 bg-agro-brown/10 rounded-full mb-3"></div>
                            <div className="h-4 w-3/4 bg-agro-wine/10 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <div className="h-32 bg-white rounded-2xl border border-agro-sand/30 p-6 flex items-center justify-between">
                           <div className="space-y-3 w-1/2">
                              <div className="h-3 w-full bg-agro-brown/5 rounded-full"></div>
                              <div className="h-3 w-2/3 bg-agro-brown/5 rounded-full"></div>
                           </div>
                           <div className="w-16 h-16 rounded-2xl bg-agro-brown/10 flex items-center justify-center">
                              <PieChart className="text-agro-wine" />
                           </div>
                        </div>
                      </div>
                    </div>
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
                {/* Notebook Bottom Part */}
                <div className="h-3 w-[105%] bg-[#0f0f0f] mx-auto -mt-1 rounded-full shadow-2xl relative left-[-2.5%] brightness-125"></div>
              </div>
            </div>

            {/* Floating Organic Element */}
            <div className="absolute -bottom-10 -right-4 md:right-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-[30px_10px_30px_10px] shadow-2xl border border-agro-sand/50 hidden sm:block animate-bounce-slow">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-agro-wine/10 flex items-center justify-center">
                    <Users size={24} className="text-agro-wine" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-agro-gray font-bold">Produtores Ativos</div>
                    <div className="text-2xl font-serif font-bold text-agro-brown">2,480+</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-24 px-6 bg-agro-bege">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl leading-tight">Tudo o que você precisa em uma única plataforma.</h2>
                <p className="text-agro-gray">Criado por quem entende as necessidades do técnico em campo.</p>
              </div>
              
              <div className="space-y-8">
                {[
                  { title: 'Gestão de Produtores', desc: 'Centralize dados, contatos e localização das fazendas.' },
                  { title: 'Agendamento Inteligente', desc: 'Filtre por data e tenha controle total dos seus horários.' },
                  { title: 'Histórico Completo', desc: 'Todas as visitas e análises salvas para futuras consultas.' }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <CheckCircle2 className="text-agro-wine shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-agro-gray text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-white p-6 rounded-agro shadow-sm border border-agro-sand">
                   <Users className="text-agro-wine mb-3" />
                   <div className="font-bold text-sm">Controle de Clientes</div>
                </div>
                <div className="bg-agro-brown p-6 rounded-agro shadow-sm text-agro-bege">
                   <Calendar className="mb-3" />
                   <div className="font-bold text-sm">Agenda Direta</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-agro-sand p-6 rounded-agro shadow-sm">
                   <MapPin className="text-agro-brown mb-3" />
                   <div className="font-bold text-sm">Mapeamento Rural</div>
                </div>
                <div className="bg-white p-6 rounded-agro shadow-sm border border-agro-sand">
                   <Settings className="text-agro-wine mb-3" />
                   <div className="font-bold text-sm">Personalização</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section - Modern Step Style */}
      <section id="como-funciona" className="py-40 bg-agro-bege/50 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-24">
              <h2 className="text-4xl md:text-6xl text-agro-brown">Jornada da Eficiência</h2>
              <div className="w-24 h-1 bg-agro-wine mx-auto rounded-full"></div>
            </div>

            <div className="relative">
              {/* Connector Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-agro-sand/50 -translate-y-12"></div>
              
              <div className="grid lg:grid-cols-3 gap-20">
                {[
                  { step: '01', title: 'Integração', desc: 'Sincronize seus dados e importe sua base de clientes atual com facilidade.' },
                  { step: '02', title: 'Planejamento', desc: 'O sistema sugere as melhores rotas e horários para suas visitas técnicas.' },
                  { step: '03', title: 'Execução', desc: 'Atenda seus produtores, registre tudo no app e gere valor instantâneo.' }
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-agro-bege shadow-xl mb-10 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl font-serif font-bold text-agro-wine">{item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-agro-brown mb-4">{item.title}</h3>
                    <p className="text-agro-gray leading-relaxed max-w-[280px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* CTA Section - Simple & Strong */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-agro-brown rounded-[60px] p-12 md:p-32 text-center space-y-12 relative overflow-hidden shadow-2xl">
            {/* Organic patterns in CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-agro-wine/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <h2 className="text-4xl md:text-7xl text-agro-bege leading-tight max-w-4xl mx-auto">
              Sua consultoria merece <br /> 
              <span className="italic">tecnologia de ponta.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 pt-6">
              <Link to="/cadastro" className="bg-agro-bege text-agro-brown px-12 py-5 rounded-full hover:bg-white transition-all font-bold text-lg shadow-xl w-full sm:w-auto text-center">
                Experimentar Agora
              </Link>
            </div>
            
            <p className="text-agro-bege/50 text-sm font-medium tracking-widest uppercase">Gratuito</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 border-t border-agro-sand/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-agro-brown rounded-lg flex items-center justify-center">
                <span className="text-agro-bege text-xs font-serif font-bold">A</span>
              </div>
              <span className="text-xl font-serif font-bold text-agro-brown">AgroAgenda</span>
            </div>
            <p className="text-agro-gray max-w-xs leading-relaxed">
              Elevando o padrão da consultoria técnica no agronegócio através de tecnologia e inteligência.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-agro-brown">Navegação</h4>
            <div className="flex flex-col space-y-2 text-agro-gray text-sm">
              <a href="#" className="hover:text-agro-wine transition-colors">Benefícios</a>
              <a href="#" className="hover:text-agro-wine transition-colors">Funcionalidades</a>
              <a href="#" className="hover:text-agro-wine transition-colors">Preços</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-agro-sand/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-agro-gray text-xs">© 2026 AgroAgenda. Todos os direitos reservados.</p>
          <div className="flex space-x-8">
             <div className="w-5 h-5 bg-agro-sand/30 rounded-full"></div>
             <div className="w-5 h-5 bg-agro-sand/30 rounded-full"></div>
             <div className="w-5 h-5 bg-agro-sand/30 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
