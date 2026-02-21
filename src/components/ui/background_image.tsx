export default function BackgroundImage(props: {
    imageUrl: string,
    size: number
    xPosition: number
    yPosition: number
}) {
    return (
        <div
            style={ {
                backgroundImage   : `url('${ props.imageUrl }')`,
                backgroundSize    : `${ 50 }%`,
                backgroundPosition: `${ props.xPosition }% ${ props.yPosition }%`
            } }
            className={ 'absolute inset-0 z-[-1] bg-no-repeat' +
                        ' bg-center bg-contain' }
        />
    )
}