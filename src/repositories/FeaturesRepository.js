import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  addExhibitions: "/exhibitions",
  getExhibitions: "/exhibitions",
  submissions: "/submissions",
  items: "/items",
  inquiry: "/itemInquiry",
  categories: "/categories",
  updatePricingItems: "/pricingitems",
  getPricingItems: "/pricingitems",
  getContacts: "/contactus",
  getBlogs: "/blogs",
  group: "/permissions",
  newsLetter: "/users/newsletterusers",
  getStats: "/visitors-location/users",
  newsLetterData: "/newsletters",
  captcha: "/captchas",
  getServices: "/services",
};

class FeaturesRepository {
  async addExhibitions(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.addExhibitions}`,
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
  async updateExhibitions(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.addExhibitions}/${id}`,
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
  async updateSubmissions(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.submissions}/${id}`,
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
  async updateItems(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.items}/${id}`,
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
  async getServices(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.getServices}`,
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
  async getInquiry(number, perPage) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.inquiry}?page=${number}&limit=${perPage}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getExhibitions(number) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getExhibitions}?page=${number}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async getCategories(number, perPage) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.categories}?page=${number}&limit=${perPage}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }
  async addCategories(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.categories}`,
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
  async updateCategories(payload, id) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.categories}/${id}`,
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
  async getSubmissions(number) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.submissions}?page=${number}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async getItems(number, perPage) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.items}?page=${number}&limit=${perPage}`
      );
      const { data } = request;
      return {
        results: data,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteExhibition(id) {
    try {
      const request = await Repository.delete(
        `${baseUrl}${routes.getExhibitions}/${id}`
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
