import { Context_VendorSection } from '@/app/[user]/[product]/(VendorSection)/context';
import { Label }                 from '@/components/ui/label';
import {
    RadioGroup,
    RadioGroupItem
}                                from '@/components/ui/radio-group';
import Image                     from 'next/image';
import { useContext }            from 'react';



export default function VariantPicker() {
    const { variants } = useContext(Context_VendorSection)
    
    return <div
        className={ 'w-full h-fit flex flex-row items-center' }
    >
        <RadioGroup
            className={ 'flex flex-row items-center' +
                        ' justify-start gap-4 flex-wrap' }
        >
            { variants.map((variant) => {
                const { id, image_url, price } = variant()
                return <div
                    key={ `${ id }-Math.floor(Math.random() * 1_000_000)` }
                    className='w-24 h-fit max-h-36 flex flex-col items-center justify-start gap-3'
                >
                    <Label htmlFor={ `variant-${ id }` }>
                        <Image
                            src={ image_url }
                            alt={ 'Variant Image' }
                            width={ 80 }
                            height={ 80 }
                            className={ 'border-1 border-slate-200' +
                                        ' rounded-md object-center' +
                                        ' object-cover' }
                        />
                    </Label>
                    <RadioGroupItem
                        value={ id }
                        id={ `variant-${ id }` }
                    />
                    <Label htmlFor={ `variant-${ id }` }>
                        {
                            price
                        }
                    </Label>
                </div>
            }) }
        </RadioGroup>
    </div>
}


