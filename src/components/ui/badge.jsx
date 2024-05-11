import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center text-primary  px-2 font-medium text-base py-0.5 rounded-[5px]  transition-colors focus:outline-none ',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-slate-50  dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80',
        secondary:
          'border-transparent bg-background-alt text-slate-900  dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        destructive:
          'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80',
        outline: 'text-slate-950 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
