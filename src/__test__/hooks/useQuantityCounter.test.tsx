import { render, renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useQuantityCounter } from '@hooks/useQuantityCounter';
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  QUANTITY_ERROR_MESSAGE,
} from '@constants/cartConstants';

describe('useQuantityCounter 훅 테스트 ', () => {
  const INITIAL_VALUE = 1;
  const removeCartItemAndDelete = () => {
    return;
  };
  const updateCartItemAndSync = (value: number) => {
    return;
  };

  const options = {
    updateCartItemAndSync,
    removeCartItemAndDelete,
  };
  test('수량 증가 버튼을 누른다면 수량이 1씩 증가한다.', async () => {
    const { result } = renderHook(() => useQuantityCounter(INITIAL_VALUE, options));

    act(() => {
      const { increaseQuantity } = result.current;
      increaseQuantity();
    });

    const { quantity } = result.current;

    expect(quantity).toBe(INITIAL_VALUE + 1);
  });

  test('수량 감소 버튼을 누른다면 수량이 1씩 감소한다.', () => {
    const { result } = renderHook(() => useQuantityCounter(INITIAL_VALUE + 1, options));

    const { decreaseQuantity } = result.current;

    act(() => {
      decreaseQuantity();
    });

    const { quantity } = result.current;

    expect(quantity).toBe(INITIAL_VALUE);
  });

  test('수량 증가 버튼을 눌러도 최댓값을 넘어가지 않는다.', () => {
    const { result } = renderHook(() => useQuantityCounter(MAX_CART_QUANTITY, options));

    const { increaseQuantity } = result.current;

    act(() => {
      increaseQuantity();
    });

    const { quantity } = result.current;

    expect(quantity).toBe(MAX_CART_QUANTITY);
  });

  test('수량 감소 버튼을 눌러도 최솟값을 넘어가지 않는다.', () => {
    const { result } = renderHook(() => useQuantityCounter(MIN_CART_QUANTITY, options));

    const { decreaseQuantity } = result.current;

    act(() => {
      decreaseQuantity();
    });

    const { quantity } = result.current;

    expect(quantity).toBe(MIN_CART_QUANTITY);
  });

  test('인풋에 100이 넘어가는 숫자를 적는 경우 최댓값으로 변경한다. ', () => {
    const { result } = renderHook(() => useQuantityCounter(INITIAL_VALUE, options));

    const { onQuantityChange } = result.current;

    act(() => {
      onQuantityChange(100);
    });

    const { quantity } = result.current;

    expect(quantity).toBe(MAX_CART_QUANTITY);
  });

  test('인풋에 100이 넘어가는 숫자를 적는 경우 에러 메세지를 보여준다. ', () => {
    const { result } = renderHook(() => useQuantityCounter(INITIAL_VALUE, options));

    const { onQuantityChange, countInputRef } = result.current;

    render(<input ref={countInputRef} />);

    act(() => {
      onQuantityChange(100);
    });

    expect(countInputRef.current?.validationMessage).toBe(QUANTITY_ERROR_MESSAGE);
  });

  test('인풋에 100이 넘어가고 에러 메세지가 뜬 상태에서 숫자를 감소할 경우 에러 메세지를 지운다. ', () => {
    const { result } = renderHook(() => useQuantityCounter(INITIAL_VALUE, options));

    const { onQuantityChange, decreaseQuantity, countInputRef } = result.current;

    render(<input ref={countInputRef} />);

    act(() => {
      onQuantityChange(100);
    });

    act(() => {
      decreaseQuantity();
    });

    expect(result.current.countInputRef.current?.validationMessage).toBe('');
  });
});
