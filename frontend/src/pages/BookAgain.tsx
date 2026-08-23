import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookAgain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/my-sessions", { replace: true });
  }, [navigate]);

  return null;
};

export default BookAgain;
