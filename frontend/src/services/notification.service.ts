import API from "@/constants/api.constant";

interface Notification {
  name: string;
  date: string;
}

type Listener = (notifications: Notification[]) => void;

export class NotificationService {
  private eventSource: EventSource | null = null;
  private listeners: Set<Listener> = new Set();
  private notifications: Notification[] = [];

  public constructor() {
    this.connect();
  }

  public connect(): void {
    this.eventSource = new EventSource(API.streamNotifications);

    this.eventSource.onmessage = (event: MessageEvent) => {
      console.log("Notifications service: ", event);
      const newNotification: Notification = JSON.parse(event.data);
      this.notifications = [...this.notifications, newNotification];
      this.notifyListeners();
    };

    this.eventSource.onerror = (error: Event) => {
      console.error("Ошибка SSE:", error);
      this.close();
    };
  }

  public close(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  public addListener(listener: Listener): void {
    this.listeners.add(listener);
  }

  public removeListener(listener: Listener): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.notifications));
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }
}

export const notificationService = new NotificationService();
