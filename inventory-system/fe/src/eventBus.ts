import { ref } from 'vue';

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
    emit(event: EventBusType, payload: unknown) {
      if (eventBus.value.has(event)) {
        eventBus.value.get(event)!.forEach((callback: EventCallback) => callback(payload));
      }
    },
  };
}

export type EventBusType = 'alert'
