import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const user = useSelector(({ auth }) => auth.user);
    const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

    useEffect(() => {
      if (user) {
        if (isLoggedIn) {
          if (router.pathname == "/auth/login") {
            router.push("/admin");
          }
        } else {
          router.push("/auth/login");
        }
      }
    }, [user]);

    if (!isLoggedIn) {
      return null; // or render a loading spinner or message
    }

    return <WrappedComponent userData={user} {...props} />;
  };

  return AuthComponent;
};
