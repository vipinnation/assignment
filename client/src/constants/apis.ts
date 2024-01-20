import { base_url } from "./variables";

const apis = {
  auth: {
    login: `${base_url}/auth/sign-in`,
    register: `${base_url}/auth/sign-up`,
  },
  task: `${base_url}/task`,
};

export default apis;
