export interface IBird {
    Id: number;
    CommonName: string;
    FeatherColor: string;
    Beak: string;
    Description: string;
}

export class Bird implements IBird {
    constructor(
        public Id: number,
        public CommonName: string,
        public FeatherColor: string,
        public Beak: string,
        public Description: string) {

        }
}

export interface IBirdResponse {
    data: IBird[];
}

export enum SightingRating {
    NotAvailable = 0,   /* yet a lifer */
    OK = 1,             /* have a pic but can be improved */
    Profile = 2         /* Top class image worthy of profile */
}

export class BirdSighting {
    constructor(
        public SpecieId: number,
        public TripId: number,
        public Comment: string,
        public Rating: SightingRating) {

        }
}

export class Trip {
    constructor(
        public Id: number,
        public Location: string,
        public State: string,
public Date: DateConstructor) {

    }
}



