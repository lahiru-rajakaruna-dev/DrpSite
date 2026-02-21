import ShowcaseSectionContent
							 from '@/app/[user]/[product]/(FeatureShowcaseSection)/_Content';
import ShowcaseSectionImageGallery
							 from '@/app/[user]/[product]/(FeatureShowcaseSection)/_ImageGallery';
import { PropsWithChildren } from 'react';



export default function ShowcaseLayout_1(props: PropsWithChildren) {
	return (
		<div
			className={ 'w-full h-full py-8 flex flex-row items-center' +
						' justify-center [&>div]:flex-1' }
		>
			{
				props.children
			}
		</div>
	)
}

ShowcaseLayout_1.Content      = ShowcaseSectionContent
ShowcaseLayout_1.ImageGallery = ShowcaseSectionImageGallery