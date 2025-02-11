export interface CharactersDTO {
  items: CharacterDTO[];
  meta: MetaDTO;
  links: LinksDTO;
}

export interface CharacterDTO {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
}

export interface LinksDTO {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface MetaDTO {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface TransformationDTO {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: null;
}
