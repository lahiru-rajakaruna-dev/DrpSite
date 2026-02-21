import { clsx } from 'clsx';



interface RatingProps {
    /** Current rating value (between 0 and max) */
    value: number;
    /** Maximum rating (default: 5) */
    max: number;
    /** Callback when rating changes (not called in readonly mode) */
    onChange?: (value: number) => void;
    /** If true, rating cannot be changed */
    readonly?: boolean;
    /** Custom component/element for an empty star */
    emptySymbol?: React.ReactNode;
    /** Custom component/element for a filled star */
    fullSymbol?: React.ReactNode;
    /** Optional CSS class name */
    className?: string;
    /** Optional inline styles */
    style?: React.CSSProperties;
}


export default function Rating(props: RatingProps) {
    const handleClick = (index: number) => {
        if (props.readonly || !props.onChange) {
            return;
        }
        props.onChange(index);
    };
    
    const stars = [];
    for (let i = 1; i <= props.max; i++) {
        const filled = i <= props.value;
        stars.push(
            <span
                key={ i }
                onClick={ () => handleClick(i) }
                style={ {
                    cursor: props.readonly
                            ? 'default'
                            : 'pointer'
                } }
            >
        { filled
          ? props.fullSymbol
          : props.emptySymbol }
      </span>
        );
    }
    
    return (
        <div
            className={ clsx('inline-flex', props.className) }
        >
            { stars }
        </div>
    );
}
