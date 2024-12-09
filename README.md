# Full-Stack Web Aplikacija za Osnovne Škole

Ova aplikacija je dizajnirana za osnovne škole i omogućava učenicima, učiteljima, roditeljima i administratorima da pristupe različitim funkcijama kao što su nastavni materijali, obavestenja, sastanci, AI chat za podršku nastavi, API za analizu slika, sistem za izgubljeno/nadjeno, i još mnogo toga.

## Funkcionalnosti

### Za decu

- **Nastavni materijali**: Pristup različitim materijalima za učenje i zadatke.
- **AI Chat**: Chat sa AI asistentom koji odgovara na pitanja vezana za nastavu (ograničen na obrazovne teme).
- **Interaktivni kviz**: Kviz o bezbednosti na internetu sa pitanjima i odgovorima.

### Za razredne i učitelje

- **Nastavni materijali**: Mogućnost dodavanja novih nastavnih materijala.
- **Obavestenja**: Slanje obavestenja učenicima i roditeljima o važnim događajima.
- **Sastanci**: Organizovanje sastanaka sa učenicima i roditeljima.

### Za roditelje

- **Obavestenja**: Pristup obavestenjima vezanim za decu i školu.
- **Sastanci**: Mogućnost učešća u sastancima sa učiteljima i razrednim.

### Za administratore

- **Upravljanje korisnicima**: Dodavanje novih korisnika (učenici, učitelji, roditelji).

### Dodatne funkcionalnosti

- **AI API za analizu slika**: Pošaljite sliku i dobićete opis onoga što se nalazi na slici (koristi se za edukativne svrhe).
- **Izgubljeno/Nadjeno**: Sistem za prijavu i pregledanje izgubljenih i pronađenih predmeta unutar škole.
- **Uređivanje korisničkog profila**: Korisnici mogu menjati svoje lične podatke i postavke.

## Tehnologije

- **Frontend**: React.js
- **Backend**: Node.js +
  - JWT (JSON Web Token) za autentifikaciju korisnika
- **AI API**: Koristi spoljne API-je za analizu slika i generisanje odgovora u AI chatu

## Pokretanje Aplikacije

1. **Instalacija Frontenda**

   - Preuzmite ili klonirajte repozitorijum:
     ```bash
     git clone https://github.com/DzemilManic/SmartRazred.git
     ```
   - Pređite u direktorijum:
     ```bash
     cd SmartRazred/frontend
     ```
   - Instalirajte zavisnosti:
     ```bash
     npm install
     ```
   - Pokrenite aplikaciju:
     ```bash
     npm run dev
     ```

2. **Instalacija Backenda**
   - Pređite u direktorijum backend-a:
     ```bash
     cd SmartRazred/server
     ```
   - Instalirajte zavisnosti:
     ```bash
     npm install
     ```
   - Pokrenite server:
     ```bash
     npm start
     ```

## Contributing

Ako želite doprineti razvoju ove aplikacije, možete otvoriti pull request ili prijaviti bugove kroz [issues](https://github.com/DzemilManic/SmartRazred/issues).

## Licenca

Ova aplikacija je licencirana pod [MIT licencom](LICENSE).
