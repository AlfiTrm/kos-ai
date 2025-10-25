export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="w-full max-w-[480px] bg-white min-h-screen">
        {children}
      </div>
    </div>
  );
}
