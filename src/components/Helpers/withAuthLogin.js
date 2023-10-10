import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const withAuthLogin = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const user = useSelector(({ auth }) => auth.user);
    const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
    useEffect(() => {
      if (user) {
        if (isLoggedIn) {
          router.push("/admin");
        }
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
