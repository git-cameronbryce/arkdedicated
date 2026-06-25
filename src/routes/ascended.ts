import { Battlemetrics, Response } from "../types/api";

export const getAscendedMatch = async (name: string): Promise<Response[]> => {
  try {
    const search = name.split(" ")[0];
    const url = `https://api.battlemetrics.com/servers?filter[game]=arksa&filter[search]=${encodeURIComponent(search)}`;

    const response = await fetch(url);
    const data: Battlemetrics = await response.json();

    return data.data
      .filter((s) => s.attributes.name.toLowerCase().includes(name))
      .map((s) => ({
        name: s.attributes.name,
        players: s.attributes.players,
        maxPlayers: s.attributes.maxPlayers,
      }));
  } catch (error) {
    return [];
  }
};
