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


Die Regressionstests sind nach Bedarf durch die Qualitätssicherung zu definieren, durchzuführen und zu dokumentieren. Der Umfang der Regressionstests innerhalb einer Iteration ergibt sich aus der bestehenden Funktionalität und den Änderungen die in dieser Iteration getätigt wurden und ist durch die Qualitätssicherung zu definieren. 
Über Tags in den Featurefiles können Tests variabel selektiert werden.

4.5	Automatisierung

Testfälle, die in die Regressionstestsuiten aufgenommen werden und dementsprechend häufig ausgeführt werden sollen, sind unter Berücksichtigung der Wirtschaftlichkeit zu automatisieren.
Da die Vorgehensweise der Entwicklung iterativ ist, sollen die Testfälle im Rahmen einer Continuous Integration durch einen Check-In / nächtlich angetriggert und durchgeführt werden, um so die Konsistenz und Fehlerfreiheit der bisher entwickelten Funktionalität sicherzustellen.
Für die bereits umgesetzte Funktionalität soll die Automatisierung aufgrund der hohen Anzahl der bereits existierenden Testfälle vorerst in Form einer Basis-Testfallabdeckung erfolgen (auch um eine Grundlage an Keyformulierungen für die Generierung von Featurefiles durch die Tester bzw. die Fachseite bereitzustellen). Für neue Funktionalität wird bereits im Rahmen des Tests einer User Story eine hohe Testfallabdeckung angestrebt.
Die Formulierung der Testfälle erfolgt in Gherkin. Diese werden als Featurefile in XRay abgelegt und können über Tags selektiert werden. Die Automation selbst erfolgt technisch durch Cucumber-js / Node.js / Cucumber / Maven. Die Ergebnisse eines Durchlaufs der Automation werden mit … als Report festgehalten.
