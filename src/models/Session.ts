import { Collection, getRepository } from "fireorm";

@Collection()
class Session {
  id: string;
  sub: string;
  domain: string;
  token: string;
}

const SessionModel = getRepository(Session);

export { SessionModel, Session };
