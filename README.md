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
Bereits während der Entwicklung des Systems sollen die fachlichen Funktionalitäten (Datenmodell, Use Cases, Auswertungsfunktionalitäten) anhand von Testfällen geprüft werden. Die Tests erfolgen auf Basis des ursprünglichen Lastenhefts und umfassen auch die im Rahmen der Fortschreibung des Lastenhefts in Form der Jira User Stories mit der IT-Entwicklung vereinbarten Anpassungen. Die Tests der Auswertungsfunktionalitäten sollen alle Auswertungsoberflächen umfassen. 

Im Rahmen der externen QS sollten zudem die im System angelegten Rollen und die Abgrenzung der Zugriffsrechte gemäß der Beschreibung im Lastenheft getestet werden. Dabei sollte auch die Mandantenfähigkeit geprüft werden.

Es sollte sichergestellt werden, dass realistische Szenarien geschaffen werden, wie sie im Produktivbetrieb auftreten. So sollte z.B. die Bearbeitung mit mehreren Nutzern und aufwändigen Auswertungsprozessen geprüft werden. 
2.5	Nicht zu testende Umfänge

3.2	Testvorbereitung und zugehörige Testplanung

Testvorbereitung
Im Rahmen der Testvorbereitung wird für jedes Inkrement (im Zusammenheng mit dem Planning) ein Testkonzept und eine Testplanung erstellt, welche die Themen und Testumfänge zeitlich und aufwandstechnisch einplant. Zu diesem Zeitpunkt ist auch die Bereitstellung der Testdaten zu prüfen, die spätestens zu Beginn der Testdurchführung vorliegen müssen.
Testplanung
Die Testfälle sind so auszuwählen, dass mit einer beschränkten Anzahl an Testfällen eine hohe Anzahl an Fehlerwirkungen aufgedeckt wird.

3.3	Testdurchführung

Tests werden kontinuierlich während der Entwicklungsphase durchgeführt und sind so zu entwerfen, dass sie für Regressionstests fortentwickelt werden können.
Die Tests werden mit den Testergebnissen protokolliert. Zum Abschluss der Tests ist das Testmanagement verantwortlich für die Erstellung eines Testabschlussberichts, der den Nachweis der durchgeführten Softwaretests in der entsprechenden Teststufe darstellt.

3.4	Testabnahmekriterien und Testabschluss

Für den Testabschlussbericht sind konkrete Festlegungen von Kriterien als Basis für die Abnahmeempfehlung erforderlich. Diese sind z.B.
-	Festlegung von Kriterien für die Ermittlung des Schweregrads von Defects
-	Festlegung von Kriterien für die Ermittlung der Priorität von Testfällen
-	Festlegung von Kriterien für die Abnahmeempfehlung der Testobjekte im Testabschlussbericht
-	Festlegung, welcher Schweregrad einer Abweichung in Verbindung mit der Risikoklasse eines Testobjekts die Abnahmeempfehlung für dieses Testobjekt verhindert

3.5	Testabbruchkriterien

In diesem Kapitel sind die Kriterien beschrieben, die eine Unterbrechung aller oder eines Teils der Testaktivitäten bedingen. Typische Abbruchkriterien sind:
-	schwerwiegende Fehler, die den Test behindern
-	zu viele Fehler
-	ungenügende oder fehlende Hardwarekapazität
-	die vorausgesetzte Softwareinstallation funktioniert nicht
-	Frist für den Test ist überschritten
Falls eines oder mehrere dieser Kriterien auftreten, ist der Test zunächst zu unterbrechen. Wieder aufgenommen wird der Test erst, wenn die Probleme behoben sind, oder wenn eine Umgehungsmöglichkeit besteht. Diese Abbruchkriterien können in allen verschiedenen Teststufen angewendet werden. Durch die Unterbrechung der Test ist die Testplanung zu prüfen, ob ursprüngliche Zeitplanung noch gehalten werden kann oder ob eine Umplanung durchzuführen ist.
3.6	Risiko- und Impactanalyse
3.6.1	Risikoanalyse
Zu den Aufgaben eines Testrisikomanagements gehört, auf Risiken frühzeitig hinzuweisen und diese zu reduzieren. Das Risiko kann sich hierbei auf den Fachbereich und auf die Implementierung beziehen. Eine Risikoanalyse erfolgt daher auf 2 Ebenen:
Tabelle  Risikoanalyse
Ebene	Beschreibung
Bewertung aus Sicht des Fachbereichs 	Risiko, welches für den Fachbereich besteht, wenn das Projekt nicht rechtzeitig realisiert wird oder die Software nicht in der gewünschten Qualität fertig gestellt wird.
Bewertung 
der Testobjekte 	Einzelne Testobjekte der Teststufen werden einer Risikobewertung (z.B. gemäß einer ABC Risikoanalyse) unterzogen.

Nachfolgend werden die Risiken beschrieben, bei denen mit möglichen Auswirkungen auf den gesamten Testprozess zu rechnen ist.

