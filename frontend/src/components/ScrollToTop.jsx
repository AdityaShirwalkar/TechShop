import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Enables smooth scrolling effect
      });
    };

    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;