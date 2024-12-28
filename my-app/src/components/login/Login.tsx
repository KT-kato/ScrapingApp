import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  Label,
} from "reactstrap";

import styles from "./Login.module.scss";
import { Page } from "../page/Page";
import { useEffect, useState } from "react";
import { login, selectSessionStatus } from "../../slices/sessionSlices";
import { useDispatch } from "../../slices/store";
import { useSelector } from "../../slices/store";
import { useNavigate } from "react-router";
import { shallowEqual } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const { isRequesting, errorMessage } = useSelector(
    selectSessionStatus,
    shallowEqual
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
      <Card className={styles.loginContainer}>
        <CardTitle className={styles.loginTitle}>Login</CardTitle>
        <CardBody>
          <Form className={styles.loginFormContainer}>
            <div className={styles.inputContainer}>
              <Label htmlFor="email" className={styles.label}>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <Label htmlFor="password" className={styles.label}>
                Password
              </Label>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <Form className={styles.signupFormContainer}>
            <div className={styles.registerContainer}>
              <span>Don't have an account?</span>
            </div>
            <Button color="link" onClick={() => navigate("/signup")}>
              Register
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Page>
  );
};
