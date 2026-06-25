export interface Battlemetrics {
  data: {
    attributes: Attributes;
  }[];
}

export interface Attributes {
  name: string;
  players: number;
  maxPlayers: number;
}

export interface Wiki {
  Name: string;
  NumPlayers: number;
  MaxPlayers: number;
}

export interface Response {
  name: string;
  players: number;
  maxPlayers: number;
}
