import { Response, Wiki } from "../types/api";

export const getEvolvedMatch = async (name: string): Promise<Response[]> => {
  try {
    const url = "http://arkdedicated.com/xbox/cache/unofficialserverlist.json";

    const response = await fetch(url);
    const data: Wiki[] = await response.json();

    return data
      .filter((s) => s.Name.toLowerCase().includes(name))
      .map((s) => ({
        name: s.Name,
        players: s.NumPlayers,
        maxPlayers: s.MaxPlayers,
      }));
  } catch (error) {
    return [];
  }
};
