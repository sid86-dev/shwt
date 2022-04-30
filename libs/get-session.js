import nextSession from "next-session";
import buildId from 'build-id'
export const getSession = nextSession({ name: 'shwt', genid: buildId });
