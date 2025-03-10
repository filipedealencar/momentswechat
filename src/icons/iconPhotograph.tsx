import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {IconsProps} from '../types/icon.types';

export const IconPhotoGraph: React.FC<IconsProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <Svg
      fill={color ?? '#000000'}
      width={width ?? '800px'}
      height={height ?? '800px'}
      viewBox="0 0 24 24">
      <Circle id="secondary" cx={12} cy={13} r={3} />
      <Path
        id="primary"
        d="M21,7V19a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V7A1,1,0,0,1,4,6H8l.72-1.45A1,1,0,0,1,9.62,4h4.76a1,1,0,0,1,.9.55L16,6h4A1,1,0,0,1,21,7Z"
      />
    </Svg>
  );
};
