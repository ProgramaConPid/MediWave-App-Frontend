const FloatingHexagons = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
            <path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHexagons;
