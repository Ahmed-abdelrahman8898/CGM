______________________
Pom Again
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>GOR-TA</groupId>
  <artifactId>GOR-TA.com</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>GOR-TA.com</name>
  <url>http://maven.apache.org</url>

  <properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>3.8.1</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
		</dependency>

		<dependency>
			<groupId>org.testng</groupId>
  			<artifactId>testng</artifactId>
  			<version>6.8</version>
		</dependency>

		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-chrome-driver</artifactId>
			<version>4.0.0-alpha-3</version>
		</dependency>
		<dependency>
    		<groupId>org.seleniumhq.selenium</groupId>
    		<artifactId>selenium-firefox-driver</artifactId>
    		<version>4.0.0-alpha-3</version>
		</dependency>

		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-support</artifactId>
			<version>3.141.59</version>
		</dependency>

		<dependency>
			<groupId>io.cucumber</groupId>
			<artifactId>cucumber-core</artifactId>
			<version>4.3.0</version>
		</dependency>

		<dependency>
			<groupId>io.cucumber</groupId>
			<artifactId>cucumber-java</artifactId>
			<version>4.3.0</version>
		</dependency>

		<dependency>
			<groupId>io.cucumber</groupId>
			<artifactId>cucumber-jvm-deps</artifactId>
			<version>1.0.6</version>
		</dependency>

		<dependency>
			<groupId>io.cucumber</groupId>
			<artifactId>cucumber-junit</artifactId>
			<version>4.3.0</version>
		</dependency>

		<dependency>
			<groupId>io.cucumber</groupId>
			<artifactId>gherkin</artifactId>
			<version>5.1.0</version>
		</dependency>

		<dependency>
			<groupId>net.masterthought</groupId>
			<artifactId>cucumber-reporting</artifactId>
			<version>4.6.0</version>
		</dependency>
		<dependency>
			<groupId>net.masterthought</groupId>
			<artifactId>cucumber-reporting</artifactId>
			<version>5.1.1</version>
		</dependency>

	</dependencies>
	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-surefire-plugin</artifactId>
					<version>2.18.1</version>
				</plugin>
			</plugins>
		</pluginManagement>
	</build>
</project>

______________________
gogogo
package StepDefinitions;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;
import static org.testng.Assert.fail;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import components.Logger;
import components.Spinner;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import pages.homepage.HomePage;
import pages.statistics.StatisticsPage;

public class SucheSteps {

	InitializeWebDriver init = new InitializeWebDriver();
	WebDriver driver = init.getDriver();

	StatisticsPage statsP = new StatisticsPage(driver);
	HomePage home = new HomePage(driver);

	Logger logger = new Logger();


	@When("Klicke in das Suchfeld")
	public void klicke_in_das_Suchfeld() {
		home.searchTxtBox.click();
	}

	@Then("Der Text {string} wird ausgeblendet")
	public void der_Text_wird_ausgeblendet(String string) {
		assertEquals(home.searchTxtBox.getText(), "");
	}

	@Then("Der User kann etwas eintippen.")
	public void der_User_kann_etwas_eintippen() {
		home.searchTxtInput.sendKeys("Test");
	}

	@Given("Schreibe in das Suchfeld {string}")
	public void schreibe_in_das_Suchfeld(String string) {
		home.searchTxtBox.click();
		home.searchTxtInput.sendKeys(string);
	}
	/*--------------------------------------------------------*/

	@When("Klicke auf den ersten Suchvorschlag {string}")
	public void klicke_auf_den_ersten_Suchvorschlag(String string) {
		home.waitForVisibility(home.suggestionContainer);
		for(WebElement elem : home.listOfSuggestedItems) {
			logger.log(elem.getText());
			if (elem.getText().equals(string)) {
				logger.log(elem.getText(), string);
				elem.click();
				return;
			}

		}

	}

	@Then("Nutzer landet auf Such-Ergebnisseite mit Suchergebnissen")
	public void nutzer_landet_auf_Such_Ergebnisseite_mit_Suchergebnissen() {
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		assertTrue(statsP.statisticsPageExists());
	}

	@Then("Nutzer landet auf Such-Ergebnisseite")
	public void nutzer_landet_auf_Such_Ergebnisseite() {
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		assertTrue(statsP.statisticsPageExists());
	}

