export function GuildLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img
        src="/src/imports/Guild_Logo_White-1.png"
        alt="The Guild"
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
      />
    </div>
  );
}
