import { Battlemetrics, Response } from "../types/api";

export const getAscendedMatch = async (name: string): Promise<Response[]> => {
  try {
    const params = new URLSearchParams({
      "filter[game]": "arksa",
      "filter[search]": name.split(" ")[0],
    });

    const url = `https://api.battlemetrics.com/servers?${params}`;

    const response = await fetch(url);
    const data: Battlemetrics = await response.json();

    const servers = data.data
      .filter((s) => s.attributes.name.toLowerCase().includes(name))
      .map((s) => ({
        name: s.attributes.name,
        players: s.attributes.players,
        maxPlayers: s.attributes.maxPlayers,
      }));

    return servers.sort((a, b) => b.players - a.players).slice(0, 10);
  } catch (error) {
    return [];
  }
};
