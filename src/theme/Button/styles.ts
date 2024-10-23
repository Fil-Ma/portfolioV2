import clsx from "clsx";
import type { TSize, TColor, TVariant } from "./types";

export const sizeStyles: Record<TSize, string> = {
  small: `text-[0.75rem] leading-[1rem] font-medium py-2 px-3`,
  medium: `text-[0.875rem] leading-[1.25rem] font-semibold py-2.5 px-4`,
  large: `text-[1rem] leading-[1.5rem] font-bold py-3 px-5`,
};

type TColorMapper = Record<TColor, string>;

const containedColorStyles: TColorMapper = {
  primary: clsx(
    `bg-blue-500 text-white dark:bg-blue-600 dark:text-white`,
    `hover:bg-blue-600 dark:hover:bg-blue-700`,
    `active:bg-blue-700 dark:active:bg-blue-800`,
    `disabled:bg-blue-300 disabled:text-gray-200 dark:disabled:bg-blue-500 dark:disabled:text-gray-400`,
  ),
  secondary: clsx(
    `bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white`,
    `hover:bg-gray-400 dark:hover:bg-gray-600`,
    `active:bg-gray-500 dark:active:bg-gray-500`,
    `disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-600 dark:disabled:text-gray-400`,
  ),
};

const outlinedColorStyles: TColorMapper = {
  primary: clsx(
    `bg-transparent text-blue-500 border border-blue-500 dark:text-blue-400 dark:border-blue-400`,
    `hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white`,
    `active:bg-blue-600 active:text-white dark:active:bg-blue-700 dark:active:text-white`,
    `disabled:bg-transparent disabled:text-blue-300 disabled:border disabled:border-blue-300 dark:disabled:text-blue-600 border-blue-600`,
  ),
  secondary: clsx(
    `bg-transparent text-gray-800 border border-gray-400 dark:text-gray-300 dark:border-gray-600`,
    `hover:bg-gray-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white`,
    `active:bg-gray-500 active:text-white dark:active:bg-gray-500 dark:active:text-white`,
    `disabled:bg-transparent disabled:text-gray-400 disabled:border disabled:border-gray-400 dark:disabled:text-gray-500 dark:disabled:border-gray-500`,
  ),
};

const textColorStyles: TColorMapper = {
  primary: clsx(
    `bg-transparent text-blue-500 dark:bg-transparent dark:text-blue-400`,
    `hover:text-blue-600 dark:hover:text-blue-500`,
    `active:text-blue-700 dark:active:text-blue-600`,
    `disabled:bg-transparent disabled:text-blue-300 dark:disabled:text-blue-500`,
  ),
  secondary: clsx(
    `bg-transparent text-gray-800 dark:text-gray-300`,
    `hover:text-gray-600 dark:hover:text-gray-200`,
    `active:text-gray-500 dark:active:text-gray-100`,
    `disabled:bg-transparent disabled:text-gray-400 dark:disabled:text-gray-500`,
  ),
};

export const colorStyles: Record<TVariant, TColorMapper> = {
  contained: containedColorStyles,
  outlined: outlinedColorStyles,
  text: textColorStyles,
};
