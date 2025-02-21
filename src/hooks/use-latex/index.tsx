import KaTeX from "katex";
import { useMemo } from "react";
function index() {
  const MathFunction = ({ children, errorColor, math, renderError }) => {
    const formula = math ?? children;

    const { html, error } = useMemo(() => {
      try {
        const html = KaTeX.renderToString(formula, {
          errorColor,
          throwOnError: !!renderError,
        });

        return { html, error: undefined };
      } catch (error) {
        if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
          return { error };
        }

        throw error;
      }
    }, [formula, errorColor, renderError]);
  };
}

export default index;
