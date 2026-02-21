import { cva }               from 'class-variance-authority';
import { clsx }              from 'clsx';
import { PropsWithChildren } from 'react';



export default function Text(props: PropsWithChildren<{
    className?: string
    variant?: 'small' | 'body' | 'button' | 'label' | 'h1' | 'h2' | 'h3' | 'h4'
}>) {
    
    const textVariants = cva('text-blue-800', {
        variants       : {
            intent: {
                small : 'text-sm',
                body  : 'text-normal',
                button: 'text-normal',
                label : 'text-sm text-gray-200',
                h1    : 'mb-4 text-7xl font-bold',
                h2    : 'mb-3 text-4xl font-bold',
                h3    : 'mb-3 text-2xl font-semibold',
                h4    : 'mb-3 text-normal font-semibold'
            },
        },
        defaultVariants: {
            intent: 'body'
        }
    })
    
    return <p
        className={ clsx(
            textVariants({ intent: props.variant }),
            props.className
        ) }
    >{ props.children }</p>
}

