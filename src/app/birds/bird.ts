export interface IBird {
    Id: number;
    Name: string;
    FeatherColor: string;
    Beak: string;
    Description: string;
}

export class Bird implements IBird {
    constructor(
        public Id: number,
        public Name: string,
        public FeatherColor: string,
        public Beak: string,
        public Description: string) {

        }
}

export interface IBirdResponse {
    data: IBird[];
}
