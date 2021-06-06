Puns

Dokumentacja projektu zaliczeniowego w ramach przedmiotu Inżynieria oprogramowania

























**Wykonawcy**

Anna Akifjewa, grupa S22-32

Konrad Jezierski, grupa S22-32
# Spis treści
[Charakterystyka oprogramowania](#_Toc69212795)

[Nazwa skrócona](#_Toc69212796)

[Nazwa pełna](#_Toc69212797)

[Krótki opis](#_Toc69212798)

[Specyfikacja wymagań](#_Toc69212799)

[Wymagania funkcjonalne](#_Toc69212800)

[Wymagania niefunkcjonalne](#_Toc69212801)

[Architektura systemu](#_Toc69212802)

[Architektura rozwoju](#_Toc69212803)

[Architektura uruchomieniowa](#_Toc69212804)

[Diagram klas](#diagram_klas)

[Diagram wdrozenia](#diagram_wdrozenia)

[Scenariusze testów](#scenariusze)



#

#
# Charakterystyka oprogramowania

## Nazwa skrócona
Puns
## Nazwa pełna
Puns – kalambury, gra towarzyska
## Krótki opis
Gra towarzyska, w trakcie tury jeden z graczy za pomocą pantomimy stara się odwzorować otrzymane hasło, a reszta graczy stara się je odgadnąć. Po odgadnięciu hasła osoba odwzorowująca wskazuje w aplikacji zwycięzcę tury. Celem gry jest zapewnienie dodatkowej rozrywki podczas spotkań rodzinnych lub ze znajomymi.



# Specyfikacja wymagań

## Wymagania funkcjonalne


|**Identyfikator**|**Nazwa krótka**|**Opis**|**Priorytet**|
| :- | :- | :- | :- |
|P-1|Możliwość zarządzania dostępnymi hasłami|Administrator powinien mieć możliwość zarządzania dostępnymi hasłami przez serwer. Powinna w tym celu istnieć mała witryna internetowa, zabezpieczona hasłem, poprzez którą administrator mógłby dokonywać edycji listy dostępnych haseł|2|
|P-2|Podział haseł na kategorie|Dostępne hasła powinny być podzielone na kategorię np. sport, muzyka, seriale|1|
|P-3|Możliwość utworzenia pokoju|Gracz powinien mieć możliwość utworzenia nowego pokoju gry, a także skonfigurowania go (np. poprzez nadanie klucza dostępu, nadanie maksymalnej liczby graczy, lub wybór konkretnych kategorii z których losowane będą hasła) |1|
|P-4|Ranking uczestników gry|Po każdej turze, a także na koniec gry uczestnikom powinien być prezentowany ranking wyników graczy|1|
|P-5|Komunikacja z serwerem w czasie rzeczywistym|W trakcie rozgrywki, komunikacja z serwerem powinna następować w czasie rzeczywistym|2|
|P-6|Wybór nazwy użytkownika przez gracza|Przed rozpoczęciem rozgrywki, użytkownik powinien mieć możliwość wyboru nazwy jaka będzie go identyfikować w czasie gry. Nazwa powinna być zapisywana w zasobach urządzenia, i proponowana użytkownikowi przed rozpoczęciem następnej rozgrywki|2|
|P-7|Wybór awatara przez gracza|Przed rozpoczęciem rozgrywki, użytkownik powinien mieć możliwość wyboru obrazka, jaki będzie go reprezentował w trakcie rozgrywki|3|
|P-8|Możliwość dodania własnego zdjęcia jako awatar|Użytkownik powinien mieć możliwość użycia zdjęcia z telefonu (pobranego z galerii, lub zrobionego w aplikacji) jako awatara|3|
|P-9|Podkład muzyczny|Rozgrywce powinien towarzyszyć podkład muzyczny|3|
|P-10|Limit czasowy tury|Ilość czasu na odgadnięcie hasła powinna być ograniczona|1|
|P-11|Wybór zwycięzcy tury przez prezentującego|Prezentujący powinien mieć możliwość wskazania jako zwycięzcy tury gracza, który poprawnie odgadł hasło|1|
|P-12|Wyszukiwanie pokojów|Gracz powinien mieć możliwość rozpoczęcia gry w pokoju utworzonym przez innego gracza po podaniu klucza dostępu|1|
|P-13|System punktacji|<p>Podczas rozgrywki powinien obowiązywać następujący system punktacji</p><p>- Dla gracza, który odgadł hasło – **10 punktów pomniejszone o równowartość punktową zużytego czasu**</p><p>- Dla gracza, który prezentował odgadnięte hasło - **10 punktów pomniejszone o równowartość punktową zużytego czasu**</p><p>Zużyty czas powinien pomniejszać wynik punktowy w następujący sposób</p><p>- **>25% dostępnego czasu: -2 punktów**</p><p>- **>50% dostępnego czasu: -4 punkty**</p><p>- **>75% dostępnego czasu: -6 punkty**</p><p>- **>90% dostępnego czasu: -8 punktów**</p>|1|
|P-14|Personalizacja wyglądu aplikacji|Użytkownik powinien mieć możliwość delikatnych zmian wyglądu aplikacji np. poprzez wybór motywu kolorów|3|
|P-15|Personalizacja ścieżki dźwiękowej i dostosowywanie głośności|Użytkownik powinien mieć możliwość edycji ustawień dźwięku np. poprzez zmianę lub wyłączenie ścieżki dźwiękowej, zmianę głośności|3|


## Wymagania niefunkcjonalne


|**Identyfikator**|**Podkategoria**|**Nazwa krótka**|**Opis**|**Priorytet**|
| :- | :- | :- | :- | :- |
|PN-1|2|Zastosowanie SSL|Zastosowanie SSL dla szyfrowanej komunikacji z serwerem|2|
|PN-2|1|Oprogramowanie wolne|Projekt otwartoźródłowy|1|
|PN-3|1|Czystość kodu|Kod realizuje standardy czystego kodu (długość metod, długość kolumn, nazewnictwo itd.)|1|
|PN-4|1|Architektura REST|API do zarządzania hasłami i kategoriami podąża za standardami architektury REST|1|
|PN-5|1|Przysłanie danych w czasie rzeczywistym w za pomocą JSON|Dane przesyłane w czasie rzeczywistym pomiędzy telefonem a serwerem są zbudowane w formacie JSON|2|
|PN-6|3|Czas odpowiedzi|Czas odpowiedzi na zapytanie powinien być jak najkrótszy, najlepiej by w miarę możliwości nie przekraczał 200 milisekund|3|
|PN-7|2|Zabezpieczenie rozgrywki kluczem|Każdy websocket obsługujący rozgrywkę zabezpieczony kluczem przypisanym do niej, w celu zapobiegania dołączeniu do rozgrywki osób niepożądancyh|3|



# Architektura systemu

## Architektura rozwoju


|**Lp.**|**Nazwa produktu**|**Przeznaczenie w projekcie**|**Wersja**|
| :- | :- | :- | :- |
|1|Node.js|Utworzenie aplikacji serwerowej|12|
|2|React.js|Utworzenie aplikacji klienckiej do działań administratorskich|17.0.2|
|3|React Native|Utworzenie wieloplatformowej aplikacji mobilnej|0.64|
|4|Electron|Utworzenie aplikacji klienckiej do działań administratorskich|12.0.2|
|5|MySQL|Baza danych|5.7|
|6|Typescript|Technologia umożliwiająca użycie silne typowanie i podejście obiektowe, podczas tworzenia aplikacji opartej docelowo o javascript|3.3.3|
|7|Socket.io|Biblioteka umożliwiająca komunikację z serwerem w czasie rzeczywistym|4.0|
|8|@types/express|Biblioteka ułatwiająca stworzenie serwisu obsługująca żądania http|4.17.11|
|9|@types/node|Biblioteka umożliwiająca połączenie frameworka Node.js z typescriptem|14.14.37|
|10|class-transformer|Biblioteka umożliwiająca przetwarzanie obiektów utworzonych z klas typescriptowych na proste obiekty JSON-owe oddzielając komunikację z serwerem od wewnętrznych procesów dziejących się w aplikacji serwerowej|0.4.0|
||dotenv|Biblioteka umożliwiająca tworzenie wykorzystywanie zmiennych środowiskowych w aplikacji serwerowej|8.2.0|
||nodemon|Biblioteka ułatwiająca pracę przy rozwoju aplikacji poprzez automatyczne przeładowanie wykonywanego kodu aplikacji, po zmianie pliku. |2.0.7|
||reflect-metadata|Biblioteka umożliwiająca zapisywanie metadanych|0.1.13|
||ts-node|Produkt umożliwiający uruchamianie serwera node js wykonanego przy użyciu typescripta|9.1.1|
||typeorm|Biblioteka ułatwiająca mapowanie danych pobieranych, oraz zapisywanych do bazy|0.2.32|

## Architektura uruchomieniowa


|**Lp.**|**Nazwa produktu**|**Przeznaczenie w projekcie**|**Wersja**|
| :- | :- | :- | :- |
|1|docker|Uruchomienie aplikacji serwerowej na dedykowanym kontenerze, ułatwiając w ten sposób wdrażanie aplikacji w różnych środowiskach i podnosząc bezpieczeństwo|19.03|
|2|docker compose |Połączenie wielu kontenerów dockera pracujących w tym samym czasie|3|

## Scenariusze testów

| **Lp.** | **Identyfikator Wymagania **|**Kroki wykonania**|**Oczekiwany rezultat**|
| :- | :- | :- | :- |
| 1 | P-1 | - Wykonać żadanie do REST API metodami POST i GET na końcówkę /v1/categories i /v1/words- Wysłać żądania do REST API metodami GET, PATCH, DELETE na końcówki /v1/words i /v1/categories podając na końcu ścieżki identifikator | Serwer powinien zwrócić odpowiedzi o kodach z przedziału 200-299, dane kategorii i haseł powinny zmieniać się zgodnie z treścią żądań |
| 2 | P-2 | - Wysłać do REST API żądanie GET na końcówkę /v1/words | Zwrócone hasła powinny mieć różne wartości w polu category\_id |
| 3 | P-3 | - W aplikacji wybierać opcję „Create game&quot; z menu głównego- Wypełnić formularz i kliknać guzik „Create&quot; | Gracz powinien zostać przeniesiony do ekranu oczekiwania na innych graczy, klucz dostępowy powinien wyświetlić się w górnej części ekranu |
| 4 | P-4 | - Rozpocząć grę z wieloma innymi graczami- Wybierać zwycięzców w poszczególnych rundach | Po każdej rundzie (haśle) powinien wyświetlić się ranking graczy, z informacjami o nazwie gracza i liczbie zdobytych dotąd punktów |
| 5 | P-5 | - Rozpocząć nową grę i zagrać parę rund z innymi graczami | Zaraz po akcji jakiegokolwiek gracza inni gracze powinni być powiadomieni o następnych działaniach bez podejmowania dodatkowych akcji. Ekrany z rankingiem i informacją o zwycięscy rundy powinny pokazywać się w tym samym czasie dla wszystkich graczy |
| 6 | P-6 | - Wybrać opcję „Settings&quot; z menu głównego- Wpisać wartość do pola „nickname&quot;- Zapisać przyciskiem „Save&quot;- Rozpocząć nową grę- Zrestartować aplikację- Ponownie rozpocząć nową grę | Zarówno zaraz po wprowadzeniu nowej nazwy jak i po restarcie gry, nazwa gracza widoczna na liście graczy powinna być taka sama jak nazwa podana na ekranie ustawień |
| 7 | P-7 | - Wybrać opcję „Settings&quot; z menu głównego - Wybrać awatar z listy dostępnych- Zapisać przyciskiem „Save&quot;- Rozpocząć nową grę- Zrestartować aplikację- Ponownie rozpocząć nową grę | Zarówno zaraz po wybraniu nowego awatara jak i po restarcie gry, awatar gracza widoczny na liście graczy powinien być taki sam jak awatar wybrany na ekranie ustawień |
| 8 | P-10 | - Rozpocząć nową grę- Nie wybierać zwycięscy przez dłużej niż minutę | Gra powinna wyświetlić czerwony ekran z informacją o braku zwycięscy tury i przejść do następnego hasła |
| 9 | P-11 | - Rozpocząć nową grę- Będąc prezentującym, kliknąć przycisk „Choose winner&quot; przy nazwie któregoś z graczy | Wszystkim graczom powinien wyświetlić się ekran z informacją, że ten gracz jest zwycięzcą tury. Zarówno graczowi wybranemu, jak i prezenterowi powinny zostać przypisane punkty |
| 10 | P-12 | - Wybrać opcję „Join Game&quot; z menu głównego- Wpisać poprawny klucz dostępowy i zatwierdzić | Pokój powinien zostać znaleziony, a gracz powinien zostać przeniesiony do ekranu oczekiwania na innych graczy |
| 11 | P-13 | - Rozpocząć nową grę- Będąc prezentującym, zwlekać z wyborem zwycięscy przez różne odstępy czasowe, mniejsze od minuty | Liczba punktów przydzielona prezentującemu i zwycięscy powinna być taka sama, a ponadto być pomniejszana zgodnie z dokumentacją wymaga |


## Diagram klas 

![alt text](https://github.com/KJ99/io-puns-app/blob/develop/diagram_klas.png)


## Diagram wdrożenia

![alt text](https://github.com/KJ99/io-puns-app/blob/develop/daigram_wdrozenia.png)
