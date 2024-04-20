"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c3a897d7-9d58-4d50-94ad-4cbd4d09f579");
  }, []);

  return null;
};