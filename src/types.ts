import { Application } from "express";
import { Client } from "pg";

export interface ServerConfig {
  db: {
    port: number;
  };
}

export interface ApplicationServer {
  app: Application;
  dbClient: Client;
}

export interface UserDetails {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
}

export interface CreateUserDetails {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
}

export interface CreateUserDataOBj {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
}

export interface LoginUserDetails {
  email: string;
  password: string;
}

export interface LoginUserDataOBj {
  email: string;
  password: string;
}
