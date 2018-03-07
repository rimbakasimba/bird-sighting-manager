export class Trip {
    constructor(
        public Id: number,
        public Location: string,
        public State: string,
        public DateFrom: Date,
        public DateTo: Date) {

    }
}


export interface ITripResponse {
    data: Trip[];
}
