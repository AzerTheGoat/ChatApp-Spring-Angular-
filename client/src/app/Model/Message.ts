export class Message {
    id: string;
    timestamp: number;
    from: string;
    to: string;
    type: string;
    body: string;
  
    constructor(id: string, timestamp: number, from: string, to: string, type: string, body: string) {
      this.id = id;
      this.timestamp = timestamp;
      this.from = from;
      this.to = to;
      this.type = type;
      this.body = body;
    }
  }