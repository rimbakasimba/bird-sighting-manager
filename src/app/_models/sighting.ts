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