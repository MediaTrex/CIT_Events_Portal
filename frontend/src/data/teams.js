// Teams data store - Data only, no logic
// Structure: { id, name, leaderId, members: [{ id, email, name }], createdAt, status }

export const initialTeams = [
    {
        id: "team-001",
        name: "Alpha Coders",
        leaderId: 23,
        members: [
            {
                id: 23,
                email: "youremail@example.edu.in",
                name: "John Kumar Doe",
            },
            {
                id: "tm-001",
                email: "teammate1@example.edu.in",
                name: "Teammate One",
            },
            {
                id: "tm-002",
                email: "teammate2@example.edu.in",
                name: "Teammate Two",
            },
            {
                id: "tm-003",
                email: "teammate3@example.edu.in",
                name: "Teammate Three",
            },
        ],
        createdAt: new Date("2025-01-15").toISOString(),
        status: "active",
    },
    {
        id: "team-002",
        name: "MetriX",
        leaderId: 23,
        members: [
            {
                id: 23,
                email: "youremail@example.edu.in",
                name: "John Kumar Doe",
            },
            {
                id: "tm-001",
                email: "teammate1@example.edu.in",
                name: "Teammate One",
            },
            {
                id: "tm-002",
                email: "teammate2@example.edu.in",
                name: "Teammate Two",
            },
            {
                id: "tm-003",
                email: "teammate3@example.edu.in",
                name: "Teammate Three",
            },
        ],
        createdAt: new Date("2025-01-15").toISOString(),
        status: "active",
    },
];
