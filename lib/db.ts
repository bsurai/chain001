import * as routes from "./routes";

type access = "none" | "read" | "write";

interface IRoles {
    id: number;
    name: string;
    projects: access;
    issues: access;
    persons: access;
};

interface IUsers {
    isAdmin: boolean;
    customerId: number;
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    roleId: number;
    isActive: boolean;
};

interface ICustomers {
    id: number;
    name: string;
    isActive: boolean;
    route: string;
    email: string;
    phone: string;
    person: string;
};

export interface IProjects {
    customerID: number;
    id: number;
    name: string;
    charId: string;
}

let roles: IRoles[] = [
    {
        id: 1,
        name: "manager",
        projects: "write",
        issues: "write",
        persons: "write"
    },
    {
        id: 2,
        name: "employee",
        projects: "read",
        issues: "write",
        persons: "read"
    }
];

let customers: ICustomers[] = [
    {
        id: 1,
        name: "Geo Alliance",
        isActive: true,
        route: "GA",
        email: "andrew.pshinka@geo-alliance.com.ua",
        phone: "+38067*******",
        person: "andrew.pshinka"
    },
    {
        id: 2,
        name: "l.savostyan",
        isActive: true,
        route: "support",
        email: "l.savostyan@ukr.net",
        phone: "+38063*******",
        person: "l.savostyan@ukr.net"
    }
];

let users: IUsers[] = [
    {
        isAdmin: false,
        customerId: 1,
        id: 1,
        name: "bs08@ukr.net",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: 2,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 1,
        id: 2,
        name: "andrew.pshinka@geo-alliance.com.ua",
        password: "456",
        email: "andrew.pshinka@geo-alliance.com.ua",
        phone: "+38067*******",
        roleId: 1,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 2,
        id: 1,
        name: "bs08@ukr.net",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: 2,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 2,
        id: 2,
        name: "l.savostyan@ukr.net",
        password: "456",
        email: "l.savostyan@ukr.net",
        phone: "+38063*******",
        roleId: 1,
        isActive: true
    },
    {
        isAdmin: true,
        customerId: 0,
        id: 1,
        name: "admin",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: undefined,
        isActive: true
    }
];

let projects: IProjects[] = [
    {
        customerID: 2,
        id: 1,
        name: "7S",
        charId: "7S"
    },
    {
        customerID: 2,
        id: 2,
        name: "Olga",
        charId: "OLG"
    },
    {
        customerID: 2,
        id: 3,
        name: "Kradojon",
        charId: "KRJ"
    },
    {
        customerID: 1,
        id: 1,
        name: "General project",
        charId: "GA"
    }
];

export const getProjects = (params: IProjects) => {
    return projects.filter((project: IProjects) => {
        return (!params.charId || project.charId === params.charId)
            && (!params.customerID || project.customerID === params.customerID)
            && (!params.id || project.id === params.id)
            && (!params.name || project.name === params.name);
    });
};

const deprecatedCustomer = (data) => {
    let { internalRoutesGet, externalRoutesGet } = routes;
    let deprNames: string[] = ["login", ...internalRoutesGet, ...externalRoutesGet];
    let itsRoute: boolean = !!deprNames.find((route) => data.route === route);
    if (itsRoute) { return data.route.toUpperCase() + " is deprecated URL. Please enter other one." };

    let itsPost: boolean = data.route.toLowerCase().endsWith("-post");
    if (itsPost) {return "URL should not contain \"-post\""};
};

export const applyNewCustomer = (data) => {

    let err: string = deprecatedCustomer(data);
    if (err) {
        return err;
    };
};


