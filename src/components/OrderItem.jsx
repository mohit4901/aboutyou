const OrderItem = ({ name, variant, quantity, price, image }) => {
    return (
      <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
        <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{name}</h4>
          <p className="text-sm text-muted-foreground">{variant}</p>
          <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-semibold text-foreground">${price.toFixed(2)}</p>
        </div>
      </div>
    );
  };
  
  export default OrderItem;
  