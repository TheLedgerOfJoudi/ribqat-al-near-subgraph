// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Storage extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Storage entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Storage must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Storage", id.toString(), this);
    }
  }

  static load(id: string): Storage | null {
    return changetype<Storage | null>(store.get("Storage", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get initialStorage(): BigDecimal {
    let value = this.get("initialStorage");
    return value!.toBigDecimal();
  }

  set initialStorage(value: BigDecimal) {
    this.set("initialStorage", Value.fromBigDecimal(value));
  }

  get currentStorage(): BigDecimal {
    let value = this.get("currentStorage");
    return value!.toBigDecimal();
  }

  set currentStorage(value: BigDecimal) {
    this.set("currentStorage", Value.fromBigDecimal(value));
  }

  get attachedDeposit(): BigDecimal {
    let value = this.get("attachedDeposit");
    return value!.toBigDecimal();
  }

  set attachedDeposit(value: BigDecimal) {
    this.set("attachedDeposit", Value.fromBigDecimal(value));
  }
}