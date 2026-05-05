import React from 'react';

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
    <div className="p-3 bg-green-50 rounded-lg">
      <Icon className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ label, icon: Icon, onClick, color = "green" }) => {
  const colorClasses = {
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    amber: "bg-amber-600 hover:bg-amber-700"
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white font-medium transition-all shadow-md active:scale-95 ${colorClasses[color]}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

const TimelineItem = ({ time, title, subtitle, status, onAction }) => {
  const statusColors = {
    'pendente': 'bg-amber-100 text-amber-700 border-amber-200',
    'em andamento': 'bg-blue-100 text-blue-700 border-blue-200',
    'concluido': 'bg-green-100 text-green-700 border-green-200'
  };

  return (
    <div className="flex group">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 rounded-full bg-green-500 z-10"></div>
        <div className="w-0.5 h-full bg-slate-200 group-last:hidden"></div>
      </div>
      <div className="flex-1 pb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-slate-400 w-12">{time}</div>
            <div>
              <h4 className="font-bold text-slate-800">{title}</h4>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[status] || statusColors.pendente}`}>
              {status.toUpperCase()}
            </span>
            <button 
              onClick={onAction}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatCard, QuickAction, TimelineItem };