	@Then("{string} erscheinen als Chip im Suchfeld")
	public void erscheinen_als_Chip_im_Suchfeld(String string) {
		assertEquals(statsP.getChip().getText(), string);
	}

	@Then("Alle Ausprägungen mit {string} haben {string} in der Beschreibung")
	public void alle_Ausprägungen_mit_haben_in_der_Beschreibung(String string, String string2) {
		for(String s : statsP.getStatsAreaListText()) {
			if(!(s.contains(string) || s.contains(string2))) {
				logger.log(s, string2);
				//TBD
				//assertTrue(false);
			}
		}
	}

	@Then("Werte in der Spalte Inhalt sind alphabetisch aufsteigend sortiert \\(A-Z)")
	public void werte_in_der_Spalte_Inhalt_sind_alphabetisch_aufsteigend_sortiert_A_Z() {
		try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		ArrayList<String> obtainedList = new ArrayList<String>();
		obtainedList = statsP.getStatsNameListText();

		ArrayList<String> sortedList = new ArrayList<String>();
		for (String s : obtainedList) {
			sortedList.add(s);
		}



		Collections.sort(sortedList, Collator.getInstance(Locale.GERMAN));

		logger.logSortingA_Z(sortedList, obtainedList);
		//TBD
		//assertTrue(sortedList.equals(obtainedList));
	}

	@Then("Suchfeld ist weiterhin benutzbar")
	public void suchfeld_ist_weiterhin_benutzbar() {
		statsP.clickOnSearchTxtBox();
		statsP.search("Test");
		assertEquals(statsP.getSearchTxt.getAttribute("value"), "Test");
	}

	/*--------------------------------------------------------*/


	@When("Klicke auf die Lupe")
	public void klicke_auf_die_Lupe() {
		home.searchIcon.click();
	}

	@When("Klicke auf den {string}")
	public void klicke_auf_den(String string) {
		for(WebElement elem : home.listOfSuggestedItems)
		if (elem.getText().equals(string))
			elem.click();
	}

	/*--------------------------------------------------------*/

	@Then("Keine Ergebnisse Text:{string}")
	public void keine_Ergebnisse_Text(String string) {
	    assertEquals(statsP.resultnotfound.getText(), string);
	}

	@Then("Begriffsvorschlag Text: {string} {string}")
	public void begriffsvorschlag_Text(String string, String string2) {
	    assertEquals(statsP.suggestionTxt.getText(), string);
	    assertEquals(statsP.suggestionVal.getText(), string2);
	}

	@Then("{string} ist anklickbar für eine neue Suche")
	public void ist_anklickbar_für_eine_neue_Suche(String string) {
	    statsP.suggestionVal.click();
	    try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}


	/*-------------------------------------------------------*/

	@Given("{string}, {string}, {string}erscheinen als Chip im Suchfeld")
	public void erscheinen_als_Chip_im_Suchfeld(String string, String string2, String string3) {
	    statsP.clickOnSearchTxtBox();
	    statsP.search(string);
	    statsP.searchTxtInput.sendKeys(Keys.RETURN);
	    statsP.clickOnSearchTxtBox();
	    statsP.search(string2);
	    statsP.searchTxtInput.sendKeys(Keys.RETURN);
	    statsP.clickOnSearchTxtBox();
	    statsP.search(string3);
	    statsP.searchTxtInput.sendKeys(Keys.RETURN);
	    try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

	@Given("{string}, {string} erscheinen als Chip im Suchfeld")
	public void erscheinen_als_Chip_im_Suchfeld(String string, String string2) {
	    statsP.clickOnSearchTxtBox();
	    statsP.search(string);
	    statsP.searchTxtInput.sendKeys(Keys.RETURN);
	    statsP.clickOnSearchTxtBox();
	    statsP.search(string2);
	    statsP.searchTxtInput.sendKeys(Keys.RETURN);
	    try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}


	@When("Klicke x des chips Suchwort_{int} {string}")
	public void klicke_x_des_chips_Suchwort_(Integer int1, String string) {
	    	statsP.deleteBtnList.get(0).click();
	}

}
___________________________
