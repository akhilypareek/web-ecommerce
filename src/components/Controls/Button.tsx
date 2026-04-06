import { Link } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";

interface ButtonProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  text?: string;
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
}

export default function Button({ icon: Icon, text, onClick, link, disabled = false }: ButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (!disabled) onClick?.();
  };

  const content = (
    <span className="flex items-center gap-2">
      {Icon && <Icon width={16} height={16} />}
      {text}
    </span>
  );

  if (link) {
    return (
      <Link
        to={disabled ? "#" : link}
        onClick={(e) => e.stopPropagation()}
        className={`inline-flex px-2 py-1 items-center justify-center gap-2 text-sm font-medium 
          ${disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-[var(--color-blue-soft-text)] hover:underline"
          }`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 cursor-pointer
        py-2 rounded-lg transition
        ${disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
          : "bg-[var(--color-blue-soft-bg)] text-[var(--color-blue-soft-text)] hover:bg-white hover:border border-[var(--color-blue-soft-bg)]"
        }`}
    >
      {content}
    </button>
  );
}



