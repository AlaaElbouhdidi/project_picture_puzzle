# Rebus - Dokumentation

## Grobe Projektbeschreibung

### Spielablauf / Spielkern
Rebus ist ein Spiel, in welchem Spieler in mehreren Runden abwechselnd Fragen beantworten. Nachdem er ein bestimmtes Module ausgewählt hat, wird dabei Spieler pro Runde Fragen gestellt. Ein Spiel ist dabei eingeteilt in Runden, welche aus jeweils 10 oder mehrere Fragen bestehen. Der Spieler, der am Ende die richtigen Fragen beantworten konnte, könnte er zum nächsten Module auswählen.

### Nutzerprofil
Neben dem beschriebenen Spielablauf ist es für einen Spieler möglich sein eigenes Profil, welches er durch eine Registrierung erstellt hat, einzusehen. Mit diesem Profil kann er sich später auch auf anderen Geräten einloggen, um mit seinem Account weiterspielen zu können.
Im Profil werden dem Spieler einige Übersichten angezeigt. So soll er an dieser Stelle einsehen können:
wie viele Spiele er gewonnen oder verloren hat, 
wie viele Module er geschafft hat, 
und welche Errungenschaft (Achievement) freigeschaltet hat.

### Startseite
Hier werden dem Spieler seine aktiven und noch nicht angenommenen Spiele angezeigt. Er erhält hier also eine Übersicht über die Aktivität in Spielen im Generellen. Von der Startseite ist es auch möglich ein neues Spiel zu starten.


## Projektorganisation

### Meetings
In den Meetings teilen wir die Aufgaben für die aktuelle Woche auf und besprechen das weitere Vorgehen. Dabei finden unsere Meetings immer Mittwochs statt.

### GitLab
Auf GitLab verwalten wir unseren Quellcode. Hierfür haben wir bestimmte **Actions** verwendet.

### Trello
Trello ist ein auf Kanban, wo wir unsere Aufgaben verwalten haben.

### Datei Architektur ###
** Achievement**
/Bilderraetsel/src/app/achievement/achievement-page

** Help**
/Bilderraetsel/src/app/help

** Home**
/Bilderraetsel/src/app/home
* Profil
* Module List
* Help
* Achievement
* Statistic

**Module**
/Bilderraetsel/src/app/module/module-list
* Module List
* delete Module
* import new Module

/Bilderraetsel/src/app/module/module-learn
* Get Image von der Datenbank
* Next Puzzle
* Change Language Deutsch/Englich

/Bilderraetsel/src/app/module/module-picker
* Module importieren
* Add Module to user

/Bilderraetsel/src/app/module/module-puzzles
* select Puzzle

** Profil**
/Bilderraetsel/src/app/profil
* Log Out
* Achievement
* Statistic

** Statistic**
/Bilderraetsel/src/app/statistic/statistic-page
* Show statistic

/Bilderraetsel/src/app/statistic/statistic-round
* Next Round

** User**
/Bilderraetsel/src/app/user/user-login

/Bilderraetsel/src/app/user/user-register

### Verwendete Ressourcen ###
* Ionic / Angular
* FireBase 

### Vorgehensmodell ###
    Sprint

Insgesamt wird 60 Stunden benötigt.

