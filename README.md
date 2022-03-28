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


4	TESTSTUFENSPEZIFISCHE FESTLEGUNGEN
4.1	Teststufen

4.1.1	Komponenten-, Integrations- und Systemintegrationstest

Diese drei Testarten werden im Laufe einer Iteration abgedeckt. Der Komponententest erfolgt durch die Entwicklung???. Der Test durch die externen entwicklungsnahen Tester soll innerhalb des jeweiligen Sprints erfolgen. Der Test durch die Fachseite ist dem Sprint nachgelagert.
Da zu Testbeginn durch die externen entwicklungsnahen Tester bereits umgesetzte Funktionalität besteht, ist ein umfassender Regressionstest vorgesehen.
Die Erreichung bestimmter zu definierender Meilensteine kann einen gesonderten Systemintegrationstest mit sich bringen.

4.1.2	Abnahmetest

Vor Inbetriebnahme der Software erfolgt der System- und Abnahmetest. Hierbei steht die Sicht des Kunden bzw. Anwenders im Vordergrund. Am Abnahmetest ist die Fachseite direkt beteiligt und mit verantwortlich. Der Abnahmetest wird als separate Teststufe gestaltet. Für den Abnahmetest werden durch die Fachseite Testdaten, Testfälle- und Szenarien mit messbaren Kriterien bereitgestellt.
Das Ziel des Abnahmetests besteht darin, zu validieren, ob und wie gut das fertige System die gestellten Anforderungen (funktional und nicht-funktional) erfüllt.

4.1.3	Akzeptanztest

Zusätzlich zum Annahmetest soll ein Akzeptanztest durch die Stakeholder in den Landesämtern für Statistik durchgeführt werden. Schwerpunkt dieser Tests ist die Bewertung durch die späteren Nutzer in den Landesämtern für Statistik. Im Akzeptanztest soll festgestellt werden, ob das System von den späteren Nutzergruppen akzeptiert werden wird, da es deren Bedürfnisse (Unterstützung der spezifischen Aufgaben) erfüllt.


