import { Image } from '@nextui-org/react';
import React from 'react';

const ImageComponent = React.memo(({ src,className,alt}) => {
    return <Image className={className} src={src} alt={alt}/>;
});

export default ImageComponent;