import { useCallback } from 'react';
import styled from 'styled-components';
import Box from 'components/@common/Box';
import useCheckOutPointCostContext from 'hooks/useContext/useCheckOutPointCostContext';
import useFetch from 'hooks/useFetch';
import { getUserOwnPoints } from 'apis/points';

const CheckOutPointTab = () => {
  const { data: userOwnPoints, isLoading, errorState } = useFetch<number>(getUserOwnPoints);
  const { allInPoint, changePointCost, pointCost } = useCheckOutPointCostContext();

  const handleChangePointCost = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changePointCost(e, userOwnPoints ?? 0);
    },
    [userOwnPoints, changePointCost]
  );

  const handleAllInPoint = useCallback(() => {
    allInPoint(userOwnPoints ?? 0);
  }, [userOwnPoints, allInPoint]);

  if (isLoading) return <div>포인트 로딩중</div>;
  if (errorState?.isError) return <div>포인트 로딩 실패</div>;

  return (
    <Box
      sizing={{ width: '100%' }}
      flex={{ flexDirection: 'column', align: 'flex-start', justify: 'flex-start', gap: '20px' }}
    >
      <TitleBox sizing={{ width: '100%', height: '60px' }} flex={{ justify: 'flex-start' }}>
        <Title>포인트</Title>
      </TitleBox>
      <Box sizing={{ width: '100%' }} flex={{ justify: 'flex-start', gap: '10px' }}>
        <PointInput type="tel" value={pointCost} onChange={handleChangePointCost} pattern="\d*" />
        <PointAllInButton onClick={handleAllInPoint}>전액사용</PointAllInButton>
      </Box>
      <AvailablePointsText>
        사용 가능 포인트<AvailablePoints>{`${userOwnPoints ?? 0}P`}</AvailablePoints>
      </AvailablePointsText>
    </Box>
  );
};

export default CheckOutPointTab;

const TitleBox = styled(Box)`
  border-bottom: solid 1px var(--color-grayscale-200);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const PointInput = styled.input`
  width: 200px;
  height: 40px;
  padding: 10px 14px;
  border: 1px solid var(--color-grayscale-200);
  border-radius: 4px;
  font-size: 16px;
  outline: 0;

  :hover {
    background-color: var(--color-grayscale-100);
  }

  :focus {
    box-shadow: 0 0 0 1px var(--color-primary);
    background-color: var(--color-pure-white);
  }
`;

const PointAllInButton = styled.button`
  outline: 0;
  border: 1px solid var(--color-primary-tone-down);
  border-radius: 4px;
  padding: 10px 14px;
  background-color: var(--color-pure-white);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary-tone-down);
  cursor: pointer;

  :hover {
    background-color: #dbfeff;
  }
`;

const AvailablePointsText = styled.div`
  font-size: 16px;
`;

const AvailablePoints = styled.span`
  margin-left: 6px;
  font-size: 16px;
  color: var(--color-primary-tone-down);
`;
