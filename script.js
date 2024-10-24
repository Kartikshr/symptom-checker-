// Array of symptoms and their possible diseases with explanations, follow-up tests, and probabilities
const symptomDiseaseMapping = [
    { 
        symptom: 'fever', 
        diseases: [
            { name: 'flu', explanation: 'A common viral infection that affects the respiratory system.', tests: ['Flu test (nasal swab)'], probability: 60 },
            { name: 'COVID-19', explanation: 'A viral infection caused by the SARS-CoV-2 virus.', tests: ['COVID-19 PCR test'], probability: 50 },
            { name: 'malaria', explanation: 'A parasitic infection transmitted by mosquito bites.', tests: ['Blood smear test'], probability: 30 }
        ] 
    },
    { 
        symptom: 'cough', 
        diseases: [
            { name: 'flu', explanation: 'A common viral infection that affects the respiratory system.', tests: ['Flu test (nasal swab)'], probability: 70 },
            { name: 'cold', explanation: 'A mild viral infection of the nose and throat.', tests: ['None required, resolves on its own'], probability: 80 },
            { name: 'COVID-19', explanation: 'A viral infection caused by the SARS-CoV-2 virus.', tests: ['COVID-19 PCR test'], probability: 60 }
        ] 
    },
    { 
        symptom: 'headache', 
        diseases: [
            { name: 'migraine', explanation: 'A severe, throbbing headache often accompanied by nausea and sensitivity to light.', tests: ['Neurological examination', 'MRI'], probability: 40 },
            { name: 'tension headache', explanation: 'A mild to moderate headache often caused by stress.', tests: ['None required, resolves with rest'], probability: 50 },
            { name: 'flu', explanation: 'A common viral infection that affects the respiratory system.', tests: ['Flu test (nasal swab)'], probability: 20 }
        ] 
    },
    { 
        symptom: 'sore throat', 
        diseases: [
            { name: 'cold', explanation: 'A mild viral infection of the nose and throat.', tests: ['None required, resolves on its own'], probability: 70 },
            { name: 'flu', explanation: 'A common viral infection that affects the respiratory system.', tests: ['Flu test (nasal swab)'], probability: 40 },
            { name: 'strep throat', explanation: 'A bacterial infection that causes pain and inflammation in the throat.', tests: ['Throat culture', 'Rapid strep test'], probability: 30 }
        ] 
    },
    { 
        symptom: 'nausea', 
        diseases: [
            { name: 'gastroenteritis', explanation: 'An inflammation of the stomach and intestines, often caused by viral or bacterial infections.', tests: ['Stool test', 'Blood test'], probability: 60 },
            { name: 'food poisoning', explanation: 'Illness caused by consuming contaminated food.', tests: ['Stool culture'], probability: 50 }
        ] 
    },
    { 
        symptom: 'fatigue', 
        diseases: [
            { name: 'anemia', explanation: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body.', tests: ['Complete blood count (CBC)'], probability: 70 },
            { name: 'depression', explanation: 'A mood disorder characterized by persistent sadness and loss of interest.', tests: ['Psychiatric evaluation'], probability: 40 }
        ] 
    },
    { 
        symptom: 'chest pain', 
        diseases: [
            { name: 'heart attack', explanation: 'A blockage of blood flow to the heart muscle.', tests: ['Electrocardiogram (ECG)', 'Blood tests (troponin)'], probability: 90 },
            { name: 'angina', explanation: 'Chest pain due to reduced blood flow to the heart.', tests: ['Stress test', 'Coronary angiography'], probability: 60 }
        ] 
    }
    // Add more symptoms and corresponding diseases as needed
];

document.getElementById('check-button').addEventListener('click', () => {
    const input = document.getElementById('symptom-input').value;
    const symptoms = input.split(',').map(s => s.trim().toLowerCase());
    const possibleDiseases = [];

    symptoms.forEach(symptom => {
        const match = symptomDiseaseMapping.find(s => s.symptom === symptom);
        if (match) {
            match.diseases.forEach(disease => {
                const existingDisease = possibleDiseases.find(d => d.name === disease.name);
                if (existingDisease) {
                    // Average probability if the disease is matched with multiple symptoms
                    existingDisease.probability = (existingDisease.probability + disease.probability) / 2;
                } else {
                    possibleDiseases.push({
                        name: disease.name,
                        explanation: disease.explanation,
                        tests: disease.tests,
                        probability: disease.probability
                    });
                }
            });
        }
    });

    const outputDiv = document.getElementById('diagnosis-output');
    if (possibleDiseases.length > 0) {
        outputDiv.innerHTML = '<h3>Possible Diagnoses:</h3>';
        possibleDiseases.forEach(disease => {
            outputDiv.innerHTML += `
                <div class="card mt-3">
                    <div class="card-body">
                        <h4 class="card-title">${disease.name} (${disease.probability}% likelihood)</h4>
                        <p class="card-text"><strong>Explanation:</strong> ${disease.explanation}</p>
                        <p class="card-text"><strong>Follow-up tests:</strong> ${disease.tests.join(', ')}</p>
                    </div>
                </div>
            `;
        });
    } else {
        outputDiv.innerHTML = '<p>No possible diagnoses found. Please try different symptoms.</p>';
    }
});
