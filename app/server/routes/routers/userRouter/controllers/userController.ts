import loginDomain from './domain/loginDomain';
import registerDomain from './domain/registerDomain';

const userController = {
  login: loginDomain,
  register: registerDomain,
  profile: registerDomain,
};

export default userController;
