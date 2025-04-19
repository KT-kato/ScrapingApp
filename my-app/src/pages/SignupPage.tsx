import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "../slices/store";
import { selectSessionStatus, signUpUser } from "../slices/sessionSlices";
import { shallowEqual } from "react-redux";
import { Page } from "../components/layout/Page/Page";
import { AuthForm } from "../components/auth/AuthForm";
import { EmailInput, PasswordInput } from "../components/auth/FormFields";
import styles from "./SignupPage.module.scss";

export const SignupPage = () => {
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
    dispatch(signUpUser({ email, password }));
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
      <div className={styles.signupPageContainer}>
        <AuthForm title="Signup" buttonText="Signup" onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
        </AuthForm>
      </div>
    </Page>
  );
};
