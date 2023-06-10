import { Container } from "@styles/style";
import * as S from "./Header.style";
import { Suspense } from "react";

import { SelectBox } from "@common/SelectBox";

import { CartButtonWithIcon } from "@views/Cart/components/CartButtonWithIcon";
import { useServerUrl } from "@recoil/server/serverUrlState";

import { useResetCart } from "@views/Cart/recoil/cartState";
import { Logo } from "@layout/Logo";
import { isCrewNameType } from "../../types/ServerType";
import { useCredential } from "@recoil/server/credentialState";
import OrderListButton from "@views/Payment/components/OrderListButton/OrderListButton";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@common/ErrorBoundary/ErrorBoundary";

function Header() {
  const { setServerUrlBy } = useServerUrl();
  const { setCredentialBy } = useCredential();
  const navigate = useNavigate();
  const resetCart = useResetCart();

  const handleChangeServer = ({ currentTarget: { value } }) => {
    resetCart();
    if (isCrewNameType(value)) setServerUrlBy(value);
  };

  const handleChangeUser = ({ currentTarget: { value } }) => {
    resetCart();
    setCredentialBy(Number(value));
    navigate("/");
  };

  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <ErrorBoundary>
            <Suspense>
              <S.IconWrapper>
                <SelectBox
                  options={[
                    { value: "허브", name: "허브" },
                    { value: "마코", name: "마코" },
                    { value: "우가", name: "우가" },
                    { value: "MSW", name: "MSW" },
                  ]}
                  onChange={handleChangeServer}
                />
                <SelectBox
                  options={[
                    { value: "1", name: "치즈왕자" },
                    { value: "2", name: "치즈공주" },
                  ]}
                  onChange={handleChangeUser}
                />
                <OrderListButton />
                <CartButtonWithIcon />
              </S.IconWrapper>
            </Suspense>
          </ErrorBoundary>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
