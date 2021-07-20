## Projektbeschreibung

### Spielablauf / Spielkern
Rebus ist ein Spiel, in welchem Spieler in mehreren Runden Fragen beantworten. Nachdem der Spieler ein bestimmtes Modul ausgewählt hat, wird diesem pro Runde Fragen (1 Bild, 4 Antwortmöglichkeiten) gestellt. Ein Spiel ist dabei eingeteilt in Runden, welche aus jeweils 10 oder mehr Fragen bestehen. Ist eine Lernrunde beendet, so kann der Spieler ein neues Modul zum Spielen auswählen.

### Login / Registrierung
Spieler müssen sich vor Benutzung der App einen Account erstellen, bzw. sich in einen bestehenden Account einloggen. Dies ermöglicht die Speicherung nutzerbezogener Daten wie
Statistiken, errungene Achievements sowie importierte Module.

### Startseite
Auf der Startseite erhält der Spieler eine Übersicht über die App mit Verlinkungen zur Achievement-, Statistik-, Hilfe und Profilseite sowie
zur Modulliste.

### Nutzerprofil
Neben dem beschriebenen Spielablauf ist es für einen Spieler möglich sein eigenes Profil, welches er durch eine Registrierung erstellt hat, einzusehen. Mit diesem Profil kann er sich später auch auf anderen Geräten einloggen, um mit seinem Account weiterspielen zu können.
Im Profil kann der Nutzer sein Profilbild ändern und sich von seinem Account ausloggen. Zusätzlich gibt es Verlinkungen zur Achievement und Statistikseite.

### Module
Module können von Usern ausgewählt werden zum Spielen. Weitere Module können zusätzlich vom Backend importiert werden. Module setzen sich
dabei aus einer bestimmten Anzahl von Rätseln zusammen. Wird ein Rätsel sechs mal hintereinander richtig beantwortet, erscheint es nicht
mehr in dem bestimmten Modul. Weiterhin haben Module verschiedene Schwierigkeitsgrade, welche durch die Anzahl der Sterne
symbolisiert werden. Fünf Sterne sind hierbei der höchste Schwierigkeitsgrad, ein Stern der niedrigste. Wurden alle Rätsel
eines Moduls sechs mal hintereinander richtig beantwortet, gilt das Modul als abgeschlossen.

### Achievements
Spieler können im Verlaufe der Nutzung der App verschiedene Achievements erhalten. Diese werden auf einer eigenen Seite dargestellt. Weiterhin
ist für den User einsehbar, welche Achievements er noch nicht erhalten hat, sowie die für die Achievements zu erfüllenden Bedingungen.
Hat der Spieler ein Achievement errungen, so erhält er eine Benachrichtigung und er sieht, an welchem Tag er dieses freigeschaltet hat.

### Statistiken
Auf der Statistikseite werden dem Spieler allgemeine Statistiken angezeigt. Dazu gehören:
* Winrate (in %)
* Niederlagenrate (in %)
* Anzahl gespieler Rätsel
* Anzahl abgeschlossener Module
* Anzahl Rätsel, welche sechs mal hintereinander richtig beantwortet wurden

Ebenfalls erhält der Spieler am Ende einer Lernrunde eine spezifische Statistik zu dieser angezeigt.

### Hilfe
Die App enthält eine Hilfeseite, welche für neue Spieler das Spielprinzip genauer erklärt.

### Aktivitätsdiagramm (Fall: User spielt Bilderrätsel)
Veranschaulichung des Hauptanwendungsfalls der App: Von Login bis zum Spielen eines Bilderrätsels.

![](../images/aktivitätsdiagramm.png)
