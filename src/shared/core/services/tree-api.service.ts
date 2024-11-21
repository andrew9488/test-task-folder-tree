import BaseApiService from "./base-api.service";
import { ITree } from "../interfaces";

class TreeApiService {
  async getTree(treeName: string): Promise<ITree | null> {
    const response = await BaseApiService.https.post<ITree>(
      "/api.user.tree.get",
      null,
      { params: { treeName } }
    );
    return response.data;
  }
}

export default new TreeApiService();
