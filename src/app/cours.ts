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
  Lundi: Array<Cour>;
  Mardi: Array<Cour>;
  Mercredi: Array<Cour>;
  Jeudi: Array<Cour>;
  Vendredi: Array<Cour>;
  jours?: string;
}

export class Semaine {
  public jours?: string;
  public Lundi: Array<Cour>;
  public Mardi: Array<Cour>;
  public Mercredi: Array<Cour>;
  public Jeudi: Array<Cour>;
  public Vendredi: Array<Cour>;

  constructor(
    lundi: Array<Cour>,
    mardi: Array<Cour>,
    mercredi: Array<Cour>,
    jeudi: Array<Cour>,
    vendredi: Array<Cour>,
    jours?: string
  ) {
    this.Lundi = lundi;
    this.Mardi = mardi;
    this.Mercredi = mercredi;
    this.Jeudi = jeudi;
    this.Vendredi = vendredi;
  }
}

export interface Cour {
  nom: string;
  prof: string;
  groupe: string;
  horaires: string;
  salle: string;
}
