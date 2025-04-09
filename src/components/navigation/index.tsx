import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function AIQuizNavigation() {
  const navigate = useNavigate();
  return (
    <Navigation>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/section-two");
        }}
      >
        <img src="src/assets/ai-quiz-letter.svg" />
      </div>

      <NavigationMenuContainer>
        <MenuListContainer>
          <MenuItem>퀴즈 만들기</MenuItem>
          <MenuItem>서비스 안내</MenuItem>
          <MenuItem>메뉴 3번</MenuItem>
        </MenuListContainer>
        <img src="src/assets/nav-profile.svg" />
      </NavigationMenuContainer>
    </Navigation>
  );
}

export default AIQuizNavigation;

const Navigation = styled.nav`
  padding: 8px 60px;
  display: flex;
  justify-content: space-between;
  border-radius: 99999px;
  background: rgba(246, 248, 255, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
`;

const NavigationMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuListContainer = styled.ol`
  display: flex;
`;

const MenuItem = styled.li`
  padding: 6px 12px;
  color: #58576e;
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.225px;
`;
