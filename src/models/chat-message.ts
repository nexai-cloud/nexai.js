import { makeObservable, observable } from "mobx";
import { Model } from "./model";

export class ChatMessageModel extends Model {
  constructor() {
    super();
    makeObservable(this, {
      userUid: observable,
      sessionId: observable,
      fromName: observable,
      toName: observable,
      message: observable,
      projectId: observable,
      appId: observable,
      createdAt: observable,
      updatedAt: observable,
      avatarUrl: observable,
      fromType: observable,
      sources: observable,
      aiMuted: observable,
    });
  }

  userUid = '';
  sessionId = '';
  fromName = '';
  toName = '';
  message = '';
  projectId = '';
  appId = '';
  createdAt = '';
  updatedAt = '';
  avatarUrl = '';
  fromType = '';
  sources = [];
  aiMuted = false;
}