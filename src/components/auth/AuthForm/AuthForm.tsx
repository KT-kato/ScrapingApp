import { Button, Card, CardBody, CardTitle, Form } from 'reactstrap'
import styles from './AuthForm.module.scss'

export type AuthFormProps = {
  title: string
  buttonText: string
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
}

export const AuthForm = ({
  title,
  buttonText,
  onSubmit,
  children,
}: AuthFormProps) => {
  return (
    <Card className={styles.authContainer}>
      <CardTitle className={styles.authTitle}>{title}</CardTitle>
      <CardBody>
        <Form className={styles.formContainer} onSubmit={onSubmit}>
          {children}
          <Button type="submit">{buttonText}</Button>
        </Form>
      </CardBody>
    </Card>
  )
}
