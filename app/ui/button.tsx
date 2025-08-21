import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'emphasized' | 'transparent' | 'ghost';
}

export function Button({ children, className, variant = 'emphasized', ...rest }: ButtonProps) {
  // Temporarily use simple button to avoid import issues
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        variant === 'emphasized' ? 'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
