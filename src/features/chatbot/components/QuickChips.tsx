type Props = { items?: string[]; onPick: (text: string) => void; };
export default function QuickChips({ items = [], onPick }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="px-4 pb-2 flex gap-2 flex-wrap">
      {items.map((t, i) => (
        <button key={i} onClick={() => onPick(t)} className="text-xs px-3 py-1 rounded-full bg-white border">
          {t}
        </button>
      ))}
    </div>
  );
}
