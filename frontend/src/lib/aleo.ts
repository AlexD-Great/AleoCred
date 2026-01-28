export const PROGRAM_ID = "credentify.aleo";
export const NETWORK_URL = "https://api.explorer.provable.com/v1";

export interface EventInfo {
  organizer: string;
  active: boolean;
  total_issued: number;
}

export async function getEventInfo(eventId: string): Promise<EventInfo | null> {
  try {
    const response = await fetch(
      `${NETWORK_URL}/testnet/program/${PROGRAM_ID}/mapping/events/${eventId}`
    );
    if (!response.ok) return null;
    const data = await response.text();
    return parseEventInfo(data);
  } catch (error) {
    console.error("Error fetching event info:", error);
    return null;
  }
}

export async function checkIsOrganizer(address: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${NETWORK_URL}/testnet/program/${PROGRAM_ID}/mapping/organizers/${address}`
    );
    if (!response.ok) return false;
    const data = await response.text();
    return data.includes("true");
  } catch (error) {
    console.error("Error checking organizer status:", error);
    return false;
  }
}

export async function getProgram(): Promise<string | null> {
  try {
    const response = await fetch(`${NETWORK_URL}/testnet/program/${PROGRAM_ID}`);
    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    console.error("Error fetching program:", error);
    return null;
  }
}

export function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const hash = Array.from(eventName + timestamp.toString())
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `${hash}field`;
}

function parseEventInfo(data: string): EventInfo | null {
  try {
    const organizer = data.match(/organizer:\s*(aleo1\w+)/)?.[1] || "";
    const active = data.includes("active: true");
    const totalMatch = data.match(/total_issued:\s*(\d+)/);
    const total_issued = totalMatch ? parseInt(totalMatch[1]) : 0;
    return { organizer, active, total_issued };
  } catch {
    return null;
  }
}
