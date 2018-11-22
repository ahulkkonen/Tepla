# JSON: JavaScript Object Notation.
JSON on tekstimerkkauskieli tiedon siirt‰miseen. JSON on JavaScript'in alijoukko.

JSON'in avulla voi v‰litt‰‰ tietojoukon web-palvelimelta web-selaimelle XML'n tapaan formaalisti, mutta kevyemmin.

Esimerkiksi perheen tiedot voisi v‰litt‰‰ JSON'illa seuraavasti:
```javascript
{
  "perhe": [
    {
      "etunimi": "Matti",
      "sukunimi": "Meik‰l‰inen",
      "rooli": "is‰",
      "biologisetlapset": [
        "Mikko",
        "Miina"
      ],
      "el‰‰": true
    },
    {
      "etunimi": "Maija",
      "sukunimi": "Meik‰l‰inen",
      "rooli": "‰iti",
      "biologisetlapset": [
        "Mikko"
      ],
      "el‰‰": false
    }
  ]
}
```

## JSON schema
JSON schema m‰‰ritt‰‰, kuinka JSON on rakennettava: mitk‰ tiedot ovat pakollisia ja mit‰ rajoitteita tiedoilla on.