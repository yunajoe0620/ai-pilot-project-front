import styled from "styled-components";
import GenerateButton from "../button/generate-button";

function StepFour() {
  return (
    <Container>
      <StepFourTopContainer>
        <Character>마스코트</Character>
        <PdfDownLoadContainer>
          <TextOne>AI 퀴즈가 완성 되었어요!</TextOne>
          <TextTwo>다운로드 버튼을 통해 PDF로 다운 받을 수 있습니다.</TextTwo>
          <GenerateButton
            size="lg"
            color="primary"
            onClick={() => {
              console.log("제너레이트");
            }}
            active={true}
          >
            AI 퀴즈 PDF 다운로드하기
          </GenerateButton>
        </PdfDownLoadContainer>
      </StepFourTopContainer>
    </Container>
  );
}

export default StepFour;

const Container = styled.div`
  width: 100%;
`;

const Character = styled.div`
  width: 110px;
  height: 122px;
  background-color: #7789ff;
  margin-bottom: 40px;
`;
const StepFourTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const PdfDownLoadContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextOne = styled.p`
  color: #58576e;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.3px;

  margin-bottom: 8px;
`;

const TextTwo = styled.p`
  color: #9c9ead;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.21px;
  margin-bottom: 28px;
`;
