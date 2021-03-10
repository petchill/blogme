import { observable, action, makeAutoObservable, computed } from "mobx";
import { IRoom } from "../interfaces/IRoom";

export class RoomService {
  constructor() {
    makeAutoObservable(this);
  }

  @observable
  public roomData: IRoom = {} as IRoom;

  @action
  public setRoomData(inpRoomData: IRoom) {
    this.roomData = inpRoomData;
  }

  @action
  public async fetchRoomData() {
    // TODO: get API ROOM
    const mockRoomData: IRoom = {
      topic: "สามีมีชู้",
      description:
        "ช่วยด้วยค่ะสามีมีชู้ไม่กลับบ้านมา 1 สัปดาห์แล้ว \nอยากถามว่ามีใครเป็นแบบนี้ไหมคะ",
      liked_user: ["hello"],
      view: 0,
      tags: ["ครอบครัว"],
      owner: "userId1",
    };
    this.roomData = mockRoomData;
  }
}
