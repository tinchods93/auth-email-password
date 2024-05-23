export interface TableInterface {
  getItem(key: string): Promise<any>;
  addItem(key: string, value: any): Promise<any>;
  findItems(query: any): Promise<any[]>;
  scan(): Promise<any[]>;
}
