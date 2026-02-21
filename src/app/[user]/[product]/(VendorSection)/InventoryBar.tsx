import { Context_VendorSection } from '@/app/[user]/[product]/(VendorSection)/context';
import {
    Field,
    FieldLabel
}                                from '@/components/ui/field';
import { Progress }              from '@/components/ui/progress';
import Text                      from '@/components/ui/text';
import { useContext }            from 'react';



export default function InventoryBar() {
    const { inventory } = useContext(Context_VendorSection)
    return <div className={ 'w-full h-fit' }>
        <Field className='w-full'>
            <FieldLabel htmlFor='inventory'>
                <Text>Items Left</Text>
                <Text className='ml-auto'>
                    <span>{ inventory.available } / { inventory.total }</span>
                </Text>
            </FieldLabel>
            <Progress
                value={ (100 / inventory.total) * (inventory.total - inventory.available) }
                id='inventory'
            />
        </Field>
    </div>
}

