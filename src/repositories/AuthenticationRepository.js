import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  userRegister: "/auth/register",
  sendInvite: "/auth/send-invite",
  login: "/auth/login",
  logout: "/v1/auth/logout",
  refreshTokens: "/v1/auth/refresh-tokens",
  sendVerifyEmail: "/v1/auth/send-verification-email",
  verifyEmail: "/v1/auth/verify-email",
  forgetPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/v1/auth/verify-email",
  contactUs: "/v1/users/contact-us",
  getUsers: "/users",
  updateUser: "/users",
};

class AuthenticationRepository {
  async userRegister(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.userRegister}`,
        payload
      );
      const { data } = request;

      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async userUpdate(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.updateUser}/${id}`,
        payload
      );
      const { data } = request;

      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async sendInvite(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.sendInvite}`,
        payload
      );
      const { data } = request;

      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async login(payload) {
    try {
      const postObject = { ...payload };
      const request = await Repository.post(
        `${baseUrl}${routes.login}`,
        postObject
      );
      const { data } = request;
      return {
        tokens: data.tokens,
        user: data.user,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getUsers(page, role, status, value, status2, value2) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getUsers}?page=${page}&role=${role}&${status}=${value}&${status2}=${value2}`
      );
      const { data } = request;

      return {
        results: data,
      };
    } catch (error) {
      console.log(error);
      throw getError(error);
    }
  }

  async getUser(id) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getUsers}/${id}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async logout(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.logout}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
  async forgetPassword(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.forgetPassword}`,
        payload
      );
      return {
        results: request,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async resetPassword(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.resetPassword}`,
        payload
      );
      return {
        results: request,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async contactUs(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.contactUs}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }

  async verifyEmail(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.verifyEmail}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new AuthenticationRepository();
