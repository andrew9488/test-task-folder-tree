import BaseApiService from "./base-api.service";

export interface ICreateTreeNodePayload {
  treeName: string;
  parentNodeId: number;
  nodeName: string;
}

export interface IDeleteTreeNodePayload {
  treeName: string;
  nodeId: number;
}

export interface IRenameTreeNodePayload {
  treeName: string;
  nodeId: number;
  newNodeName: string;
}

class TreeNodeApiService {
  async createTreeNode(payload: ICreateTreeNodePayload): Promise<void> {
    const response = await BaseApiService.https.post(
      "/api.user.tree.node.create",
      null,
      { params: payload }
    );
    return response.data;
  }

  async deleteTreeNode(payload: IDeleteTreeNodePayload): Promise<void> {
    const response = await BaseApiService.https.post(
      "/api.user.tree.node.delete",
      null,
      { params: payload }
    );
    return response.data;
  }

  async renameTreeNode(payload: IRenameTreeNodePayload): Promise<void> {
    const response = await BaseApiService.https.post(
      "/api.user.tree.node.rename",
      null,
      { params: payload }
    );
    return response.data;
  }
}

export default new TreeNodeApiService();
