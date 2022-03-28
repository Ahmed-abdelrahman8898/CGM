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



Mit dieser Bewertung sind die Testobjekte in verschiedene Klassen und Prioritäten eingeteilt (Hoch, Mittel, Gering) und können nun mit einem risikobasierten Ansatz in den verschiedenen Teststufen getestet werden.

3.6.2	Impactanalyse

Über eine Impactanalyse wird der für das aktuelle Release notwendige Testumfang hergeleitet und der Umfang der Regressionstests festgelegt. Es ist sinnvoll diese Einschätzung im Rahmen des Plannings zu tätigen.
In der Impactanalyse ist zu prüfen, ob das Testobjekt durch die Anforderung geändert wird und ob die Anforderungen zu Seiteneffekten im Testobjekt führen können.
Aus der Risiko- und Impactanalyse ergeben sich die folgenden möglichen Testintensitäten:
-	hoch - Intensive Tests / hohe Abdeckung hinsichtlich der Eigenschaften des Testobjekts
-	mittel - mittel-intensive Tests / mittlere Abdeckung hinsichtlich der Eigenschaften des Testobjekts
-	gering - wenig intensive Tests / geringe Abdeckung bzw. Stichprobenbezogene Abdeckung der Eigenschaften
-	kein Test - es werden keine Tests durchgeführt / etwaige Risiken werden akzeptiert oder anders verringert / kompensiert
Aus der Impactanalyse sind die folgenden Merkmale aufzuführen:
-	Analyseergebnissen hinsichtlich Seiteneffekten sowie
-	Begründung zur Entscheidung hinsichtlich der Testintensität

