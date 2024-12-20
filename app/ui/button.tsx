
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className=
        'flex h-10 items-center rounded-lg bg-pink-400 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 active:bg-pink-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
    >
      {children}
    </button>
  );
}
