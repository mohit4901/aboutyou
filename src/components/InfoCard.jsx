const InfoCard = ({ icon, title, children, className = '' }) => {
    return (
      <div className={`bg-card rounded-xl p-5 shadow-card ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center text-success">
            {icon}
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <div className="text-muted-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    );
  };
  
  export default InfoCard;
  