import styled from '@emotion/styled';
import { Text } from '../Text/Text';

interface TextListProps {
  label: string;
  text: string;
  primary?: boolean;
  color?: string;
}

const TextList = ({ label, text, primary, color }: TextListProps) => {
  return (
    <TextListWrapper>
      <Text size="smaller" weight="light">
        {label}
      </Text>
      <Text
        size={primary ? 'small' : 'smaller'}
        weight={primary ? 'bold' : 'light'}
        color={color ?? (primary ? '#04C09E' : undefined)}
      >
        {text}
      </Text>
    </TextListWrapper>
  );
};

export default TextList;

const TextListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;
