import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

export const ScrollToTop = ({ children }: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return children;
};
