# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

===========================================================
Teknisk Analys
===========================================================

Arvid Rönnkvist SYSM8 Gränssnittsutveckling

DRONE DELIGHT
En demosida i react som är en matleveranstjänst likt foodora fast med drönare.

To-Do:
När du öppnat projektet i vs code behöver du öppna en terminal och starta json servern genom att välja projektets directory och sedan skriva in "npx json-server --watch db.json --port 3001" i terminalen. Testa att det funkar som det ska genom att klicka på en av endpointsen och se att data visas.

Du behöver i en annan terminal köra igång react genom att välja rätt directory och köra "npm run dev".

---

Reflektion:
Det här har varit ett utmanande projekt där jag varit lite av en tidsoptemist och inte bett om hjälp till den grad jag bör ha gjort. Men det har varit otroligt lärorikt och roligt faktiskt trots att det varit väldigt frustrerande vissa stunder.

När jag startade projektet så började jag kolla på foodora och uber eats för inspiration. Både deras appar och desktop varianter. Med det som inspiration så började jag rita upp wireframes för desktop och mobil som jag sedan klistrade in i figma för att göra en mer ordentlig design. Den första designen följde jag wireframes till punkt och pricka men när jag började göra komponenter och skriva html så insåg jag att jag ville ha en hero page och bestämde mig för att göra om designen och jag är nöjd med det beslutet. Jag valde att gå efter en cyberpunkig känsla i ett regnigt Neon Malmö med drönare som levererar förnödenheter till alla cyborgs.

Efter att ha fått fram det visuella på min localhost så började jag fundera på hur jag skulle strukturera min databas. Jag valde att använda tre endpoints. Restaurants med alla kategorier av rätter och kategorier på rätter i sig. Users med användare och orders där jag lagrar alla ordrar med vilken användare som beställt och annan relevant data.

När detta var gjort så fyllde jag restaurants med Johnny's burgers för att försöka visa upp alla restauranger som är lagrade i en RestaurantGrid, för att sedan implementera en funktion att gå in på vald restaurang och se vad som finns på menyn. Några api anrop senare så var det gjort.

Det var krångligt att visa upp bilder ett tag men de flesta problem kunde jag lösa med gpt. Samt att få till komponenttänket tog ett litet tag. Vart man bör hämta data för att skicka ner till barnkomponenter, så man inte gör ett api anrop för restauranger i app.jsx för att sedan hämta samma sak i RestaurantGrid. Istället så skickar jag med restauranger som prop. Ju högre upp man hämtar data i hierarkin ju bättre tänker jag. Vissa saker som regn-effekten på hero image löste jag typ helt med ai. Om jag hade haft mer tid hade jag kanske satt mig in i det hur man löste det mer.

Jag vet att mitt projekt är rörigt men react har varit relativt nytt för mig, men jag har gjort mitt bästa och jag är nöjd med hur hemsidan ser ut. Jag älskar cyberpunk känslan på hero page, jag tycker det är smidigt att leta rätt på rätt typ av restaurang. Det är bra att man kan se vilka rätter som är populära hos en restaurang. Du kan se dina äldre beställningar, vad dina favoriter är baserat på dina tidigare beställningar. Jag önskar att jag hade haft mer tid att lägga på mobile men jag tror jag kommer vilja snygga till allt när jag fått betyg för att visa på min github.

Jag läste precis att man ska kunna lägga till varor i en lista med favoriter och att det inte ska vara automatiskt baserat på vad användaren beställer mest.. Men jag hoppas att du kan ha översikt kring det.

Samt vissa delar som payment är lite underarbetade och jag var en tidsoptimist och fick ont om tid på slutet så jag hoppas du inte dömer mig alltför hårt.

Jag har inte heller en helt komplett figma med alla modaler, jag var en av dom som inte trodde det behövdes och det blev lite ont med tid nu på slutet. Men mina homepages för desktop och mobile är jag nöjd med.
