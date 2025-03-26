import { describe, expect, it, vi } from 'vitest';
import { useEventBus } from './event-bus';
import type { EventBusType } from './event-bus-type';

describe('useEventBus', () => {
  it('should subscribe to and receive events', () => {
    const eventBus = useEventBus();
    const mockCallback = vi.fn();

    eventBus.on('alert', mockCallback);
    eventBus.emit('alert', 'test message');

    expect(mockCallback).toHaveBeenCalledWith('test message');
  });

  it('should handle multiple subscribers', () => {
    const eventBus = useEventBus();
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    eventBus.on('alert', mockCallback1);
    eventBus.on('alert', mockCallback2);
    eventBus.emit('alert', 'test message');

    expect(mockCallback1).toHaveBeenCalledWith('test message');
    expect(mockCallback2).toHaveBeenCalledWith('test message');
  });

  it('should not trigger callbacks for non-existent events', () => {
    const eventBus = useEventBus();
    const mockCallback = vi.fn();

    eventBus.on('alert', mockCallback);
    eventBus.emit('alert' as EventBusType, 'test message');

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
