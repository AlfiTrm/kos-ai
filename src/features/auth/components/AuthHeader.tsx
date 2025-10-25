export default function AuthHeader({
  title,
  subtitle,
}: { title: string; subtitle: string }) {
  return (
    <header className="mb-5">
      <h1 className="text-2xl font-extrabold mb-1">{title}</h1>
      <p className="text-sm text-neutral-600">{subtitle}</p>
    </header>
  );
}
