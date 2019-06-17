export class Abbreviation {
    short: string;
    long: string;
}

export class LegendElement{
    color: string;
    value: string;
    picture: string;
}

export const A_LIST: Abbreviation[] = [
    {
        short: "PL",
        long: "Privelege Leave"
    },
    {
        short: "SL",
        long: "Sick Leave"
    },
    {
        short: "CL",
        long: "Casual Leave"
    },
    {
        short: "PL",
        long: "Privelege Leave"
    },
    {
        short: "PL",
        long: "Privelege Leave"
    },
    {
        short: "PL",
        long: "Privelege Leave"
    },
]

export const L_LIST: LegendElement[] = [
    {
        color: "orange",
        value: "Weekend / Public Holiday",
        picture: "assets/images/orange.png"
    },
    {
        color: "green",
        value: "Working",
        picture: "assets/images/green.png"
    },
    {
        color: "blue",
        value: "Leave",
        picture: "assets/images/blue.png"
    },
]