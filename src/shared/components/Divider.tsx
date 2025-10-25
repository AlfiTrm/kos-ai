export default function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-400 my-2">
      <div className="h-px bg-neutral-200 flex-1" />
      <span>{text}</span>
      <div className="h-px bg-neutral-200 flex-1" />
    </div>
  );
}
