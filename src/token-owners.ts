import {
  near,
  JSONValue,
  json,
  BigDecimal,
  log,
} from "@graphprotocol/graph-ts";
import { Storage } from "../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(actions[i], receipt);
  }
}

function handleAction(
  action: near.ActionValue,
  receiptWithOutcome: near.ReceiptWithOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    return;
  }
  const outcome = receiptWithOutcome.outcome;
  const functionCall = action.toFunctionCall();
  const methodName = functionCall.methodName;

  if (methodName == "set_info") {
    for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
      
      const outcomeLog = outcome.logs[logIndex].toString();

      log.debug("before parsing",[outcomeLog.substring(0,11)]);

      if (outcomeLog.substring(0,5) != "EVENT"){
        continue;
      }

      log.info("outcomeLog {}", [outcomeLog]);

      let parsed = outcomeLog.replace("EVENT_JSON:", "");
      parsed = parsed.replace(", data_source: TokenOwners, component: UserMapping","");
      log.info("parsed {}", [parsed]);
      log.debug("this is parsed", [parsed]);

      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      let initial_storage: JSONValue|null = new JSONValue();
      let current_storage: JSONValue|null = new JSONValue();
      let attached_deposit: JSONValue|null = new JSONValue();

      initial_storage = jsonObject.get("initial_storage");
      current_storage = jsonObject.get("current_storage");
      attached_deposit = jsonObject.get("attached_deposit");

      if (!initial_storage || !current_storage || !attached_deposit) return;

      let entity = Storage.load(receiptWithOutcome.receipt.id.toHex());

      if (!entity) {
        entity = new Storage(receiptWithOutcome.receipt.id.toHex());
        entity.initialStorage = BigDecimal.fromString(
          initial_storage.toBigInt().toString()
        );
        entity.currentStorage = BigDecimal.fromString(
          current_storage.toBigInt().toString()
        );
        entity.attachedDeposit = BigDecimal.fromString(
          attached_deposit.toBigInt().toString()
        );
      }

      entity.save();
    }
  }
}
