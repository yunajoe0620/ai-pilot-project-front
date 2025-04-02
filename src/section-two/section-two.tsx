import styled from "styled-components";

function SectionTwo() {
  return (
    <Layout>
      <Container>
        {/* navigation  영역*/}
        <Navigation>
          <img src="src/assets/ai-quiz-letter.svg" />
          <NavigationMenuContainer>
            <MenuListContainer>
              <MenuItem>퀴즈 만들기</MenuItem>
              <MenuItem>서비스 안내</MenuItem>
              <MenuItem>메뉴 3번</MenuItem>
            </MenuListContainer>
            <img src="src/assets/nav-profile.svg" />
          </NavigationMenuContainer>
        </Navigation>

        {/* body부분 */}
        <Contents>
          {/* quiz type 클릭하는 부분 */}
          <QuizTypeContainer>
            <QuizType>
              <img src="src/assets/flash-card.svg" />
              <Button>플래쉬 카드 퀴즈</Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/ppt.svg" />
              <Button>PPT형식 퀴즈</Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/pdf.svg" />
              <Button>PDF 형식 퀴즈</Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/teacher.svg" />
              <Button>선생님용 퀴즈</Button>
            </QuizType>
          </QuizTypeContainer>
          <div>
            <img src="src/assets/ai-quiz-letter-two.svg" />
          </div>
        </Contents>
      </Container>
    </Layout>
  );
}

export default SectionTwo;

const Layout = styled.div`
  min-height: 100vh;
  padding: 56px 60px 143px 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 196px;
`;

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

// Body Container

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 100px;
  align-items: center;
`;

const QuizTypeContainer = styled.div`
  display: flex;
  column-gap: 36px;
`;
const QuizType = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Button = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
`;
