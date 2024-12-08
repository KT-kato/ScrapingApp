import { Button, Card, CardBody, CardTitle, Form, Input, Label } from "reactstrap";

import styles from "./Login.module.scss";
import { Page } from "../page/Page";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("email", email);
    console.log("password", password);
  };
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
            <Button color="link">Register</Button>
          </Form>
        </CardBody>
      </Card>
    </Page>
  );
};
