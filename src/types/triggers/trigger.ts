import { EventType, TriggerType } from "../common/trigger";

export interface Trigger {
  activation: TriggerType;
  event: EventType;

  activeFrom: number;
  activeTo: number;

  retrigger: number;

  eventData: Array<any>;
}

export function serializeTriggersSync(triggers: Trigger[]) {
  if (triggers.length < 1) { return undefined; }
  
  const object: Array<any> = [];

  for (const trigger of triggers) {
    object.push({
      ...(trigger.activation !== undefined && { event_trigger: trigger.activation }),
      ...(trigger.event !== undefined && { event_type: trigger.event }),
      ...(trigger.retrigger !== undefined && { event_retrigger: trigger.retrigger }),
      ...(trigger.eventData !== undefined && { event_data: trigger.eventData }),

      ...((
        trigger.activeFrom !== undefined
        || trigger.activeTo !== undefined 
      ) && { event_trigger_time: {
        x: trigger.activeFrom || 0,
        y: trigger.activeTo || 0
      } }),

    })
  }

  return object;
}

export function deserializeTriggersSync(triggers: Array<any>): Trigger[] {
  if (!triggers) { return []; }

  const object: Trigger[] = [];

  for(const trigger of triggers) {
    object.push({
      activation: trigger.event_trigger,
      event: trigger.event_type,

      activeFrom: trigger.event_trigger_time && trigger.event_trigger_time.x,
      activeTo: trigger.event_trigger_time && trigger.event_trigger_time.y,

      retrigger: trigger.event_retrigger,

      eventData: trigger.event_data
    })
  }

  return object;
}