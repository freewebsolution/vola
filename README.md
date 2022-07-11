# vola

STEP 1

AUTENTICAZIONE JWT REALIZZATA CON REACTJS 18.2.X E LARAVEL 9.X:  Per implementare la parte front end ho utilizzato la libreria reactjs mentre le rest api le ho realizzate con laravel 9. In React per connettermi alla sorgente esterna utilizzo la libreria axios, per la validazione dei campi la libreria Yurp. Semplicemente in laravel ho scaricato via composer la libreia tymon per la gestione del jwt. Nel frontend ho previsto la possibilità di registrarsi e quindi di loggarsi, una volta loggati viene creato un token e salvato nel session storage dell'utente privato con altre info quali nome ed email. Questo ha una durata di 3600 ms, ossia 1 ora. Ho ,chiaramente, previsto anche la possibiltà di eseguire il logout il quale revoca e cancella il token. Vi è la possibiltà di modificare i dati dell'utente compresa la password. Nel form relativo all'edit si può anche omettere la password la quale rimane invariata, altrimenti si può modificare.

Gestione API OMDB: Per poter effettuare la ricerca di un film bisogna autenticarsi, una volta fatto nella home page visualizzi un campo di ricerca dove inserire il titolo da cercare. Nei risultati relativi vi è un pulsante che consente di visualizzarne i dettagli( CON MODAL DI BOOTSTRAP) come TITOLO,REGISTA, ATTORI,ANNO DI PRODUZIONE, TRAMA...

