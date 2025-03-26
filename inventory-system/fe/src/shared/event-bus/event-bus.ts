import { ref } from 'vue';
import type { EventBusType } from './event-bus-type';

type EventCallback = (payload: unknown) => void;

const eventBus = ref(new Map<string, EventCallback[]>());

export function useEventBus() {
  return {
    on(event: EventBusType, callback: EventCallback) {
      if (!eventBus.value.has(event)) {
        eventBus.value.set(event, []);
      }
      eventBus.value.get(event)!.push(callback);
    },
    emit<T>(event: EventBusType, payload: T) {
      if (eventBus.value.has(event)) {
        eventBus.value.get(event)!.forEach((callback: EventCallback) => callback(payload));
      }
    },
  };
}
