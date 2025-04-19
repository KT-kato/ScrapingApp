import axios from "axios";
import { supabaseLocalBaseUrl } from "../constants";
import {
  LoginRequestBody,
  LoginResponseType,
  SignUpRequestBody,
  SignUpResponseType,
} from "./types";

export const getSessionToken = async (
  body: LoginRequestBody,
): Promise<LoginResponseType> => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${supabaseLocalBaseUrl}/session/login`,
    body,
    {
      headers,
    },
  );
  return response.data;
};

export const signUpNewUser = async (
  body: SignUpRequestBody,
): Promise<SignUpResponseType> => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${supabaseLocalBaseUrl}/session/signup`,
    body,
    {
      headers,
    },
  );
  return response.data;
};
