import { Link, LinkProps } from 'react-router-dom';
import { styled } from 'styled-components';
import Colors from '../../../constant/Colors';

const LinkButton = (props: LinkProps) => {
  const { to, replace, children } = props;

  return (
    <Link to={to} replace={replace}>
      <Button type="button">{children}</Button>
    </Link>
  );
};

const Button = styled.button`
  width: 300px;
  padding: 20px 50px;
  background-color: ${Colors.grey1};

  border: none;
  border-radius: 15px;

  font-size: 20px;
  color: white;

  cursor: pointer;
`;

export default LinkButton;
