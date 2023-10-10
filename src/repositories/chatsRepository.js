import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  createChat: "/chat/",
  getUserChats: "/chat/",
  findUsersChat: "/chat/findChat/",
  createMessage: "/chat/createMessage",
  getMessages: "/chat/getMessages/",
  deleteChat: "/chat/",
  updateChat: "/chat/",
  sendChatLink: "/users/send-chatlink",
};

class ChatsRepositiory {
  async createChat(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.createChat}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }

  async getUserChats(userId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getUserChats}${userId}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }

  async findUsersChat(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.findUsersChat}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async createMessage(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.createMessage}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async getMessages(chatId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getMessages}${chatId}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteChat(chatId) {
    try {
      const request = await Repository.delete(
        `${baseUrl}${routes.deleteChat}${chatId}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateChat(chatId, updateChat) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.updateChat}${chatId}`,
        updateChat
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async sendChatLink(chatdata) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.sendChatLink}`,
        chatdata
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new ChatsRepositiory();
