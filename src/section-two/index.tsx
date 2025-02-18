import { PDFViewer } from "@react-pdf/renderer";
import SectionTwo from "./section-two";

function SectionTwoPage() {
  return (
    <PDFViewer>
      <SectionTwo />
    </PDFViewer>
  );
}

export default SectionTwoPage;
