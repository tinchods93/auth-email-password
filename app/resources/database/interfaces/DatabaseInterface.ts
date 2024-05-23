import Table from '../Table';

export interface DatabaseInterface {
  addTable(tableName: string, table?: any): void;
  getTable(tableName: string): Table | undefined;
}
