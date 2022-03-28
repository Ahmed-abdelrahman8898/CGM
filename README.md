This is the Testcase of login
g
Prerequest : 
this packages need to be downloaded
npm install -g protractor
npm i protractor-html-reporter-2
webdriver-manager update
#now start the server
webdriver-manager start
---------------------------
Only one testcase has been automated and the other will be automated next weekend hopefully 
Some function has been not added on purpose as the killing browser
At the end of the run a report with screenshot incase of any error will be generated 

Tabelle  Übersicht der Risiken
Risiko	Beschreibung
Änderung von Anforderungen 	Sämtliche Änderungen von Anforderungen müssen im laufenden Testbetrieb beachtet werden und können zu einem Mehraufwand im Testbereich führen. Je später die Anforderungsänderungen bekannt werden, desto höher sind der Testaufwand und das Risiko, dass die damit verbundenen Modifikationen an bestimmten Softwarekomponenten nicht hinreichend getestet werden können und in der Produktion empfindliche Störungen des Geschäftsbetriebs auftreten.
Personal	Zur Durchführung der Aufgaben wird projektabhängig ein bestimmtes Kontingent an Fach- und IT-Spezialisten benötigt. Eine Beschränkung der benötigten Ressourcen führt unter Umständen zu Verzögerungen im Test- und Testprozessfortschritt und kann somit Auswirkungen auf den gesamten Zeitplan eines Projekts haben.
Projekt und Produktionsbetrieb	Softwarekomponenten und Prozesse, die aufgrund verspäteter Zulieferung, Zeitmangel oder Ressourcenknappheit nur unzureichend getestet werden können, stellen ein großes Risiko sowohl für den Zeitplan des Projekts, als auch für die Produktionsumgebung dar, da keine ordnungsgemäße Beurteilung über den Qualitätsstand der einzelnen Komponenten getroffen werden kann. Die möglichen Auswirkungen in der Produktion reichen hierbei von einzelnen Verzögerungen im Geschäftsbetrieb bis hin zu einem vollständigen Prozessstillstand.
Testwerkzeuge	Zur Testfallerstellung, Testplanung, Testdokumentation und für das Test Reporting muss ein geeignetes Testtool eingesetzt werden, dessen konkrete Nutzung in ein separates Nutzungskonzept zu dokumentieren ist.

Um Testobjekte einer Risikoanalyse zu unterziehen, müssen sie kategorisiert werden. Eine Kategorisierung kann über die Risikoklasse und die Komplexität erfolgen.
Die Risikoklassen sind durch den Fachbereich zu bestimmen.

Tabelle  Fachliche Risikoklassen
Klasse		Mögliche fachliche Kriterien zur Beurteilung
A	•		•	Ausfall im Anwendungsbetrieb
•	Hohe Auswirkung auf Anwendungsbetrieb
•	Zentrale Funktionalität
B	•		•	Mittlere Auswirkung auf Anwendungsbetrieb
C	•		•	Unwesentliche Auswirkungen auf Anwendungsbetrieb
•	Kein Kunde ist betroffen

Die Komplexitätsklassen sind durch die Entwicklung und das Qualitätsmanagement zu bestimmen.
Tabelle  Technische Risikoklassen
Klasse	Mögliche technische Kriterien zur Beurteilung
1	•	Komplexe Realisierung
•	Viele Beziehungen zu anderen Funktionen
•	Neue Felder oder Funktionen
2	•	Mittlere Komplexität
•	Einige Masken
•	Nur Änderung von Feldern/Funktionen
3	•	Geringe Komplexität

Diese Kategorisierung wird kombiniert zu einer ABC-Risikoanalyse, mit der man anschließend in der Lage ist, jedes Testobjekt anhand ihrer Anforderung seitens des Fachbereichs und ihrer Komplexität seitens der IT zu bewerten.
Einstufung des Risikos und der Komplexität:
Tabelle  Übersicht Bewertung
	Risiko (Qualitätsanforderung seitens des FB)		Komplexität (Aufwand seitens der IT)
A	Hoch	1	Hoch
B	Mittel	2	Mittel
C	Gering	3	Gering
Eine Testobjektkategorie beinhaltet also immer eine Kombination von Qualität und Aufwand (A1 bis C3):


