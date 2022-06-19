import { useState, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Styled } from './styles';

const Paginator = ({ maxIndex }: { maxIndex: number }) => {
  const params = useParams();
  const id = Number(params.id);
  const [page, setPage] = useState(id);
  const navigate = useNavigate();

  const pageStartNumber = Math.floor((page - 1) / 10) * 10;
  const pageLastNumber = Math.floor(maxIndex / 12) + 1;

  const handleClickNumber = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const currentPage = Number(e.target.innerText);

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  const handleClickBefore = () => {
    if (page <= 1) return;
    const currentPage = page - 1;

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  const handleClickAfter = () => {
    if (page >= pageLastNumber) return;
    const currentPage = page + 1;

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  return (
    <Styled.Paginator>
      <Styled.PageIndicator onClick={handleClickBefore}>이전</Styled.PageIndicator>
      {Array.from({ length: 10 }, (_, index: number) => {
        if (pageStartNumber + index + 1 <= pageLastNumber) {
          return (
            <Styled.PageIndicator
              key={index}
              active={page === pageStartNumber + index + 1}
              onClick={handleClickNumber}
            >
              {pageStartNumber + index + 1}
            </Styled.PageIndicator>
          );
        }
      })}
      <Styled.PageIndicator onClick={handleClickAfter}>다음</Styled.PageIndicator>
    </Styled.Paginator>
  );
};

export default Paginator;
