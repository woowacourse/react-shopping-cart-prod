import styled from 'styled-components';

import ServersIcon from '@Asset/servers.png';

const SERVERS = {
  베베: {
    apiUrl: '',
    email: '',
    password: '',
  },

  에단: {
    apiUrl: '',
    email: '',
    password: '',
  },
} as const;

function QuickMenu() {
  return (
    <Container>
      <Button>
        <Option
          position={{ bottom: '60px', left: '20px' }}
          avatar="https://ca.slack-edge.com/TFELTJB7V-U04M28KU1PU-ff7ca3cddc88-512"
        />
        <Option
          position={{ right: '60px', top: '20px' }}
          avatar="https://ca.slack-edge.com/TFELTJB7V-U04METH8VKK-f128d33fbf53-512"
        />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const Button = styled.div`
  background-image: url(${ServersIcon});
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: 20px 20px;

  width: 70px;
  height: 70px;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

type OptionProps = {
  position: Partial<Record<'right' | 'bottom' | 'top' | 'left', string>>;
  avatar: string;
};

const Option = styled.div<OptionProps>`
  display: none;
  position: absolute;
  ${(props) => props.position};

  width: 50px;
  height: 50px;

  background-image: url(${(props) => props.avatar});
  background-size: 50px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  border-radius: 50%;

  animation: scale(2) 1s ease-in;

  cursor: pointer;

  &:hover {
    & ~ div {
      display: block;
    }
    display: block;
  }
`;

export default QuickMenu;
