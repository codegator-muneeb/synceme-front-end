export class Leaves {
    quota: string;
    fromDate: string;
    toDate: string;
    entitlement: string;
    remaining: string
}

export class Holiday{
    name: string;
    date: string;
    type: string;
}

export const LEAVES_LIST: Leaves[] = [
    {
        quota: "Privilege Leave",
        fromDate: "01/01/2019",
        toDate: "31/12/2019",
        entitlement: "18",
        remaining: "15" 
    },
    {
        quota: "Casual Leave",
        fromDate: "01/01/2019",
        toDate: "31/12/2019",
        entitlement: "6",
        remaining: "5" 
    },
    {
        quota: "Sick Leave",
        fromDate: "01/01/2019",
        toDate: "31/12/2019",
        entitlement: "6",
        remaining: "6" 
    }
];

export const HOLIDAY_LIST: Holiday[] = [
    {
        name: "Republic Day",
        date: "1-Jan-2019",
        type: "Fixed"
    },
    {
        name: "Holi",
        date: "31-Mar-2019",
        type: "Fixed"
    },
    {
        name: "Ambedkar Jayanti",
        date: "1-Jan-2019",
        type: "Fixed"
    },
    {
        name: "Independence Day",
        date: "15-Aug-2019",
        type: "Fixed"
    },
    {
        name: "Eid-Ul-Fitr",
        date: "30-Aug-2019",
        type: "Optional"
    },
    {
        name: "Eid-Ul-Adha",
        date: "20-Oct-2019",
        type: "Optional"
    },
    {
        name: "Gas Tragedy",
        date: "3-Dec-2019",
        type: "Fixed"
    },
    {
        name: "Christmas",
        date: "25-Dec-2019",
        type: "Fixed"
    },
];