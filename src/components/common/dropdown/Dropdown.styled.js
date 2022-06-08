import styled from "@emotion/styled";

import BaedaliProfileImage from "@/assets/images/baedali-profile.png";
import BaedaliProfileEyesImage from "@/assets/images/baedali-profile-eyes.png";

const StyledDropdownContainer = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;

    .baedali {
      background: url(${BaedaliProfileEyesImage});
      background-size: contain;
      transition: all ease 2s 0s;
      animation: spin 1s linear;
    }

    @keyframes spin {
      100% {
        transform: rotate(-360deg);
      }
    }

    .dropdown-container {
      display: block;
    }
  }

  .baedali {
    width: 50px;
    height: 50px;
    background: url(${BaedaliProfileImage});
    background-size: contain;
  }
  .dropdown-container {
    display: none;
    position: absolute;
    border-color: ${({ theme: { colors } }) =>
      `transparent transparent ${colors.gray5} transparent`};
    border-style: solid;
    border-width: 0 10px 16px 10px;
    height: 0px;
    width: 0px;
    top: 50px;
    right: 15px;
  }

  .dropdown-content {
    position: absolute;
    background-color: ${({ theme: { colors } }) => colors.gray5};
    min-width: 160px;
    top: 16px;
    right: -25px;
  }

  .dropdown-content a {
    color: ${({ theme: { colors } }) => colors.black1};
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.gray4};
    }
  }
`;

export default StyledDropdownContainer;
