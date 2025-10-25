export default function ProgressBar({
  index,
  count = 3,
}: {
  index: number;
  count?: number;
}) {
  return (
    <div className="px-5 pt-5">
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const active = i === index;
          return (
            <span
              key={i}
              className={`h-2 rounded-full transition-all w-full
                ${
                  active
                    ? "w-12 bg-gradient-to-r from-purple-1 to-orange-1"
                    : "w-8 bg-neutral-200"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}
