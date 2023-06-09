import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import CheckBox from '.';

describe('CheckBox 컴포넌트', () => {
  test('체크박스가 정상적으로 렌더링되고 체크 상태를 변경할 수 있어야 합니다.', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <CheckBox onChange={onChangeMock} />
      </ThemeProvider>
    );

    //default
    const checkBox = getByTestId('checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();

    //checked
    fireEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    //unchecked
    fireEvent.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});
