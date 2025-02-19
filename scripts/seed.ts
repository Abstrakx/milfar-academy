const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Micro Green", id: "0933b5c2-cd40-495d-ac06-6788901c2d28" },
                { name: "Hortikultura", id: "7648008b-0000-40d5-a5b9-54246d6c2b6c" },
                { name: "Tanaman Pangan", id: "81203115-f10c-41fd-91a5-2dbf98402fc8"},
                { name: "Hidroponik", id: "a2f9532c-59e3-4ad1-93a8-997ea815c802"},
            ],
        });
        console.log("Seeding finished.");

    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();