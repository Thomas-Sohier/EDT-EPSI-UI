export interface Cours {
  id: string;
  cours: Semaine;
}

export class Cours {
  public id: string;
  public cours: Semaine;

  constructor(id: string, cours: Semaine) {
    this.id = id;
    this.cours = cours;
  }
}

export interface Semaine {
  jours: Array<Journee>;
}

export class Semaine {
  public jours: Array<Journee>;

  constructor(jours: Array<Journee>) {
    this.jours = jours;
  }
}

export interface Journee {
  cours: Array<Cour>;
}

export class Journee {
  public cours: Array<Cour>;
  public jour: string;

  constructor(cours: Array<Cour>, jour: string) {
    this.cours = cours;
  }
}

export interface Cour {
  nom: string;
  prof: string;
  groupe: string;
  horaires: string;
  salle: string;
}
