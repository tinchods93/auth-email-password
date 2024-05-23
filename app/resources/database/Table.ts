import { DatabaseInterface } from './interfaces/DatabaseInterface';
import { TableInterface } from './interfaces/TableInterface';

/**
 * `Table` class implements the `TableInterface`.
 * It represents a table in a database, with methods for getting, finding, scanning, and adding items.
 */
export default class Table implements TableInterface {
  private name: string;

  private data: any;

  private database: DatabaseInterface;

  /**
   * Constructs a new `Table`.
   * @param tableName - The name of the table.
   * @param tableData - The data in the table.
   * @param database - The database that the table belongs to.
   */
  constructor(tableName: string, tableData: any, database: DatabaseInterface) {
    this.name = tableName;
    this.data = tableData;
    this.database = database;
  }

  /**
   * Gets an item from the table by its key.
   * @param key - The key of the item to get.
   * @returns The item with the specified key.
   */
  async getItem(key: string) {
    return this.data[key];
  }

  /**
   * Finds items in the table that match a query.
   * @param query - The query to match items against.
   * @returns An array of items that match the query.
   */
  async findItems(query: any) {
    const queryAttributes = Object.keys(query);
    const findedKey = Object.keys(this.data).filter((key) => {
      return queryAttributes.every(
        (attribute) => this.data[key][attribute] === query[attribute]
      );
    });

    const findedItems = findedKey.map((key) => this.data[key]);

    return findedItems ?? [];
  }

  /**
   * Scans the table and returns all items.
   * @returns An array of all items in the table.
   */
  async scan() {
    return Object.values(this.data);
  }

  /**
   * Adds an item to the table.
   * @param key - The key of the item to add.
   * @param value - The value of the item to add.
   */
  async addItem(key: string, value: any) {
    // Implementation goes here
    this.data[key] = value;
    this.database.addTable(this.name, this.data);
  }
}
