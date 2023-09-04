import { Application } from "express";
import { Client } from "pg";

interface IUserList {
  [key: string]: string;
}

export interface ServerConfig {
  db: {
    port: number;
  };
  //   userList: IUserList;
}

export interface ApplicationServer {
  app: Application;
  dbClient: Client;
}
