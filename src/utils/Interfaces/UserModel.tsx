export interface UserModel {
    name: string;
    age: number;
    gender: string;
    contactDetails?: ContactDetails[]
}

export interface ContactDetails {
    phoneNo: string | null,
    emailId: string | null
}