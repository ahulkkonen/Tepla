# JSON: JavaScript Object Notation.

JSON on tekstimerkkauskieli tiedon siirtämiseen. JSON on JavaScript'in alijoukko.

JSON'in avulla voi välittää tietojoukon web-palvelimelta web-selaimelle XML'n tapaan formaalisti, mutta kevyemmin.

Esimerkiksi perheen tiedot voisi välittää JSON'illa seuraavasti:

```javascript
{
  "perhe": [
    {
      "etunimi": "Matti",
      "sukunimi": "Meikäläinen",
      "rooli": "isä",
      "biologisetlapset": [
        "Mikko",
        "Miina"
      ],
      "elää": true
    },
    {
      "etunimi": "Maija",
      "sukunimi": "Meikäläinen",
      "rooli": "äiti",
      "biologisetlapset": [
        "Mikko"
      ],
      "elää": false
    }
  ]
}
```

## JSON schema

JSON schema määrittää, kuinka JSON on rakennettava: mitkä tiedot ovat pakollisia ja mitä rajoitteita tiedoilla on.
