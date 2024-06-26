type Callback = (...args: unknown[]) => void;

class EventBus {
  private listeners: Record<string, Callback[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: unknown[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    const eventListeners = this.listeners[event];
    if (!eventListeners) {
      return;
    }

    eventListeners.forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;
