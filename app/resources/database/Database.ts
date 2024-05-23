import fs from 'fs';
import path from 'path';
import Table from './Table';
import { DatabaseInterface } from './interfaces/DatabaseInterface';

const basePath = './databases';
class DatabaseObject implements DatabaseInterface {
  private name: string;

  constructor(databaseName: string) {
    if (databaseName === '') {
      throw new Error('Database name is required');
    }
    this.name = `${databaseName}-db`;
    this.build();
  }

  private build() {
    const dbPath = path.resolve(__dirname, `${basePath}/${this.name}/tables`);
    const dbExists = fs.existsSync(dbPath);

    if (!dbExists) {
      fs.mkdirSync(dbPath, {
        recursive: true,
      });
      console.log(`Database ${this.name} created successfully`);
    }
  }

  addTable(tableName: string, table?: any) {
    if (tableName === '') {
      return;
    }
    const tablePath = path.resolve(
      __dirname,
      `${basePath}/${this.name}/tables/${tableName}.json`
    );
    const tableExists = fs.existsSync(tablePath);

    if (!tableExists) {
      fs.writeFileSync(tablePath, JSON.stringify({}, null, 2));
    }

    if (table) {
      fs.writeFileSync(tablePath, JSON.stringify(table, null, 2));
    }
  }

  getTable(tableName: string) {
    try {
      const tablePath = path.resolve(
        __dirname,
        `${basePath}/${this.name}/tables/${tableName}.json`
      );
      const table = fs.readFileSync(tablePath, 'utf-8');

      return new Table(tableName, JSON.parse(table), this);
    } catch (error) {
      throw new Error(
        JSON.stringify({ message: 'Table not found', status: 500 })
      );
    }
  }
}

let database: DatabaseObject;

const Database = (databaseName = 'DefaultDatabaseName') => {
  if (!database) {
    database = new DatabaseObject(databaseName);
  }

  return database;
};

export default Database;
