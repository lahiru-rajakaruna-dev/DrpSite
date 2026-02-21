import Text               from '@/components/ui/text';
import { BatteryWarning } from 'lucide-react';



export default function Chip() {
    return (
        <span
            className={ 'px-3 py-1 flex flex-row items-center' +
                        ' justify-star gap-2 rounded-full' +
                        ' bg-blue-400 ' }
        >
                        <div>
                            <BatteryWarning/>
                        </div>
                        <Text>Surge of Power</Text>
                    </span>
    )
}