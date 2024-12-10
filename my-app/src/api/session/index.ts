import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";
import {
  LoginRequestBody,
  LoginResponseType,
  SignUpRequestBody,
  SignUpResponseType,
} from "./types";

export const getSessionToken = async (
  body: LoginRequestBody
): Promise<LoginResponseType> => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.post(`${supabaseLocalBaseUrl}/session/login`, body, {
    headers,
  });
};

export const signUpNewUser = async (
  body: SignUpRequestBody
): Promise<SignUpResponseType> => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.post(`${supabaseLocalBaseUrl}/session/signup`, body, {
    headers,
  });
};
