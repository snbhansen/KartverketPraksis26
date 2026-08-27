# Kartverket Praksis 2026

Dette er praksisnettstedet til studentgruppen i IS-302 ved Universitetet i Agder. Nettstedet dokumenterer praksisprosjektet hos Kartverket høsten 2026, der gruppen utvikler en AI-drevet økonomiveileder.

## Sidene på nettstedet

### [Forside](View/index.html)

Gir en introduksjon til praksisprosjektet og fungerer som inngang til resten av nettstedet. Her finnes snarveier til oppgavebeskrivelsen, informasjon om studentgruppen, Kartverket, prosjektdagboken, statusrapportene og refleksjonene.

### [Oppgavebeskrivelse](View/oppgavebeskrivelse.html)

Forklarer prosjektet og problemstillingen. Siden beskriver den AI-drevne økonomiveilederen, hvorfor løsningen utvikles, hvilke arbeidsoppgaver gruppen har, praksisperioden hos Kartverket og studentgruppen.

### [Om oss](View/om-oss.html)

Presenterer studentene som arbeider med prosjektet. Her finner man medlemmenes studiebakgrunn, roller, kompetanseområder, korte beskrivelser og lenker til relevante profiler.

### [Om Kartverket](View/omkartverket.html)

Gir bakgrunnsinformasjon om Kartverket som statlig etat. Siden forklarer samfunnsoppdraget, fagområdene eiendom, land, sjø og geodata, samt hvordan Kartverkets informasjon brukes i samfunnet.

### [Prosjektdagbok](View/prosjektdagbok.html)

Dokumenterer arbeidet gjennom praksisperioden uke for uke. Dagbokinnleggene inneholder blant annet dagens hovedfokus, utført arbeid, samarbeid, nye temaer, vurderinger og planlagt videre arbeid. Innleggene kan åpnes og lukkes individuelt.

### [Status 1](View/status1.html)

Den første statusrapporten beskriver Kartverket og bransjen, prosjektets arbeidsoppgaver, brukerbehovene som undersøkes og målet om å utvikle en trygg og nyttig AI-prototype.

### [Status 2](View/status2.html)

Gir en oppdatering på prosjektets framdrift. Siden beskriver at prosjektet fortsatt er under utvikling, og hva gruppen skal arbeide videre med, blant annet prototypeutvikling, testing og tilbakemeldinger fra brukere.

### [Refleksjoner](View/refleksjoner.html)

Samler erfaringer, oppdagelser og refleksjoner fra praksisperioden. Siden er laget som en loggbok som kan bygges ut med nye refleksjonsinnlegg etter hvert som prosjektet utvikler seg.

## Felles funksjonalitet

- Nettstedet kan vises på norsk eller engelsk med språkvelgeren.
- Språkvalget lagres lokalt i nettleseren, slik at det huskes ved neste besøk.
- Menyknappen åpner en navigasjonsside med lenker til alle hovedsider og statussider.
- Prosjektdagbokens innlegg kan åpnes og lukkes.
- Sidene er laget med semantisk HTML og har støtte for tastaturnavigasjon i menyen.

## Teknologi og struktur

Denne web-appliaksjonen følger mvc arkitektur som brukes for fil-mønster. Nettstedet er laget som en statisk nettside med HTML, CSS og vanlig JavaScript. Det krever ingen byggesteg eller eksterne pakker.

```text
View/
├── *.html             Innholdssidene
├── css/               Felles og side-spesifikk styling
└── js/site.js         Språkvelger, meny og dagbokfunksjonalitet
assets/images/         Logoer, bilder og andre bilderessurser
```

## Kjøre nettstedet lokalt

Åpne [View/index.html](View/index.html) direkte i en nettleser. For best resultat kan prosjektet åpnes i VS Code og kjøres med en lokal utvidelse som **Live Server**.
