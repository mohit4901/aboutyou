const SuccessCheckmark = () => {
    return (
      <div className="relative">
        {/* Pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-success/20 animate-pulse-ring" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-success/10 animate-pulse-ring animation-delay-500" />
        </div>
        
        {/* Main circle with checkmark */}
        <div className="relative w-24 h-24 animate-circle">
          <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
            <circle 
              cx="48" 
              cy="48" 
              r="46" 
              className="fill-success"
            />
            <path
              d="M28 50L42 64L68 38"
              className="stroke-success-foreground animate-check"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default SuccessCheckmark;
  