# KVK Directeur Zoeker

Een eenvoudige web-applicatie om directeuren van bedrijven te vinden via de KVK API en deze te exporteren naar Excel.

## Gebruik

1. Open `index.html` in uw webbrowser
2. Voer een bedrijfsnaam in
3. Klik op "Zoeken"
4. De gevonden directeuren worden getoond
5. Klik op "Exporteren naar Excel" om de gegevens te downloaden

## Setup

Om de applicatie te gebruiken heeft u een KVK API key nodig:

1. Ga naar [KVK API Portal](https://api.kvk.nl/)
2. Registreer een account en vraag een API key aan
3. Vervang `YOUR_API_KEY` in `script.js` met uw API key

## Technische Details

De applicatie gebruikt:
- HTML5
- JavaScript (ES6+)
- Tailwind CSS voor styling
- SheetJS voor Excel export
- KVK API voor bedrijfsgegevens

## Deployment

Deze applicatie kan eenvoudig worden gehost op GitHub Pages of Vercel:

### GitHub Pages
1. Push de code naar een GitHub repository
2. Ga naar repository settings
3. Scroll naar "GitHub Pages" sectie
4. Selecteer de main branch als source

### Vercel
1. Push de code naar een GitHub repository
2. Ga naar [Vercel](https://vercel.com)
3. Importeer uw repository
4. Deploy met de standaard instellingen 