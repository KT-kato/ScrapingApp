import { Input, Label } from 'reactstrap'
import styles from './FormFields.module.scss'

export type InputFieldProps = {
  id: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'date'
  value: string
  onChange: (value: string) => void
}

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className={styles.inputContainer}>
      <Label htmlFor={id} className={styles.label}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export const EmailInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <InputField
      id="email"
      label="Email"
      type="email"
      value={value}
      onChange={onChange}
    />
  )
}

export const PasswordInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <InputField
      id="password"
      label="Password"
      type="password"
      value={value}
      onChange={onChange}
    />
  )
}
