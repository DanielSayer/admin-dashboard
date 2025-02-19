import { defaultSubscriberData, Subscriber } from "@/lib/mock-data/subscribers";
import { mimicServerCall } from "./lib";

export const getSubscribers = async (): Promise<Subscriber[]> => {
  await mimicServerCall();
  const savedSubscribers = localStorage.getItem("subscribers");

  if (savedSubscribers) {
    const parsedSubscribers = JSON.parse(savedSubscribers) as Subscriber[];
    return parsedSubscribers.sort((a, b) => a.name.localeCompare(b.name));
  }

  return defaultSubscriberData.sort((a, b) => a.name.localeCompare(b.name));
};
