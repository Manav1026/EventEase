import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const SessionAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:3000/api/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        await signOut(auth);
        navigate("/login");
      }
    };

    check();
  }, [navigate]);
};
