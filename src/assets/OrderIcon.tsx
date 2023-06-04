import theme, { ColorKeys } from '../styles/theme';

interface OrderIconProps {
  width: number;
  height: number;
  color: ColorKeys;
}

const OrderIcon = ({ width, height, color }: OrderIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M821.77 960.19H202.23c-39.49 0-71.62-32.13-71.62-71.62V135.43c0-39.49 32.13-71.62 71.62-71.62h619.53c39.49 0 71.62 32.13 71.62 71.62v753.14c0 39.49-32.12 71.62-71.61 71.62z m-603.62-87.53h587.7V151.34h-587.7v721.32z'
      fill={theme.colors[color]}
    />
    <path
      d='M683.68 357.36h-342.4c-12.09 0-21.89-9.8-21.89-21.89v-43.61c0-12.09 9.8-21.89 21.89-21.89h342.39c12.09 0 21.89 9.8 21.89 21.89v43.61c0 12.09-9.8 21.89-21.88 21.89zM682.72 555.69h-342.4c-12.09 0-21.89-9.8-21.89-21.89v-43.61c0-12.09 9.8-21.89 21.89-21.89h342.39c12.09 0 21.89 9.8 21.89 21.89v43.61c0 12.09-9.8 21.89-21.88 21.89zM525.48 754.03H340.32c-12.09 0-21.89-9.8-21.89-21.89v-43.61c0-12.09 9.8-21.89 21.89-21.89h185.15c12.09 0 21.89 9.8 21.89 21.89v43.61c0.01 12.09-9.79 21.89-21.88 21.89z'
      fill={theme.colors[color]}
    />
  </svg>
);

export default OrderIcon;
