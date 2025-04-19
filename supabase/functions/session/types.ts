import { Session, User } from 'npm:@supabase/supabase-js'

export type SignUpRequestBody = {
  email: string
  password: string
}

export type LoginRequestBody = {
  email: string
  password: string
}

export type LoginResponseBody = {
  session: Session
  user: User
  ebayToken: string
}

export type SignupResponseBody = {
  session: Session
  user: User
  ebayToken: string
}
