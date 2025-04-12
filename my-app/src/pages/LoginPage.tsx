import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "../slices/store";
import { login, selectSessionStatus } from "../slices/sessionSlices";
import { shallowEqual } from "react-redux";
import { Page } from "../components/layout/Page/Page";
import { AuthForm } from "../components/auth/AuthForm";
import { EmailInput, PasswordInput } from "../components/auth/FormFields";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRequesting, errorMessage } = useSelector(
    selectSessionStatus,
    shallowEqual
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (!isSubmitted || isRequesting) {
      return;
    }
    if (errorMessage) {
      alert(errorMessage.message);
      setIsSubmitted(false);
      return;
    }
    navigate("/home");
    setIsSubmitted(false);
  }, [isSubmitted, isRequesting, errorMessage, navigate]);

  return (
    <Page>
      <div className={styles.loginPageContainer}>
        <AuthForm title="Login" buttonText="Login" onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
        </AuthForm>
        <div className={styles.registerContainer}>
          <span>Don't have an account?</span>
          <Button color="link" onClick={() => navigate("/signup")}>
            Register
          </Button>
        </div>
      </div>
    </Page>
  );
};
