import FlexBox from 'components/@common/FlexBox';
import Modal, { ModalProps } from 'components/@common/Modal/Modal';
import { useState, PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';
import { pointUsageState } from 'state/pointUsageState';
import styled from 'styled-components';
import Option from './DiscountOption';
import { options } from 'constants/discountOption';

interface ConfirmModalProps extends ModalProps {
  onClickConfirmButton: () => void;
  userPoint: number;
}

const DiscountModal = ({ userPoint, isOpen, closeModal }: PropsWithChildren<ConfirmModalProps>) => {
  const [point, setPoint] = useState(0);
  const [pointUsage, setPointUsage] = useRecoilState(pointUsageState);
  const [selectedOption, setSelectedOption] = useState(pointUsage.checkedBy ?? 'none');

  const handleOptionChange = (option: string) => {
    const optionToPoints: { [key: string]: number } = {
      none: 0,
      all: userPoint,
    };

    setSelectedOption(option);
    setPoint(optionToPoints[option]);
  };

  const handleCustomInputChange = (value: number) => {
    setPoint(Number(value));
    setSelectedOption('custom');
  };

  const handleCloseButton = () => {
    closeModal();
    setSelectedOption(pointUsage.checkedBy);
    setPoint(pointUsage.appliedPoint);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPointUsage({
      checkedBy: selectedOption,
      appliedPoint: point === 0 ? 0 : point,
    });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container flexDirection="column">
        <ModalHeader flexDirection="row">
          <h3>포인트 조회 및 적용</h3>
          <CloseIcon
            onClick={handleCloseButton}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHBhdGggZD0iTTIwIDRMNCAyMCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4gPHBhdGggZD0iTTQgNEwyMCAyMCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4gPC9zdmc+IA=="
            alt="closeIcon"
          />
        </ModalHeader>
        <ModalBody>
          <ModalSubTitle>보유 포인트 : {userPoint} p</ModalSubTitle>
          <SelectSection onSubmit={handleFormSubmit}>
            {options.map((option) => (
              <Option
                key={option.value}
                label={option.label}
                checked={selectedOption === option.value}
                onClick={() => handleOptionChange(option.value)}
                selectedOption={selectedOption}
                customInputChange={handleCustomInputChange}
                point={pointUsage}
                userMaxPoint={userPoint}
              />
            ))}
            <Button type="submit">포인트 적용하기</Button>
          </SelectSection>
        </ModalBody>
      </Container>
    </Modal>
  );
};

export default DiscountModal;

const Container = styled(FlexBox)`
  width: 360px;
  min-height: 100px;
`;

const ModalHeader = styled(FlexBox)`
  height: 56px;
  min-height: 56px;
  padding: 0px 20px 0px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px -1px inset;
  background: rgb(255, 255, 255);
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 18px;
  top: 15px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 400px;

  overflow: auto;
`;
const ModalSubTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  font-weight: 700;
  color: rgb(24, 26, 28);
  border-width: 8px 1px 1px;
  border-style: solid;
  border-color: rgb(243, 245, 247) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
  border-image: initial;
  padding: 16px;
  text-align: left;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  min-height: 56px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  background-color: rgb(42, 193, 188);
  color: white;
`;

const SelectSection = styled.form`
  padding: 16px;
`;
