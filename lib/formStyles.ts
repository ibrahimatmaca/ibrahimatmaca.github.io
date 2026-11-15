/** Shared form look for Contact and Support: visible labels, 48px fields, 16px text. */
export const labelClassName = 'mb-2 block text-[0.8125rem] font-semibold leading-[1.4] text-ink';

export const inputClassName =
  'h-12 w-full rounded-xl border border-line-strong bg-transparent px-4 text-[1rem] text-ink placeholder:text-ink-3 transition-colors duration-150 focus:border-tint focus:outline-2 focus:outline-offset-2 focus:outline-tint hover:bg-raised/60';

export const textareaClassName = inputClassName.replace('h-12 ', 'min-h-36 py-3 resize-y ');
