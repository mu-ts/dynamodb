interface TableLog {
  tableName: string;
  idAttribute?: string;
}

export class TableRegistry {
  private static _instance: TableRegistry;

  private readonly ledger: Record<string, TableLog>;

  private constructor() {
    this.ledger = {};
  }

  public register(key: string | Function, options: TableLog): void {
    const name: string = this.keyToName(key);
    this.ledger[name] = options;
  }

  public update(key: string | Function, options: Partial<Exclude<TableLog, 'tableName'>>): void {
    const name: string = this.keyToName(key);
    this.ledger[name] = { ...this.ledger[name], ...options };
  }

  public getTableName(key: string | Function): string {
    const name: string = this.keyToName(key);
    return this.ledger[name].tableName;
  }

  public getIdAttribute(key: string | Function): string | undefined{
    const name: string = this.keyToName(key);
    return this.ledger[name].idAttribute;
  }

  public static instance() {
    if (this._instance) return this._instance;
    this._instance = new TableRegistry();
    return this._instance;
  }

  private keyToName(key: string | Function): string {
    if (typeof key === 'string') return this.ledger[key].tableName;
    const name: string = key.constructor.name;
  }
}

