interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="px-4 py-10 text-center relative flex items-center justify-center overflow-hidden h-48">
      <div className="relative max-w-4xl mx-auto flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg opacity-90">{description}</p>
      </div>
    </header>
  );
}