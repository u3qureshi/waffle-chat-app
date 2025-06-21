const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-light-yellow/40 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-dijon/10 ${
                i % 2 === 0 ? "animate-pulse bg-dijon-400/90" : "bg-dijon-600/70"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-brown-900">{title}</h2>
        <p className="text-base-content/60 text-brown-700">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;