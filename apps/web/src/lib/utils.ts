import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Direction = 'ltr' | 'rtl';

const directionAwareMerge = (input: ClassValue[], direction: Direction) => {
  const normalized = input.map((value) =>
    typeof value === 'string' ? value.replace(/\bstart\b/g, direction === 'rtl' ? 'right' : 'left') : value,
  );

  return twMerge(clsx(normalized));
};

export function cn(...inputs: ClassValue[]) {
  const documentDirection =
    typeof document !== 'undefined'
      ? ((document.documentElement.getAttribute('dir') as Direction | null) || 'rtl')
      : 'rtl';

  return directionAwareMerge(inputs, documentDirection);
}
