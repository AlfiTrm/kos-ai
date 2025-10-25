"use client";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  full?: boolean;
};

export function GradientButton({
  full = true,
  className = "",
  ...props
}: BtnProps) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-3 text-white text-sm font-medium
        bg-gradient-to-r from-purple-1 to-orange-1
        shadow-[0_6px_18px_rgba(255,107,214,0.35)]
        ${full ? "w-full" : ""} ${className}`}
    />
  );
}

export function OutlineButton({
  full = true,
  className = "",
  ...props
}: BtnProps) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-3 gradient-text text-sm font-medium
        border border-orange-1 text-purple-1
        ${full ? "w-full" : ""} ${className}`}
    />
  );
}

export function DisableButton({
  full = true,
  className = "",
  ...props
}: BtnProps) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-3 text-sm font-medium text-white
        bg-gradient-to-r from-purple-1 to-orange-1 opacity-40 grayscale-50 cursor-not-allowed
        ${full ? "w-full" : ""} ${className}`}
    />
  );
}
