import { Session, User } from '@supabase/supabase-js'

export type EbayTokenType = {
  access_token: string
  expires_in: number
  token_type: string
}

export type LoginRequestBody = {
  email: string
  password: string
}

export type LoginResponseType = {
  ebayToken: EbayTokenType
  session: Session
  user: User
}

export type SignUpRequestBody = {
  email: string
  password: string
}

export type SignUpResponseType = {
  ebayToken: EbayTokenType
  session: Session
  user: User
}
