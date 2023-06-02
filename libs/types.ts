export type Result<T> = {
  code: number;
  hasError: boolean;
  errMsg: string;
  payload: T | null;
};

export type Stand = {
  id: string;
  name: string;
};

export type TaxiRanks = {
  taxi_ranks: Stand[];
};

type Link = {
  href: string;
};

export type Journey = {
  id: string;
  departure_id: string;
  arrival_id: string;
  reserved_seats: number;
  departure_schedule: string;
  _links: {
    self: Link;
    cancel?: Link;
    close?: Link;
  };
};

export type Owner = {
  name: string;
  _links: {
    "start-journey": Link;
    trips: Link;
    journey_in_progress?: Link;
  };
};
