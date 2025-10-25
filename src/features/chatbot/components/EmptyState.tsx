"use client";

export default function EmptyState() {
  return (
    <div className=" rounded-2xl p-5 bg-white border border-neutral-100">
      <h3 className="font-semibold">Kos AI Chatbot</h3>
      <p className="text-xs text-neutral-500 mb-4">
        Bring your imagination to life with AI.
      </p>
      <span className="inline-flex rounded-full px-4 py-2 text-sm font-medium text-transparent bg-clip-text 
        bg-gradient-to-r from-purple-1 to-orange-1 border border-orange-200">
        Start Now
      </span>
    </div>
  );
}
