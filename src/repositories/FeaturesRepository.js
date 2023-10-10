import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  addPricingItems: "/pricingitems",
  updatePricingItems: "/pricingitems",
  getPricingItems: "/pricingitems",
  getContacts: "/contactus",
  getBlogs: "/blogs",
  group: "/permissions",
  newsLetter: "/users/newsletterusers",
  getStats: "/visitors-location/users",
  newsLetterData: "/newsletters",
  captcha: "/captchas",
};

class FeaturesRepository {
  async getPricingItems() {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getPricingItems}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getBlogs() {
    try {
      const request = await Repository.get(`${baseUrl}${routes.getBlogs}`);
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getNewsletterData() {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.newsLetterData}?limit=1000`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async addBlogs(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.getBlogs}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async addNewsletter(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.newsLetterData}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateBlogs(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.getBlogs}/${id}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateNewsletter(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.newsLetterData}/${id}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getContacts(payload, number) {
    try {
      if (payload !== "ALL") {
        const request = await Repository.get(
          `${baseUrl}${routes.getContacts}?type=${payload}&page=${number}`
        );
        const { data } = request;
        return {
          results: data,
        };
      } else {
        const request = await Repository.get(
          `${baseUrl}${routes.getContacts}?page=${number}`
        );
        const { data } = request;
        return {
          results: data,
        };
      }
    } catch (error) {
      throw getError(error);
    }
  }
  async addPricingItem(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.addPricingItems}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async updatePricingItem(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.updatePricingItems}/${id}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async addGroup(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.group}`,
        payload
      );
      const { data } = request;
      return {
        results: data.results,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getGroup(page) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.group}?page=${page}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getNewsLetter(status, page) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.newsLetter}?status=${status}&page=${page}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getStats(page) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getStats}?page=${page}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getCaptcha(page) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.captcha}?page=${page}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new FeaturesRepository();
