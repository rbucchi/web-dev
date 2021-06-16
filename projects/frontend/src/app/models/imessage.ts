export interface IMessage<T> {
  id: number;
  timeStamp: Date;
  content: T;
}
