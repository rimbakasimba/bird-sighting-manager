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
