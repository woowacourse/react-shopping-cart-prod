import * as S from './style';

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
    <S.Container>
      <S.Button>
        <S.Option
          position={{ bottom: '60px' }}
          avatar="https://ca.slack-edge.com/TFELTJB7V-U04M28KU1PU-ff7ca3cddc88-512"
        />
        <S.Option
          position={{ bottom: '120px' }}
          avatar="https://ca.slack-edge.com/TFELTJB7V-U04METH8VKK-f128d33fbf53-512"
        />
      </S.Button>
    </S.Container>
  );
}

export default QuickMenu;
