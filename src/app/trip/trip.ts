export class Trip {
    constructor(
        public Id: number,
        public Location: string,
        public State: string,
        public Date: DateConstructor) {

    }
}


export interface ITripResponse {
    data: Trip[];
}
