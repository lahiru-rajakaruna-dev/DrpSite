'use client';

import { createContext } from 'react';



export const Context_VendorSection = createContext<{
    images: { url: string, id: string }[],
    title: string,
    description: string,
    variants: (() => { id: string, image_url: string, price: number })[],
    inventory: { total: number, available: number },
    rating: number,
    id: string,
    price: { min?: number, max: number },
}>({
       id         : 'product-car',
       description: 'Venenatis sollicitudin pulvinar consequat litora arcu.',
       images     : Array(8).fill({
                                      url: 'https://picsum.photos/200/300',
                                      id : Math.floor(Math.random() * 1_000_000)
                                  }),
       inventory  : {
           available: 3,
           total    : 15,
       },
       rating     : 4.9,
       title      : 'Ford Mustang - Hell Cat',
       variants   : [
           ...Array(8).fill(() => ({
               id       : Math.floor(Math.random() * 1_000_000)
                              .toString(),
               image_url: 'https://picsum.photos/80',
               price    : Math.floor(Math.random() * 100)
           }))
       ],
       price      : {
           max: 280
       }
   })
