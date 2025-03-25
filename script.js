// Uw KVK API key moet hier worden ingevuld
const KVK_API_KEY = 'YOUR_API_KEY';
const KVK_API_URL = 'https://api.kvk.nl/api/v2/search/companies';

let directorsData = [];

async function searchCompany() {
    const companyName = document.getElementById('companyName').value;
    if (!companyName) {
        alert('Voer een bedrijfsnaam in');
        return;
    }

    // Toon loading indicator
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');

    try {
        const response = await fetch(`${KVK_API_URL}?q=${encodeURIComponent(companyName)}`, {
            headers: {
                'Authorization': `Bearer ${KVK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        directorsData = [];

        // Verwerk de resultaten
        if (data.data && data.data.length > 0) {
            for (const company of data.data) {
                if (company.directors) {
                    for (const director of company.directors) {
                        directorsData.push({
                            'Bedrijfsnaam': company.name,
                            'KvK Nummer': company.kvkNumber,
                            'Directeur Naam': director.name,
                            'Functie': director.function,
                            'Adres': company.address?.street + ' ' + company.address?.houseNumber,
                            'Postcode': company.address?.postalCode,
                            'Plaats': company.address?.city
                        });
                    }
                }
            }
        }

        // Toon resultaten
        displayResults();
    } catch (error) {
        console.error('Error:', error);
        alert('Er is een fout opgetreden bij het ophalen van de gegevens.');
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

function displayResults() {
    const directorsList = document.getElementById('directorsList');
    directorsList.innerHTML = '';

    if (directorsData.length === 0) {
        directorsList.innerHTML = '<p class="text-gray-500">Geen directeuren gevonden voor dit bedrijf.</p>';
    } else {
        directorsData.forEach(director => {
            const directorElement = document.createElement('div');
            directorElement.className = 'p-3 bg-gray-50 rounded-md';
            directorElement.innerHTML = `
                <p class="font-medium">${director['Directeur Naam']}</p>
                <p class="text-sm text-gray-600">${director['Bedrijfsnaam']}</p>
                <p class="text-sm text-gray-500">${director['Functie']}</p>
            `;
            directorsList.appendChild(directorElement);
        });
    }

    document.getElementById('results').classList.remove('hidden');
}

function exportToExcel() {
    if (directorsData.length === 0) {
        alert('Er zijn geen gegevens om te exporteren.');
        return;
    }

    // Maak een nieuwe werkmap
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(directorsData);

    // Voeg het werkblad toe aan de werkmap
    XLSX.utils.book_append_sheet(wb, ws, 'Directeuren');

    // Genereer en download het Excel-bestand
    XLSX.writeFile(wb, 'kvk_directeuren.xlsx');
} 