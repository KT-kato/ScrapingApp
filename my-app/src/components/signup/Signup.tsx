import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  Label,
} from "reactstrap";

import styles from "./Signup.module.scss";
import { Page } from "../page/Page";
import { useEffect, useState } from "react";
import { selectSessionStatus, signUpUser } from "../../slices/sessionSlices";
import { useDispatch, useSelector } from "../../slices/store";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router";

export const Signup = () => {
  const { isRequesting, errorMessage } = useSelector(
    selectSessionStatus,
    shallowEqual
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
      <Card className={styles.loginContainer}>
        <CardTitle className={styles.loginTitle}>Signup</CardTitle>
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
              Signup
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Page>
  );
};
