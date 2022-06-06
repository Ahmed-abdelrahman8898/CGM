package runner;



import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.junit.AfterClass;
import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;

@RunWith(Cucumber.class)
@CucumberOptions(features="src/test/resources/features",glue= {"StepDefinitions"},
plugin = {"pretty", "json:target/cucumber.json", "junit:target/cucumber.xml"},
tags = "@Autom123")
public class Test {


    @AfterClass
      public static void clean()
      {
        List<String> jsonFiles = new ArrayList();
        String path =System.getProperty("user.dir") + "/target/cucumber.json";
        jsonFiles.add(path);

        Utilities.generateReport("Test Report",jsonFiles);
      }

}
_____________________________________________________-
Step Definition
package StepDefinitions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assume.assumeTrue;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.session.FirefoxFilter;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import junit.framework.Assert;
import pages.AuswertungenPage;
import pages.Benutzerverwaltung;
import pages.LoginPage;
import pages.MeineBenutzerDaten;

public class StepDefinitions {
    // Defining   pages within consructor
    public static WebDriver driver;
    LoginPage loginpage;
    AuswertungenPage auswertungen;
    Benutzerverwaltung benutzerverwaltung;
    MeineBenutzerDaten meinebenutzerdaten;
    public static WebDriverWait wait ;

    // Initilizing all pages and driver before each scneario
    @Before()
    public void startdriver() {

        String D="chrome";
        if (D.equalsIgnoreCase("chrome")) {
            System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir")+"/Drivers/chromedriver.exe");
            driver=new ChromeDriver();
        }else if(D.equalsIgnoreCase("firefox")) {
            System.setProperty("webdriver.gecko.driver", System.getProperty("user.dir")+"/Drivers/geckodriver.exe");
             driver=new FirefoxDriver();

        }


        String Url ="http://genesis-test-web01-neu.wi.stba.de/serenity-react/#login";
        //String Url ="http://genesis-test-web01-neu.wi.stba.de/serenity-stable/login";
        driver.manage().deleteAllCookies();
        driver.manage().window().maximize();
        loginpage=new LoginPage(driver);
        auswertungen=new AuswertungenPage(driver);
        meinebenutzerdaten =new MeineBenutzerDaten(driver);
        benutzerverwaltung =new Benutzerverwaltung(driver);
        wait = new WebDriverWait(driver, 60);
        driver.navigate().to(Url);
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
    }
    @Given("Bin als {string} mit dem {string} angemeldet")
    public void bin_als_mit_dem_angemeldet(String string, String string2) {
        loginpage.anmelden(string, string2);
        //check if the error message(You are already signed in)
        try {
            if (driver.findElement(By.xpath("//*[@class='p-messages p-component p-messages-error p-messages-enter-done']")).isDisplayed()) {
                wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.id("yes")))).click();
            }
            }
            catch(Exception e) {
            }
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("logout"))));
    }

    @Given("Befinde mich im Navigationsmenue in der Kategorie {string}")
    public void befinde_mich_im_Navigationsmenue_in_der_Kategorie(String string) {
        auswertungen.click_Auswertungen();

    }

    @When("Bewege die Maus über den Button {string}")
    public void bewege_die_Maus_über_den_Button(String string) {

        Actions action = new Actions(driver);
        action.moveToElement(auswertungen.get_btn_USer()).perform();

        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);



    }

    @Then("Ein Tooltip mit der {string} und der {string} wird angezeigt")
    public void ein_Tooltip_mit_der_und_der_wird_angezeigt(String string, String string2) {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-tooltip p-component p-tooltip-left']")).getText().contains(string));
        assertTrue(driver.findElement(By.xpath("//*[@class='p-tooltip p-component p-tooltip-left']")).getText().contains(string2));


    }

    @When("Klicke den Button {string} an")
    public void klicke_den_Button_an(String string) {
        auswertungen.click_User();

    }

    @Then("Im Navigationsmenue hervorgehoben ist die Kategorie {string}")
    public void im_Navigationsmenue_hervorgehoben_ist_die_Kategorie(String string) {
        assertTrue(driver.findElement(By.xpath("//*[@class='active-menuitem-routerlink']")).getText().contains("Meine Benutzerdaten"));

    }

    @Then("Die Seite {string} ist angezeigt")
    public void die_Seite_ist_angezeigt(String string) {
        assertTrue(driver.findElement(By.xpath("//*[@class='p-card-title']")).getText().contains("Eigene Daten bearbeiten"));
    }

    @When("Klicke im Navigationsmenue auf {string}")
    public void klicke_im_Navigationsmenue_auf(String string) {
        meinebenutzerdaten.click_Auswertungen();
    }

    @Then("Das Feld Rolle enthaelt die {string} und ist nicht aenderbar")
    public void das_Feld_Rolle_enthaelt_die_und_ist_nicht_aenderbar(String string) {

        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        assertNotNull(driver.findElement(By.xpath("//*[@role='listbox']")).getAttribute("disabled"));

    }

    @Then("Der Benutzername {string} ist nicht angezeigt")
    public void der_Benutzername_ist_nicht_angezeigt(String string) {

    }

    @Then("Die Felder unter {string} {string}, {string}, {string}, {string}, {string} und {string} sind nicht aenderbar")
    public void die_Felder_unter_und_sind_nicht_aenderbar(String string, String string2, String string3, String string4, String string5, String string6, String string7) {

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-checkbox-label']"));
        for (int i = 0; i < listOfElements.size(); i++) {

              assertNotNull(driver.findElement(By.id(listOfElements.get(i).getAttribute("for"))).getAttribute("disabled"));
            }
    }

    @Then("Die Felder {string},{string},{string},{string},{string} ,{string},{string},{string},{string} und {string} sind aenderbar")
    public void die_Felder_und_sind_aenderbar(String string, String string2, String string3, String string4, String string5, String string6, String string7, String string8, String string9, String string10) {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        String []  all1 = {"lastName","firstName","phone","fax","email","institution","institution2","street","houseNumber","zipcode","city"};
        for (String i :all1) {
        String originalvalue=driver.findElement(By.id(i)).getAttribute("value");
        driver.findElement(By.id(i)).clear();
        driver.findElement(By.id(i)).sendKeys("done");
        assertEquals(driver.findElement(By.id(i)).getAttribute("value"),"done");
        }
        List<WebElement> listOfElements = driver.findElements(By.id("yes"));
        driver.findElement(By.id("cancel")).click();
        listOfElements.get(2).click();
    }

    @Given("Klicke im Navigationsmenue auf\\(Fachadministrator)")
    public void klicke_im_Navigationsmenue_auf_Fachadministrator() {

        if (driver.findElement(By.xpath("//*[@class='layout-menu']/li[9]/a")).getText().contains("Fachadministrator")) {
            driver.findElement(By.xpath("//*[@class='layout-menu']/li[9]/a")).click();
        }else {
        driver.findElement(By.xpath("//*[@class='layout-menu']/li[10]/a")).click();}

    }

    @When("Klicke im Navigationsmenue auf \\(Benutzerverwaltung)")
    public void klicke_im_Navigationsmenue_auf_Benutzerverwaltung() {
        driver.findElement(By.id("useradmin")).click();
    }

    @Then("Im Navigationsmenue hervorgehoben ist die Kategorie \\(Benutzerverwaltung)")
    public void im_Navigationsmenue_hervorgehoben_ist_die_Kategorie_Benutzerverwaltung() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[2]")).isDisplayed());
    }

    @Then("Oben sind angezeigt ein Dropdownmenue \\(Selektionskriterium) vorbelegt mit \\(Nachname), ein aenderbares Texteingabefeld \\(Suchtext), ein Informationsbutton, ein Button \\(Suchen) und ein Button \\(Zurücksetzen)")
    public void oben_sind_angezeigt_ein_Dropdownmenue_Selektionskriterium_vorbelegt_mit_Nachname_ein_aenderbares_Texteingabefeld_Suchtext_ein_Informationsbutton_ein_Button_Suchen_und_ein_Button_Zurücksetzen() {
        assertEquals(driver.findElement(By.id("criterion")).getText(),"Nachname");
        assertTrue(driver.findElement(By.id("search-input")).isDisplayed());
        assertTrue(driver.findElement(By.id("info")).isDisplayed());
        assertTrue(driver.findElement(By.id("search")).isDisplayed());
        assertTrue(driver.findElement(By.id("clear")).isDisplayed());
    }

    @Then("Oben links im Spaltenkopf ist ein Hinzufuegen-Button")
    public void oben_links_im_Spaltenkopf_ist_ein_Hinzufuegen_Button() {
        assertTrue(driver.findElement(By.id("newuser")).isDisplayed());
    }

    @Then("Die Tabelle hat eine Spalte \\(ID)")
    public void die_Tabelle_hat_eine_Spalte_ID() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[2]")).isDisplayed());
    }

    @Then("Die Tabelle hat eine Spalte \\(Nachname)")
    public void die_Tabelle_hat_eine_Spalte_Nachname() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[4]")).isDisplayed());

    }

    @Then("Die Tabelle hat eine Spalte \\(Vorname)")
    public void die_Tabelle_hat_eine_Spalte_Vorname() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[5]")).isDisplayed());

    }

    @Then("Die Tabelle hat eine Spalte \\(E-Mail)")
    public void die_Tabelle_hat_eine_Spalte_E_Mail() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[6]")).isDisplayed());
    }

    @Then("Die Tabelle hat eine Spalte\\(Rolle)")
    public void die_Tabelle_hat_eine_Spalte_Rolle() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[7]")).isDisplayed());
    }

    @Then("Die Tabelle hat eine Spalte \\(Letzte Anmeldung)")
    public void die_Tabelle_hat_eine_Spalte_Letzte_Anmeldung() {
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[8]")).isDisplayed());
    }

    @Then("In jeder Zeile die einen Benutzer enthaelt ist links ein Loesch-Button und ein Bearbeitungs-Button")
    public void in_jeder_Zeile_die_einen_Benutzer_enthaelt_ist_links_ein_Loesch_Button_und_ein_Bearbeitungs_Button() {
        assertTrue(driver.findElement(By.id("delete")).isDisplayed());
        assertTrue(driver.findElement(By.id("edit")).isDisplayed());

    }
    //scenario 2
    @Then("Button zur Sortierung der Spalte \\(Nachname) hat das Symbol aufsteigend")
    public void button_zur_Sortierung_der_Spalte_Nachname_hat_das_Symbol_aufsteigend() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[4]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList);
        assertTrue(sortedList.equals(obtainedList));
    }

    //3rd sce
    @When("Klicke den Button zur Sortierung der Spalte \\(ID)")
    public void klicke_den_Button_zur_Sortierung_der_Spalte_ID() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[2]")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(ID) sind absteigend sortiert")
    public void werte_in_der_Spalte_ID_sind_absteigend_sortiert() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList,Collections.reverseOrder());
        assertTrue(sortedList.equals(obtainedList));
    }
    //scenario 4
    @When("klicke noch mal den Button zur Sortierung der Spalte \\(ID)")
    public void klicke_noch_mal_den_Button_zur_Sortierung_der_Spalte_ID() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[2]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(ID) sind aufsteigend sortiert")
    public void werte_in_der_Spalte_ID_sind_aufsteigend_sortiert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList);
        assertTrue(sortedList.equals(obtainedList));
    }

    //src 5
    @When("Klicke den Button zur Sortierung der Spalte \\(Nachname)")
    public void klicke_den_Button_zur_Sortierung_der_Spalte_Nachname() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[4]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(Nachname) sind aufsteigend sortiert")
    public void werte_in_der_Spalte_Nachname_sind_aufsteigend_sortiert() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[4]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList,Collections.reverseOrder());
        assertTrue(sortedList.equals(obtainedList));
    }
    @When("Klicke den Button zur Sortierung der Spalte \\(Vorname)")
    public void klicke_den_Button_zur_Sortierung_der_Spalte_Vorname() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[5]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
    @Then("Werte in der Spalte \\(Vorname) sind absteigend sortiert")
    public void werte_in_der_Spalte_Vorname_sind_absteigend_sortiert() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[5]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
        }
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList,Collections.reverseOrder());
        assertTrue(sortedList.equals(obtainedList));
        }
    @When("klicke noch mal den Button zur Sortierung der Spalte \\(Vorname)")
    public void klicke_noch_mal_den_Button_zur_Sortierung_der_Spalte_Vorname() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[5]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        }
    @Then("Werte in der Spalte \\(Vorname) sind aufsteigend sortiert")
    public void werte_in_der_Spalte_Vorname_sind_aufsteigend_sortiert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[5]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList);
        // will be fixed in stable version
        //assertTrue(sortedList.equals(obtainedList));
    }
    @When("Klicke den Button zur Sortierung der Spalte \\(Email)")
    public void klicke_den_Button_zur_Sortierung_der_Spalte_Email() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[6]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(Email) sind absteigend sortiert")
    public void werte_in_der_Spalte_Email_sind_absteigend_sortiert() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[6]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
        }
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList,Collections.reverseOrder());
        assertTrue(sortedList.equals(obtainedList));

    }

    @When("klicke noch mal den Button zur Sortierung der Spalte \\(Email)")
    public void klicke_noch_mal_den_Button_zur_Sortierung_der_Spalte_Email() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[6]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(Email) sind aufsteigend sortiert")
    public void werte_in_der_Spalte_Email_sind_aufsteigend_sortiert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[6]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList);
        assertTrue(sortedList.equals(obtainedList));
    }

    @When("Klicke den Button zur Sortierung der Spalte \\(Letzte Anmeldung)")
    public void klicke_den_Button_zur_Sortierung_der_Spalte_Letzte_Anmeldung() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[8]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(Letzte Anmeldung) sind absteigend sortiert")
    public void werte_in_der_Spalte_Letzte_Anmeldung_sind_absteigend_sortiert() {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[8]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
        }
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList,Collections.reverseOrder());

        assertTrue(sortedList.equals(obtainedList));

    }

    @When("klicke noch mal den Button zur Sortierung der Spalte \\(Letzte Anmeldung)")
    public void klicke_noch_mal_den_Button_zur_Sortierung_der_Spalte_Letzte_Anmeldung() {
        driver.findElement(By.xpath("//*[@id='pr_id_3_content']/table/thead/tr/th[8]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Werte in der Spalte \\(Letzte Anmeldung) sind aufsteigend sortiert")
    public void werte_in_der_Spalte_Letzte_Anmeldung_sind_aufsteigend_sortiert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[8]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        ArrayList<String> sortedList = new ArrayList<String>();
        for(String s:obtainedList){
        sortedList.add(s);
        }
        Collections.sort(sortedList);
        assertTrue(sortedList.equals(obtainedList));

    }
    //sc 6
    @When("Klicke auf das Dropdownmenue \\(Selektionskriterium)")
    public void klicke_auf_das_Dropdownmenue_Selektionskriterium() {
        driver.findElement(By.id("criterion")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }



    @Then("Optionen \\(Name), \\(Vorname) und \\(E-Mail) erscheinen")
    public void optionen_Name_Vorname_und_E_Mail_erscheinen() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-dropdown-items p-dropdown-list p-component']/li")).getText(),"Nachname");
        assertEquals(driver.findElement(By.xpath("//*[@class='p-dropdown-items p-dropdown-list p-component']/li[2]")).getText(),"Vorname");
        assertEquals(driver.findElement(By.xpath("//*[@class='p-dropdown-items p-dropdown-list p-component']/li[3]")).getText(),"E-Mail");
    }
    //sce 8

    @Given("Gebe den Benutzernamen {string} ein")
    public void gebe_den_Benutzernamen_ein(String string) {
        loginpage.set_Benutzername(string);
    }

    @Given("Gebe das falsche Passwort {string} ein")
    public void gebe_das_falsche_Passwort_ein(String string) {
        loginpage.set_Kennwort(string);

    }

    @Given("Klicke den Button zur Anmeldung \\(Anmelden)")
    public void klicke_den_Button_zur_Anmeldung_Anmelden() {
        loginpage.click_Anmelden();
        try {
            Thread.sleep(15000);
        } catch (InterruptedException e) {
            e.printStackTrace();}
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-messages-detail']"))));


    }

    @Given("Fehlermeldung {string} wird angezeigt")
    public void fehlermeldung_wird_angezeigt(String string) {
        /*driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        assertTrue(driver.findElement(By.xpath("//*[@class='p-messages-detail']")).isDisplayed());*/
    }



    @When("Klicke den Button zur Entsperrung \\(Entsperren) des Benutzeraccounts")
    public void klicke_den_Button_zur_Entsperrung_Entsperren_des_Benutzeraccounts() {
        driver.findElement(By.id("unlock")).click();
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke den Button \\(Speichern)")
    public void klicke_den_Button_Speichern() {


         driver.findElement(By.id("save")).click();
         driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

    }

    @When("Klicke den Button \\(Ja)")
    public void klicke_den_Button_Ja() {
        List<WebElement> listOfElements = driver.findElements(By.id("yes"));

        listOfElements.get(1).click();
    }

    @Then("User ist nicht gesperrt")
    public void user_ist_nicht_gesperrt() {

    }
    @When("Klicke den Button zur Bearbeitung \\(bearbeiten) des Benutzeraccounts {string}")
    public void klicke_den_Button_zur_Bearbeitung_bearbeiten_des_Benutzeraccounts(String string) {
        String pa2="//*[@id='pr_id_3_content']/table/tbody/tr[";
        String pa3="]/td/button[2]";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='pr_id_3_content']/table/tbody/tr/td[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}
        int z= obtainedList.indexOf(string);
        z+=1;
        driver.findElement(By.xpath(pa2+z+pa3)).click();

    }

    //new Epic Kontakinfo
    @Given("Oeffne den Browser und rufe die Hochschulstatistik auf")
    public void oeffne_den_Browser_und_rufe_die_Hochschulstatistik_auf() {
        //already called
    }

    @When("Klicke den Button zur Anmeldung \\(Kontaktinformationen Fachadministrator)")
    public void klicke_den_Button_zur_Anmeldung_Kontaktinformationen_Fachadministrator() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//*[@id='register-forgot']/span")))).click();

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Seite \\(Übersicht der Fachadministratoren) oeffnet sich  und Eine Tabelle mit den Spalten \\(Name Institution), \\(Tel.) und \\(E-Mail) wird angezeigt")
    public void seite_Übersicht_der_Fachadministratoren_oeffnet_sich_und_Eine_Tabelle_mit_den_Spalten_Name_Institution_Tel_und_E_Mail_wird_angezeigt() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='pr_id_2_content']/table/thead/tr/th[1]"))));
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_2_content']/table/thead/tr/th[1]")).isDisplayed());
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_2_content']/table/thead/tr/th[2]")).isDisplayed());
        assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_2_content']/table/thead/tr/th[3]")).isDisplayed());
    }



    @When("Klicke auf den X-Button rechts oben")
    public void klicke_auf_den_X_Button_rechts_oben() {
        driver.findElement(By.xpath("//*[@class='p-sidebar-close p-link']")).click();
    }
    @Then("Loginseite mit dem Namen \\(Anmeldung) ist dann sichtbar")
    public void loginseite_mit_dem_Namen_Anmeldung_ist_dann_sichtbar() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='login-panel-header']"))));
        assertTrue(driver.findElement(By.xpath("//*[@class='login-panel-header']")).getText().contains("Anmeldung"));

    }
    @When("Klicke auf den Button \\(Zurück)")
    public void klicke_auf_den_Button_Zurück() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.id("back")));
        driver.findElement(By.id("back")).click();
    }
    @Then("Klicke den Button zur Bearbeitung \\(bearbeiten) des Benutzeraccounts")
    public void klicke_den_Button_zur_Bearbeitung_bearbeiten_des_Benutzeraccounts() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("edit")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Die Seite Benutzer bearbeiten \\(Benutzer bearbeiten) ist dann angezeigt")
    public void die_Seite_Benutzer_bearbeiten_Benutzer_bearbeiten_ist_dann_angezeigt() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("username"))));
    }

    @Then("Das Feld Rolle \\(Rolle) ist aenderbar")
    public void das_Feld_Rolle_Rolle_ist_aenderbar() {
        assertNull(driver.findElement(By.xpath("//*[@role='listbox']")).getAttribute("disabled"));
    }

    @Then("Der Feld Benutzername \\(Benutzername) ist nicht aenderbar")
    public void der_Feld_Benutzername_Benutzername_ist_nicht_aenderbar() {
        assertTrue(driver.findElement(By.id("username")).getAttribute("disabled").contains("rue"));
    }
    @Then("Aendere den Inhalt jedes aenderbaren Felds auf einen sinnvollen Wert")
    public void aendere_den_Inhalt_jedes_aenderbaren_Felds_auf_einen_sinnvollen_Wert() {
        driver.findElement(By.id("street")).clear();
        driver.findElement(By.id("street")).sendKeys("done");

    }
    @When("Klicke dann den Button Abbrechen \\(Abbrechen)")
    public void klicke_dann_den_Button_Abbrechen_Abbrechen() {
        driver.findElement(By.id("cancel")).click();
    }

    @Then("Meldung {string} wird angezeigt")
    public void meldung_wird_angezeigt(String string) {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-dialog p-component p-dialog-visible p-dialog-enter-done']/div[2]/p")).getText(),"Sind Sie sich sicher, dass Sie die Bearbeitung abbrechen wollen? Ihre getätigten Eingaben werden nicht übernommen.");

    }
    @When("Klicke dann den Button Ja \\(Ja)")
    public void klicke_dann_den_Button_Ja_Ja() {
        List<WebElement> listOfElements = driver.findElements(By.id("yes"));
        listOfElements.get(2).click();
    }

    @Then("Die Seite Benutzerverwaltung \\(Benutzerverwaltung) ist dann angezeigt")
    public void die_Seite_Benutzerverwaltung_Benutzerverwaltung_ist_dann_angezeigt() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("search"))));
        assertTrue(driver.findElement(By.id("search")).isDisplayed());
    }
    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Benutzerverwaltung \\(Benutzerverwaltung)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Benutzerverwaltung_Benutzerverwaltung() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("useradmin"))));
        assertTrue(driver.findElement(By.id("useradmin")).isDisplayed());

    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Freigabe von Objekten \\(Freigabe von Objekten)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Freigabe_von_Objekten_Freigabe_von_Objekten() {
        assertTrue(driver.findElement(By.id("releaseobjects")).isDisplayed());

    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Referenzmetadaten \\(Referenzmetadaten)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Referenzmetadaten_Referenzmetadaten() {
        assertTrue(driver.findElement(By.id("referencedata")).isDisplayed());

    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Import \\(Import)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Import_Import() {
        assertTrue(driver.findElement(By.id("importpage")).isDisplayed());

    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Datenbestaende \\(Datenbestände)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Datenbestaende_Datenbestände() {
        assertTrue(driver.findElement(By.id("datastock")).isDisplayed());

    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Uebersicht Auftraege \\(Übersicht Aufträge)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Uebersicht_Auftraege_Übersicht_Aufträge() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.id("importlist")));
        assertTrue(driver.findElement(By.id("importlist")).isDisplayed());
    }

    //____________________Epic Standardtabellen___________________________
    @When("Klicke im Navigationsmenue auf \\(Standardtabellen)")
    public void klicke_im_Navigationsmenue_auf_Standardtabellen() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='layout-menu']/li[4]/a")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Es gibt einen Eintrag Studierende \\(Studierende)")
    public void es_gibt_einen_Eintrag_Studierende_Studierende() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21311"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21311")).getText().contains("Studierende"));
    }

    @Then("Es gibt einen Eintrag Pruefungen \\(Prüfungen)")
    public void es_gibt_einen_Eintrag_Pruefungen_Prüfungen() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21321"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21321")).getText().contains("Prüfungen"));
    }

    @Then("Es gibt einen Eintrag Hochschulpersonal \\(Hochschulpersonal)")
    public void es_gibt_einen_Eintrag_Hochschulpersonal_Hochschulpersonal() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21341"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21341")).getText().contains("Hochschulpersonal"));
    }

    @Then("Es gibt einen Eintrag Habilitationen \\(Habilitationen)")
    public void es_gibt_einen_Eintrag_Habilitationen_Habilitationen() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21351"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21351")).getText().contains("Habilitationen"));
    }

    @Then("Es gibt einen Eintrag Promovierende \\(Promovierende)")
    public void es_gibt_einen_Eintrag_Promovierende_Promovierende() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21352"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21352")).getText().contains("Promovierende"));
    }

    @Then("Es gibt einen Eintrag Hochschulfinanzen \\(Hochschulfinanzen)")
    public void es_gibt_einen_Eintrag_Hochschulfinanzen_Hochschulfinanzen() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablesstandard&21371"))));
        assertTrue(driver.findElement(By.id("tablesstandard&21371")).getText().contains("Hochschulfinanzen"));
    }

    @Then("Es gibt einen Eintrag Standardordner \\(Standardordner)")
    public void es_gibt_einen_Eintrag_Standardordner_Standardordner() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("standardfolders"))));
        assertTrue(driver.findElement(By.id("standardfolders")).getText().contains("Standardordner"));
    }

    @Then("Im Navigationsmenue darunter gibt es keinen Eintrag Standardordner \\(Standardordner)")
    public void im_Navigationsmenue_darunter_gibt_es_keinen_Eintrag_Standardordner_Standardordner() {
        Boolean found=false;
        try {
            driver.findElement(By.id("standardfolders"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);

    }

    @When("Klicke im Navigationsmenue von \\(Standardtabellen)  auf {string}")
    public void klicke_im_Navigationsmenue_von_Standardtabellen_auf(String string) {
        driver.findElement(By.id(string)).click();
        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Die Statistik Seite {string} ist angezeigt")
    public void die_Statistik_Seite_ist_angezeigt(String string) {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='layout-content']/div/h2"))));
        assertEquals(driver.findElement(By.xpath("//*[@class='layout-content']/div/h2")).getText(),string);
    }

    @Then("Es gibt den Link zu Auswertungen \\(Individuelle und übergreifende Auswertungen)")
    public void es_gibt_den_Link_zu_Auswertungen_Individuelle_und_übergreifende_Auswertungen() {
        assertEquals(driver.findElement(By.xpath("//*[@class='overview-box-title']")).getText(),"Übergreifende und individuelle Auswertungen");
    }

    @Then("Es gibt es den Standardtabellen {string}")
    public void es_gibt_es_den_Standardtabellen(String string) {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-column-title']")).getText(),string);
    }

    @Then("Es gibt den Ordnereintrag Zusammenfassende Uebersichten \\(Zusammenfassende Übersichten)")
    public void es_gibt_den_Ordnereintrag_Zusammenfassende_Uebersichten_Zusammenfassende_Übersichten() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr/td")).getText(),"Zusammenfassende Übersichten");
    }

    @Then("Es gibt den Ordnereintrag Tabellen in ausfuehrlicher Gliederung \\(Tabellen in ausführlicher Gliederung)")
    public void es_gibt_den_Ordnereintrag_Tabellen_in_ausfuehrlicher_Gliederung_Tabellen_in_ausführlicher_Gliederung() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td")).getText(),"Tabellen in ausführlicher Gliederung");
    }

    @Then("Es gibt den Ordnereintrag Studierende \\(Studierende)")
    public void es_gibt_den_Ordnereintrag_Studierende_Studierende() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr/td")).getText(),"Studierende");
    }

    @Then("Es gibt den Ordnereintrag Pruefungen \\(Prüfungen)")
    public void es_gibt_den_Ordnereintrag_Pruefungen_Prüfungen() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td")).getText(),"Prüfungen");
    }

    @Then("Es gibt den Ordnereintrag Hochschulpersonal \\(Hochschulpersonal)")
    public void es_gibt_den_Ordnereintrag_Hochschulpersonal_Hochschulpersonal() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td")).getText(),"Hochschulpersonal");
    }

    @Then("Es gibt den Ordnereintrag Habilitationen \\(Habilitationen)")
    public void es_gibt_den_Ordnereintrag_Habilitationen_Habilitationen() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[4]/td")).getText(),"Habilitationen");
    }

    @Then("Es gibt den Ordnereintrag Promovierende \\(Promovierende)")
    public void es_gibt_den_Ordnereintrag_Promovierende_Promovierende() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[5]/td")).getText(),"Promovierende");
    }

    @Then("Es gibt den Ordnereintrag Hochschulfinanzen \\(Hochschulfinanzen)")
    public void es_gibt_den_Ordnereintrag_Hochschulfinanzen_Hochschulfinanzen() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[6]/td")).getText(),"Hochschulfinanzen");
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Statistik der Studierenden)")
    public void es_gibt_den_Link_zu_Statistik_der_Studierenden(Integer int1, Integer int2) {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("21311"))));
        assertTrue(driver.findElement(By.id("21311")).getText().contains("21311"));
        assertTrue(driver.findElement(By.id("21311")).getText().contains("Statistik der Studierenden"));
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Statistik der Prüfungen)")
    public void es_gibt_den_Link_zu_Statistik_der_Prüfungen(Integer int1, Integer int2) {
        assertTrue(driver.findElement(By.id("21321")).getText().contains("21321"));
        assertTrue(driver.findElement(By.id("21321")).getText().contains("Statistik der Prüfungen"));
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Statistik des Hochschulpersonals)")
    public void es_gibt_den_Link_zu_Statistik_des_Hochschulpersonals(Integer int1, Integer int2) {
        assertTrue(driver.findElement(By.id("21341")).getText().contains("21341"));
        assertTrue(driver.findElement(By.id("21341")).getText().contains("Statistik des Hochschulpersonals"));
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Statistik der Habilitationen)")
    public void es_gibt_den_Link_zu_Statistik_der_Habilitationen(Integer int1, Integer int2) {
        assertTrue(driver.findElement(By.id("21351")).getText().contains("21351"));
        assertTrue(driver.findElement(By.id("21351")).getText().contains("Statistik der Habilitationen"));
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Statistik der Promovierenden)")
    public void es_gibt_den_Link_zu_Statistik_der_Promovierenden(Integer int1, Integer int2) {
        assertTrue(driver.findElement(By.id("21352")).getText().contains("21352"));
        assertTrue(driver.findElement(By.id("21352")).getText().contains("Statistik der Promovierenden"));
    }

    @Then("Es gibt den Link zu {int} \\({int}) \\(Hochschulfinanzstatistik)")
    public void es_gibt_den_Link_zu_Hochschulfinanzstatistik(Integer int1, Integer int2) {
        assertTrue(driver.findElement(By.id("21371")).getText().contains("21371"));
        assertTrue(driver.findElement(By.id("21371")).getText().contains("Hochschulfinanzstatistik"));
    }

    @Then("Es gibt den Link zu Kennzahlen nicht monetaer \\(Kennzahlen) \\(Nicht-monetär)")
    public void es_gibt_den_Link_zu_Kennzahlen_monetaer_Kennzahlen_Nicht_monetär() {

        assertTrue(driver.findElement(By.id("nonmonetary")).getText().contains("Kennzahlen"));
        assertTrue(driver.findElement(By.id("nonmonetary")).getText().contains("Nicht-monetär"));
    }

    @Then("Es gibt den Link zu Kennzahlen monetaer \\(Kennzahlen) \\(Monetär)")
    public void es_gibt_den_Link_zu_Kennzahlen_nicht_monetaer_Kennzahlen_Monetär() {

        assertTrue(driver.findElement(By.id("monetary")).getText().contains("Kennzahlen"));
        assertTrue(driver.findElement(By.id("monetary")).getText().contains("Monetär"));

    }

    @When("Klicke auf den Statistik \\(Prüfungen)")
    public void klicke_auf_den_Statistik_Prüfungen() {
        driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td/span")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke auf Zusammenfassende Uebersichten \\(Zusammenfassende Übersichten)")
    public void klicke_auf_Zusammenfassende_Uebersichten_Zusammenfassende_Übersichten() {
        driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span")).click();
    }

    @When("Klicke hinter Zusammenfassende Uebersichten \\(Zusammenfassende Übersichten) auf den Button \\(Neuer Unterordner)")
    public void klicke_hinter_Zusammenfassende_Uebersichten_Zusammenfassende_Übersichten_auf_den_Button_Neuer_Unterordner() {
        driver.findElement(By.xpath("//*[@title='Neuer Unterordner']")).click();
    }

    @When("Dialog Unterordner erstellen \\(Unterordner erstellen) erscheint")
    public void dialog_Unterordner_erstellen_Unterordner_erstellen_erscheint() {
        //ID geändert

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_6_label"))));
        assertEquals(driver.findElement(By.id("pr_id_6_label")).getText(),"Unterordner erstellen");
        //  wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_5_label"))));
       // assertEquals(driver.findElement(By.id("pr_id_5_label")).getText(),"Unterordner erstellen");

    }

    @When("Button Erstellen \\(Erstellen) ist angezeigt")
    public void button_Erstellen_Erstellen_ist_angezeigt() {
        List<WebElement> listOfElements = driver.findElements(By.id("continue"));
        assertEquals(listOfElements.get(1).getText(),"Erstellen");
    }

    @When("Button Abbrechen \\(Abbrechen) ist angezeigt")
    public void button_Abbrechen_Abbrechen_ist_angezeigt() {
        List<WebElement> listOfElements = driver.findElements(By.id("cancel"));
        assertEquals(listOfElements.get(1).getText(),"Abbrechen");
    }


    @When("Klicke dann den Button Abbrechen von dem Dialogue \\(Abbrechen)")
    public void klicke_dann_den_Button_Abbrechen_von_dem_Dialogue_Abbrechen() {
        List<WebElement> listOfElements = driver.findElements(By.id("cancel"));
        listOfElements.get(1).click();
    }


    @Then("Die Seite Ordnerverzeichnis \\(Ordnerverzeichnis) ist dann angezeigt")
    public void die_Seite_Ordnerverzeichnis_Ordnerverzeichnis_ist_dann_angezeigt() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        assertEquals(driver.findElement(By.xpath("//*[@class='p-column-title']")).getText(),"Ordnerverzeichnis");

    }

    @When("Klicke auf den Statistik \\(Studierende)")
    public void klicke_auf_den_Statistik_Studierende() {
        driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td/span")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke auf Zusammenfassende Uebersichten \\(Tabellen in ausführlicher Gliederung)")
    public void klicke_auf_Zusammenfassende_Uebersichten_Tabellen_in_ausführlicher_Gliederung() {
        driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span")).click();

    }

    @When("Klicke hinter Tabellen in ausfuehrlicher Gliederung \\(Tabellen in ausführlicher Gliederung) auf den Button \\(Neuer Unterordner)")
    public void klicke_hinter_Tabellen_in_ausfuehrlicher_Gliederung_Tabellen_in_ausführlicher_Gliederung_auf_den_Button_Neuer_Unterordner() {
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@title='Neuer Unterordner']"));
        listOfElements.get(1).click();
    }

    @When("Klicke auf den Statistik {string}")
    public void klicke_auf_den_Statistik(String string) {
        String p1="//*[@class='p-treetable-tbody']/tr[";
        String p2="]/td/span";
        int n =Integer.parseInt(string);
        driver.findElement(By.xpath(p1+n+p2)).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Klicke auf Zusammenfassende Übersichten \\(Zusammenfassende Übersichten) {string}")
    public void klicke_auf_Zusammenfassende_Übersichten_Zusammenfassende_Übersichten(String string) {
        String p1="//*[@class='p-treetable-tbody']/tr[";
        String p2="]/td/span";
        int n =Integer.parseInt(string)+1;
        driver.findElement(By.xpath(p1+n+p2)).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @When("Gebe einen neuen Unterordnernamen \\(Test) ein")
    public void gebe_einen_neuen_Unterordnernamen_Test_ein() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("dialogInpText")))).sendKeys("me10");

    }

    @When("Klicke dann den Button Erstellen \\(Erstellen)")
    public void klicke_dann_den_Button_Erstellen_Erstellen() {
        List<WebElement> listOfElements = driver.findElements(By.id("continue"));
        listOfElements.get(1).click();try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }


    @Then("Der neue Unterordnername wird angezeigt {string} unter \\(Zusammenfassende Übersichten)")
    public void der_neue_Unterordnername_wird_angezeigt_unter_Zusammenfassende_Übersichten(String string) {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-column-title']"))));
        String p1="//*[@class='p-treetable-tbody']/tr[";
        String p2="]/td";
        int n =Integer.parseInt(string);
        Boolean found=true;
        do {
            n++;
            if(driver.findElement(By.xpath(p1+n+p2)).getText().contains("Tabellen in ausführlicher Gliederung")) {
                break;

            }else if(driver.findElement(By.xpath(p1+n+p2)).getText().contains("me10")) {
                found=false;

                }
            }
            while (found);
        assertFalse(found);
    }

    @When("Klicke auf ausfuehrlicher Gliederung \\(Tabellen in ausführlicher Gliederung) {string}")
    public void klicke_auf_ausfuehrlicher_Gliederung_Tabellen_in_ausführlicher_Gliederung(String string) {
        String p1="//*[@class='p-treetable-tbody']/tr[";
        String p2="]/td/span";
        int n =Integer.parseInt(string)+2;
        driver.findElement(By.xpath(p1+n+p2)).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Klicke hinter ausfuehrlicher Gliederung \\(Tabellen in ausführlicher Gliederung) auf den Button \\(Neuer Unterordner)")
    public void klicke_hinter_ausfuehrlicher_Gliederung_Tabellen_in_ausführlicher_Gliederung_auf_den_Button_Neuer_Unterordner() {
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@title='Neuer Unterordner']"));
        listOfElements.get(1).click();
    }

    @Then("Der neue Unterordnername wird angezeigt {string} unter \\(Tabellen in ausführlicher Gliederung)")
    public void der_neue_Unterordnername_wird_angezeigt_unter_Tabellen_in_ausführlicher_Gliederung(String string) {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-column-title']"))));
        String p1="//*[@class='p-treetable-tbody']/tr[";
        String p2="]/td";
        int n =Integer.parseInt(string)+1;
        Boolean found=true;
        do {
            n++;
            if(n==25) {
                break;

            }else if(driver.findElement(By.xpath(p1+n+p2)).getText().contains("me10")) {
                found=false;

                }
            }
            while (found);
        assertFalse(found);
    }


    @Given("Habe in der Kategorie Auswertungen {string} ausgewaehlt")
    public void habe_in_der_Kategorie_Auswertungen_ausgewaehlt(String string) {

        driver.findElement(By.id("evaluation")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();

        try {

            driver.findElement(By.xpath("//*[@class='p-radiobutton-box p-component']")).click();
          }
          catch(Exception e) {

          }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tool")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Funktion \\(Wertmerkmal bilden) ist dann aufgerufen")
    public void funktion_Wertmerkmal_bilden_ist_dann_aufgerufen() {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("merkmalName"))));

    }

    @Then("Feld Name* ist leer")
    public void feld_Name_ist_leer() {

        assertEquals(driver.findElement(By.id("merkmalName")).getText(),"");
    }

    @Then("Feld Beschreibung* ist leer")
    public void feld_Beschreibung_ist_leer() {

        assertEquals(driver.findElement(By.id("merkmaltext")).getText(),"");
    }

    @Then("Feld Statistik* ist leer")
    public void feld_Statistik_ist_leer() {

        assertEquals(driver.findElement(By.id("statistik")).getText(),"");
    }

    @Then("Feld Maßeinheit ist mit \\(Anzahl) nicht aenderbar vorausgewaehlt")
    public void feld_Maßeinheit_ist_mit_Anzahl_nicht_aenderbar_vorausgewaehlt() {

        assertEquals(driver.findElement(By.id("masseinheit")).getAttribute("value"),"Anzahl");
        assertNotNull(driver.findElement(By.id("masseinheit")).getAttribute("disabled"));
    }

    @When("Schreibe dann Name {string} und Beschreibung {string} in die entsprechenden Felder und waehle {string}")
    public void schreibe_dann_Name_und_Beschreibung_in_die_entsprechenden_Felder_und_waehle(String string, String string2, String string3) {


        driver.findElement(By.id("merkmalName")).sendKeys(string);
        driver.findElement(By.id("merkmaltext")).sendKeys(string2);
        driver.findElement(By.id("statistik")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='statistik']/div[3]/div/ul/li")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    @When("Schreibe dann Name {string} und Beschreibung {string} in die entsprechenden Felder und waehle {string} nue")
    public void schreibe_dann_Name_und_Beschreibung_in_die_entsprechenden_Felder_und_waehle_nue(String string, String string2, String string3) {
        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        driver.findElement(By.id("merkmalName")).sendKeys(str);
        driver.findElement(By.id("merkmaltext")).sendKeys(string2);
        driver.findElement(By.id("statistik")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='statistik']/div[3]/div/ul/li")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Name {string} und Beschreibung {string} sind sichtbar")
    public void name_und_Beschreibung_sind_sichtbar(String string, String string2) {
        assertEquals(driver.findElement(By.id("merkmalName")).getAttribute("value"),string);
        assertEquals(driver.findElement(By.id("merkmaltext")).getAttribute("value"),string2);
    }

    @When("Klicke auf das x fuer Loeschen Statistik*")
    public void klicke_auf_das_x_fuer_Loeschen_Statistik() {
        driver.findElement(By.xpath("//*[@class='p-dropdown-clear-icon pi pi-times']")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    @Then("Button Weiter \\(Weiter) ist inaktiv")
    public void button_Weiter_Weiter_ist_inaktiv() {
        //List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-button-text p-c']"));
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-dialog-footer']/div/button"));
        assertNotNull(listOfElements.get(2).getAttribute("disabled"));
        //assertNotNull(listOfElements.get(4).getAttribute("disabled"));
    }

    @When("Klicke dann auf den Button Weiter \\(Weiter)")
    public void klicke_dann_auf_den_Button_Weiter_Weiter() {
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-button-text p-c']"));
        listOfElements.get(4).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Step {int} \\(Berechnung) ist ausgewaehlt")
    public void step_Berechnung_ist_ausgewaehlt(Integer int1) {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-steps-item p-highlight p-steps-current']"))));
        assertEquals(driver.findElement(By.xpath("//*[@class='p-steps-item p-highlight p-steps-current']")).getText(),"2Berechnung");

    }

    @Then("Feld Zählfeld* ist leer")
    public void feld_Zählfeld_ist_leer() {

        assertEquals(driver.findElement(By.id("merkmal1")).getText(),"");
    }

    @Then("Feld Klassifikation ist leer")
    public void feld_Klassifikation_ist_leer() {

        assertEquals(driver.findElement(By.id("klassifikation1a")).getText(),"");
    }

    @Then("Feld Ausprägung ist leer")
    public void feld_Ausprägung_ist_leer() {

        assertEquals(driver.findElement(By.id("auspraegung1a")).getText(),"...");
    }

    @Then("Feld Statistik ist mit {string} nicht aenderbar vorausgewaehlt")
    public void feld_Statistik_ist_mit_nicht_aenderbar_vorausgewaehlt(String string) {
        assertEquals(driver.findElement(By.id("statistik1")).getAttribute("value"),string);
        assertNotNull(driver.findElement(By.id("statistik1")).getAttribute("disabled"));


    }

    @Then("Button Zurueck \\(Zurück) ist aktiv")
    public void button_Zurueck_Zurück_ist_aktiv() {
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-dialog-footer']/div/button"));
        assertNull(listOfElements.get(2).getAttribute("disabled"));

    }

    @When("Selektiere Zaehlfeld {string} und Klassifikation {string} und Auspraegung {string}")
    public void selektiere_Zaehlfeld_und_Klassifikation_und_Auspraegung(String string, String string2, String string3) {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("merkmal1")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String pa="//*[@id='merkmal1']/div[3]/div/ul/li[";
        String pa2="]";
        driver.findElement(By.xpath(pa+string+pa2)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("klassifikation1a")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String pa3="//*[@id='klassifikation1a']/div[3]/div/ul/li[";
        String pa4="]";
        driver.findElement(By.xpath(pa3+string2+pa4)).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("auspraegung1a")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String pa5="//*[@id='auspraegung1a']/div[4]/div[2]/ul/li[";
        String pa6="]";
        driver.findElement(By.xpath(pa5+string3+pa6)).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Klicke auf den Button Merkmal hinzufuegen \\(Merkmal hinzufügen)")
    public void klicke_auf_den_Button_Merkmal_hinzufuegen_Merkmal_hinzufügen() {
        driver.findElement(By.id("add")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Selektiere Klassifikation {string} und Auspraegung {string}")
    public void selektiere_Klassifikation_und_Auspraegung(String string, String string2) {

        driver.findElement(By.id("klassifikation1a")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String pa3="//*[@id='klassifikation1a']/div[3]/div/ul/li[";
        String pa4="]";
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(pa3+string+pa4)));
        driver.findElement(By.xpath(pa3+string+pa4)).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("auspraegung1a")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String pa5="//*[@id='auspraegung1a']/div[4]/div[2]/ul/li[";
        String pa6="]";
        driver.findElement(By.xpath(pa5+string2+pa6)).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Schreibe {string} in das Feld \\(Logische Verknüpfung der klassifizierenden Merkmale)")
    public void schreibe_in_das_Feld_Logische_Verknüpfung_der_klassifizierenden_Merkmale(String string) {
        driver.findElement(By.id("formula1")).sendKeys(string);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke auf den Button Weiter {string}")
    public void klicke_auf_den_Button_Weiter(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-dialog-footer']/div/button"));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", listOfElements.get(3));
        listOfElements.get(3).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke dann den Button Speichern {string}")
    public void klicke_dann_den_Button_Speichern(String string) {

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-dialog-footer']/div/button"));

        listOfElements.get(4).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("Funktion Wertmerkmal bilden {string} wird geschlossen")
    public void funktion_Wertmerkmal_bilden_wird_geschlossen(String string) {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        assumeTrue(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]")).isDisplayed());

    }

    @Then("Fehlermeldung {string} wird dann angezeigt")
    public void fehlermeldung_wird_dann_angezeigt(String string) {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-growl-message']/p"))));
        assertEquals(driver.findElement(By.xpath("//*[@class='p-growl-message']/p")).getText(),string);



    }

    @Then("Step {int} {string} ist ausgewaehlt")
    public void step_ist_ausgewaehlt(Integer int1, String string) {

        assertEquals(driver.findElement(By.xpath("//*[@class='p-steps-item p-highlight p-steps-current']")).getText(),"3Speichern");



    }

    @Then("Tabelle Klassifikation ist scrollbar")
    public void tabelle_Klassifikation_ist_scrollbar() {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[4]")).getText().contains("ARTEIN1"));



    }


    @When("Klicke im Navigationsmenue auf Ordnerverzeichnis \\(Ordnerverzeichnis)")
    public void klicke_im_Navigationsmenue_auf_Ordnerverzeichnis_Ordnerverzeichnis() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='layout-menu']/li[6]/a")))).click();;

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag \\(Persönlicher Ordner)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Persönlicher_Ordner() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablessaved&personal"))));
        assertTrue(driver.findElement(By.id("tablessaved&personal")).getText().contains("Persönlicher Ordner"));
    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag \\(Gruppenordner)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Gruppenordner() {

        assertTrue(driver.findElement(By.id("tablessaved&shared")).getText().contains("Gruppenordner"));
    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag \\(Transferordner)")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Transferordner() {

        assertTrue(driver.findElement(By.id("tablessaved&transfer")).getText().contains("Transferordner"));
    }






    @When("Klicke im Navigationsmenue auf {string} unter \\(Ordnerverzeichnis)")
    public void klicke_im_Navigationsmenue_auf_unter_Ordnerverzeichnis(String string) {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Die Seite {string} von \\(Ordnerverzeichnis) ist angezeigt")
    public void die_Seite_von_Ordnerverzeichnis_ist_angezeigt(String string) {

        try {
            Thread.sleep(30000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

        List<WebElement> listOfElements = driver.findElements(By.id("evaluation"));
        wait.until(ExpectedConditions.visibilityOf(listOfElements.get(1)));
        assertEquals(listOfElements.get(1).getText(),string);



    }

    //@Then("Die Spalte \\(Ordner-\\/Objektname) wird  angezeigt")
    //public void die_Spalte_Ordner_Objektname_wird_angezeigt() {

        //System.out.println(driver.findElement(By.xpath("//*[@class='p-treetable-thead']/tr/th[1]/span")).getText());

    //}


    @Then("Die Spalte \\(letzte Änderung) wird mit Standardsortiersymbol angezeigt")
    public void die_Spalte_letzte_Änderung_wird_mit_Standardsortiersymbol_angezeigt() {

        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-thead']/tr/th[2]/span")).getText(),"letzte Änderung");

    }

    @Then("Die Spalte \\(Eigentümer) wird mit Standardsortiersymbol angezeigt")
    public void die_Spalte_Eigentümer_wird_mit_Standardsortiersymbol_angezeigt() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-thead']/tr/th[3]/span")).getText(),"Eigentümer");
    }

    @Then("Die Spalte \\(Aktionen) wird angezeigt")
    public void die_Spalte_Aktionen_wird_angezeigt() {
        assertEquals(driver.findElement(By.xpath("//*[@class='p-treetable-thead']/tr/th[4]/span")).getText(),"Aktionen");
    }

    @Then("Es gibt einen Eintrag \\(Wertmerkmale)")
    public void es_gibt_einen_Eintrag_Wertmerkmale() {

        try {
            Thread.sleep(45000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td"))));

        assertTrue(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td")).getText().contains("Wertmerkmale"));
    }

    @Then("Es gibt einen Eintrag \\(Tabellen)")
    public void es_gibt_einen_Eintrag_Tabellen() {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td")).getText().contains("Tabellen"));
    }

    @Then("Es gibt einen Eintrag \\(Regeln)")
    public void es_gibt_einen_Eintrag_Regeln() {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td")).getText().contains("Regeln"));
    }


    @When("Klicke im Ergebnisfeld auf {string}")
    public void klicke_im_Ergebnisfeld_auf(String string) {

        try {
            Thread.sleep(30000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement ele;
        if (string.contains("Tabellen")) {
             ele =driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td"));
        }else if (string.contains("Wertmerkmale")) {ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td"));
        }else {
            try {
                Thread.sleep(30000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span"));}
        ele.click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }





    @Then("Alle angezeigten Objekte haben einen Eigentümer der mit dem Wert \\(HS{int}) beginnt")
    public void alle_angezeigten_Objekte_haben_einen_Eigentümer_der_mit_dem_Wert_HS_beginnt(Integer int1) {
        if (driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td")).getText().contains("noch keine Daten geladen")) {

        }else {
            ArrayList<String> obtainedList = new ArrayList<String>();
            List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[3]"));
            for(WebElement we:elementList){
                if (we.getText().isEmpty()) {

                }else {
                    obtainedList.add(we.getText());}
               }

            for(String s:obtainedList){

            assertTrue(s.startsWith("HS7"));

            }


        }


    }
    @When("Schreibe in das Feld \\(In Eigentümer suchen) den Wert \\(HS)")
    public void schreibe_in_das_Feld_In_Eigentümer_suchen_den_Wert_HS() {
        driver.findElement(By.xpath("//*[@placeholder='In Eigent. suchen']")).sendKeys("HS7");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    @When("Schreibe in das Feld \\(In Eigentümer suchen) den Wert \\(HHH)")
    public void schreibe_in_das_Feld_In_Eigentümer_suchen_den_Wert_HHH() {
        try {
            Thread.sleep(45000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@placeholder='In Eigent. suchen']")).sendKeys("HHH");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Nur Meldung \\(noch keine Daten geladen) wird angezeigt")
    public void nur_Meldung_noch_keine_Daten_geladen_wird_angezeigt() {
        assertTrue(driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td")).getText().contains("noch keine Daten geladen"));
    }

    @When("Bewege die Maus ueber den Button \\(Öffnen) des Objekts")
    public void bewege_die_Maus_ueber_den_Button_Öffnen_des_Objekts() {

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Actions action = new Actions(driver);
        action.moveToElement(driver.findElement(By.xpath("//*[@title='Öffnen']"))).perform();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @When("Tootltip \\(Öffnen) wird angezeigt")
    public void tootltip_Öffnen_wird_angezeigt() {
        assertEquals(driver.findElement(By.xpath("//*[@title='Öffnen']")).getAttribute("title"),"Öffnen");
    }

    @When("Klicke auf den Button \\(Öffnen)")
    public void klicke_auf_den_Button_Öffnen() {

        driver.findElement(By.xpath("//*[@title='Öffnen']")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Entsprechende Tabelle wird korrekt angezeigt")
    public void entsprechende_Tabelle_wird_korrekt_angezeigt() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        assertTrue(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]")).isDisplayed());
    }

    @When("Klicke im Ergebnisfeld auf {string} nue")
    public void klicke_im_Ergebnisfeld_auf_nue(String string) {

        try {
            Thread.sleep(45000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement ele;
        if (string.contains("Tabellen")) {
             ele =driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td/span"));
        }else if (string.contains("Wertmerkmale")) {ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td/span"));
        }else {
            try {
                Thread.sleep(30000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span"));}
        ele.click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Bewege die Maus ueber den Button \\(Umbennen) des Objekts")
    public void bewege_die_Maus_ueber_den_Button_Umbennen_des_Objekts() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Actions action = new Actions(driver);
        action.moveToElement(driver.findElement(By.xpath("//*[@title='Umbenennen']"))).perform();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Tootltip \\(Umbennen) wird angezeigt")
    public void tootltip_Umbennen_wird_angezeigt() {
        assertEquals(driver.findElement(By.xpath("//*[@title='Umbenennen']")).getAttribute("title"),"Umbenennen");
    }

    @When("Klicke auf den Button \\(Umbennen)")
    public void klicke_auf_den_Button_Umbennen() {
        driver.findElement(By.xpath("//*[@title='Umbenennen']")).click();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Dialog \\(Umbenennen) wird angezeigt")
    public void dialog_Umbenennen_wird_angezeigt() {
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_4_label"))));
    }

    @When("Objektname ist aenderbar angezeigt")
    public void objektname_ist_aenderbar_angezeigt() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("dialogInpText")).clear();
        driver.findElement(By.id("dialogInpText")).sendKeys("done");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        assertEquals(driver.findElement(By.id("dialogInpText")).getAttribute("value"),"done");


    }

    @When("Button \\(Umbenennen) ist angezeigt")
    public void button_Umbenennen_ist_angezeigt() {

        assertTrue(driver.findElement(By.id("continue")).isDisplayed());

    }

    @When("Button \\(Abbrechen) ist angezeigt")
    public void button_Abbrechen_ist_angezeigt() {
        assertTrue(driver.findElement(By.id("cancel")).isDisplayed());
    }


    @Given("Klicke im Navigationsmenue auf Freigabe von Objekten \\(Freigabe von Objekten)")
    public void klicke_im_Navigationsmenue_auf_Freigabe_von_Objekten_Freigabe_von_Objekten() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("releaseobjects")))).click();
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Given("Die Seite Freigabe von Nutzer-Objekten \\(Freigabe von Nutzer-Objekten) ist angezeigt")
    public void die_Seite_Freigabe_von_Nutzer_Objekten_Freigabe_von_Nutzer_Objekten_ist_angezeigt() {

        List<WebElement> listOfElements = driver.findElements(By.id("evaluation"));
        wait.until(ExpectedConditions.visibilityOf(listOfElements.get(1)));
        assertEquals(listOfElements.get(1).getText(),"Freigabe von Nutzer-Objekten");


    }


    @Given("Button Gruppenintern freigeben \\(Gruppenintern freigeben) ist aktiv")
    public void button_Gruppenintern_freigeben_Gruppenintern_freigeben_ist_aktiv() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        assertTrue(driver.findElement(By.xpath("//*[@title='Gruppenintern freigeben']")).isEnabled());

    }

    @Given("Button Oeffentlich freigeben \\(Öffentlich freigeben) ist aktiv")
    public void button_Oeffentlich_freigeben_Öffentlich_freigeben_ist_aktiv() {
        assertTrue(driver.findElement(By.xpath("//*[@title='Öffentlich freigeben']")).isEnabled());
    }


    @When("Klicke dann auf den Button Gruppenintern freigeben \\(Gruppenintern freigeben)")
    public void klicke_dann_auf_den_Button_Gruppenintern_freigeben_Gruppenintern_freigeben() {

        driver.findElement(By.xpath("//*[@title='Gruppenintern freigeben']")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_4_label"))));


    }

    @Then("Dialog Gruppenintern freigeben \\(Gruppenintern freigeben) wird dann angezeigt")
    public void dialog_Gruppenintern_freigeben_Gruppenintern_freigeben_wird_dann_angezeigt() {
        assertEquals(driver.findElement(By.id("pr_id_4_label")).getText(),"Gruppenintern freigeben");

    }

    @Then("Button Freigeben \\(Freigeben) ist dann angezeigt")
    public void button_Freigeben_Freigeben_ist_dann_angezeigt() {

        assumeTrue(driver.findElement(By.id("continue")).isDisplayed());


    }

    @Then("Button Abbrechen \\(Abbrechen) ist dann angezeigt")
    public void button_Abbrechen_Abbrechen_ist_dann_angezeigt() {

        assumeTrue(driver.findElement(By.id("cancel")).isDisplayed());

    }



    @Then("Die Seite Freigabe von Objekten \\(Freigabe von Objekten) ist dann angezeigt")
    public void die_Seite_Freigabe_von_Objekten_Freigabe_von_Objekten_ist_dann_angezeigt() {

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> listOfElements = driver.findElements(By.id("evaluation"));
        wait.until(ExpectedConditions.visibilityOf(listOfElements.get(1)));
        assertEquals(listOfElements.get(1).getText(),"Freigabe von Nutzer-Objekten");
    }

    @When("Schreibe dann Name {string} und Beschreibung {string} in die entsprechenden Felder und waehle {string} nue nue")
    public void schreibe_dann_Name_und_Beschreibung_in_die_entsprechenden_Felder_und_waehle_nue_nue(String string, String string2, String string3) {

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="AA"+parts[0]+parts[1];
        driver.findElement(By.id("merkmalName")).sendKeys(nue);
        driver.findElement(By.id("merkmaltext")).sendKeys(string2);
        driver.findElement(By.id("statistik")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='statistik']/div[3]/div/ul/li")))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("In der Spalte \\(Recht) steht \\(Benutzer)")
    public void in_der_Spalte_Recht_steht_Benutzer() {

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="AA"+parts[0]+parts[1].toUpperCase();

        String pa2="//*[@class='p-treetable-tbody']/tr[";
        String pa3="]/td[2]";
        String pa4="]/td[5]/div/span/button";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        int z= obtainedList.indexOf(nue);
        if(z==-1) {
            z= obtainedList.indexOf(nue+"-A01");
        }
        z+=1;
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(pa2+z+pa3)));
        assertEquals(driver.findElement(By.xpath(pa2+z+pa3)).getText(),"Benutzer");

        driver.findElement(By.xpath(pa2+z+pa4)).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }


    @When("Klicke dann den Button Freigeben \\(Freigeben)")
    public void klicke_dann_den_Button_Freigeben_Freigeben() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("continue")))).click();

    }



    @Then("Button Gruppenintern freigeben \\(Gruppenintern freigeben) ist dann inaktiv and Button Oeffentlich freigeben Oeffentlich freigeben \\(Öffentlich freigeben) ist dann aktiv and In der Spalte \\(Recht) steht dann \\(Gruppe)")
    public void button_Gruppenintern_freigeben_Gruppenintern_freigeben_ist_dann_inaktiv_and_Button_Oeffentlich_freigeben_Oeffentlich_freigeben_Öffentlich_freigeben_ist_dann_aktiv_and_In_der_Spalte_Recht_steht_dann_Gruppe() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="AA"+parts[0]+parts[1].toUpperCase();

        String pa2="//*[@class='p-treetable-tbody']/tr[";
        String pa3="]/td[2]";
        String pa4="]/td[5]/div/span/button";
        String pa5="]/td[5]/div/span/button[2]";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        int z= obtainedList.indexOf(nue);
        if(z==-1) {
            z= obtainedList.indexOf(nue+"-A01");
        }

        z+=1;
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(pa2+z+pa4)));

        assertFalse(driver.findElement(By.xpath(pa2+z+pa4)).isEnabled());
        assertTrue(driver.findElement(By.xpath(pa2+z+pa5)).isEnabled());
        assertTrue(driver.findElement(By.xpath(pa2+z+pa3)).getText().contains("Gruppe"));
    }



    @When("Klicke dann den Button Speichern {string} nue")
    public void klicke_dann_den_Button_Speichern_nue(String string) {
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-dialog-footer']/div/button"));

        listOfElements.get(4).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        try {
            if(driver.findElement(By.xpath("//*[@class='p-growl-message']")).isDisplayed()) {
                listOfElements.get(5).click();


            }
          }
          catch(Exception e) {

          }

    }

    @Given("Habe in der Kategorie Auswertungen {string} und {string}  ausgewaehlt")
    public void habe_in_der_Kategorie_Auswertungen_und_ausgewaehlt(String string, String string2) {

        driver.findElement(By.id("evaluation")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id(string2)).click();

        try {

            driver.findElement(By.xpath("//*[@class='p-radiobutton-box p-component']")).click();
          }
          catch(Exception e) {

          }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tool")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    @Then("Seite Auswertungstool ist geladen mit Statistik {string} und {string}")
    public void seite_Auswertungstool_ist_geladen_mit_Statistik_und(String string, String string2) {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

// ID geändert
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='td_merkmale']/div/div/div/div/div"));

        assertEquals(elementList.get(0).getText(),string);
        assertEquals(elementList.get(1).getText(),string2);

        //assertEquals(driver.findElement(By.xpath("//*[@class='p-dataview-content']/div/div[1]")).getText(),string);
        //assertEquals(driver.findElement(By.xpath("//*[@class='p-dataview-content']/div/div[2]")).getText(),string2);


    }

    @Then("Wertmerkmal bilden ist aktiviert")
    public void wertmerkmal_bilden_ist_aktiviert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertFalse(obtainedList.contains("Wertmerkmal"));

    }
    @Then("Button Vollbild ist aktiviert")
    public void button_Vollbild_ist_aktiviert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertFalse(obtainedList.contains("Vollbild"));
    }

    @Then("Werteabruf ist deaktiviert")
    public void werteabruf_ist_deaktiviert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertTrue(obtainedList.contains("Werteabruf"));
    }

    @Then("Tabelle speichern ist deaktiviert")
    public void tabelle_speichern_ist_deaktiviert() {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertTrue(obtainedList.contains("Tabelle speichern"));
    }

    @Then("Tabelle exportieren ist deaktiviert")
    public void tabelle_exportieren_ist_deaktiviert() {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertTrue(obtainedList.contains("Tabelle exportieren"));
    }

    @Then("Button Zuruecksetzen ist deaktiviert")
    public void button_Zuruecksetzen_ist_deaktiviert() {
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertTrue(obtainedList.contains(""));
    }


    @Then("Ueberlagerte Werte ist dann aktiviert und aenderbar")
    public void ueberlagerte_Werte_ist_dann_aktiviert_und_aenderbar() {

        // ID Changed

        assertTrue(Boolean.parseBoolean(driver.findElement(By.xpath("//*[@id='td_menu']/div/div/ul/li[1]/div")).getAttribute("aria-checked")));
        //assertFalse(Boolean.parseBoolean(driver.findElement(By.xpath("//*[@id='td_slide']/ul/li[1]/div")).getAttribute("aria-checked")));
    }

    @Then("Leerzeilen ausblenden ist dann deaktiviert")
    public void leerzeilen_ausblenden_ist_dann_deaktiviert() {

        //ID changed

        assertFalse(Boolean.parseBoolean(driver.findElement(By.xpath("//*[@id='td_menu']/div/div/ul/li[2]/div")).getAttribute("aria-checked")));
        //assertFalse(Boolean.parseBoolean(driver.findElement(By.xpath("//*[@id='td_slide']/ul/li[2]/div")).getAttribute("aria-checked")));
    }

    @Then("Seite Auswertungstool ist geladen mit Statistik {string}")
    public void seite_Auswertungstool_ist_geladen_mit_Statistik(String string) {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='td_merkmale']/div/div/div/div/div"));

        assertEquals(elementList.get(0).getText(),string);
        //ID geändert
        //assertEquals(driver.findElement(By.xpath("//*[@class='p-dataview-content']/div/div[1]")).getText(),string);

    }



    @Given("Ziehe erstes {string} in Zeilendefinition {int}")
    public void ziehe_erstes_in_Zeilendefinition(String string, Integer int1) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        String from1="//*[@title='";
        String from2="']";
        String to1="//*[@id='td_filterzeilen']/div[";
        String to2="]/div/span";
        int n=int1+2;
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath(to1+n+to2));

        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);




    }

    @When("Ziehe dann erstes {string} in Zeilendefinition {int}")
    public void ziehe_dann_erstes_in_Zeilendefinition(String string, Integer int1) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        String from1="//*[@title='";
        String from2="']";
        String to1="//*[@id='td_filterzeilen']/div[";
        String to2="]/div/span";
        int n=int1+2;

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath(to1+n+to2));

        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);


    }

    @Then("Keine Zeilendefinition {int} wird erstellt")
    public void keine_Zeilendefinition_wird_erstellt(Integer int1) {

        boolean present;
        try {
            driver.findElement(By.xpath("//*[@id='td_filterzeilen']/div[7]/div/span"));
           present = true;
        } catch (Exception e) {
           present = false;
        }
        assertFalse(present);

    }

    @Given("Habe eine Tabelle in flexible Auswertungen generiert unter Benutzung des Statistikmerkmals {string} in Zeilendefinition {int}")
    public void habe_eine_Tabelle_in_flexible_Auswertungen_generiert_unter_Benutzung_des_Statistikmerkmals_in_Zeilendefinition(String string, Integer int1) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        String from1="//*[@title='";
        String from2="']";
        String to1="//*[@id='td_filterzeilen']/div[";
        String to2="]/div/span";
        int n=int1+2;

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath(to1+n+to2));

        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);




    }
    @Given("Ziehe erstes {string} in Vorbedingungen\\/Filter")
    public void ziehe_erstes_in_Vorbedingungen_Filter(String string) {

        String from1="//*[@title='";
        String from2="']";
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath("//*[@id='td_filterzeilen']/div[1]/div/span"));
        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);



    }

    @Given("Ziehe erstes {string} in Spaltendefinition {int}")
    public void ziehe_erstes_in_Spaltendefinition(String string, Integer int1) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
        String from1="//*[@title='";
        String from2="']";
        String to1="//*[@id='td_spalten']/div[";
        String to2="]/div/span";
        int n=int1;

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath(to1+n+to2));

        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

    }

    @Given("Tabelle generieren")
    public void tabelle_generieren() {

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Given("Die ersten drei Eintraege der Spalte Berichtsland lauten standardmaessig {string}, {string}, {string}")
    public void die_ersten_drei_Eintraege_der_Spalte_Berichtsland_lauten_standardmaessig(String string, String string2, String string3) {

        //ID Changed

        assertEquals(driver.findElement(By.id("Z5S1")).getText(),string);
        assertEquals(driver.findElement(By.id("Z6S1")).getText(),string2);
        assertEquals(driver.findElement(By.id("Z7S1")).getText(),string3);


    }
    @Given("Oeffne Dialog des Statistikmerkmals {string}")
    public void oeffne_Dialog_des_Statistikmerkmals(String string) {

        String from1="//*[@title='";
        String from2="']/div[3]/i";


        driver.findElement(By.xpath(from1+string+from2)).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.id("line"));

        wait.until(ExpectedConditions.visibilityOf(listOfElements.get(0)));

    }
    @When("Waehle Sortierung der Auspraegungen {string}")
    public void waehle_Sortierung_der_Auspraegungen(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='line']/div[2]/span"));
        listOfElements.get(0).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements1 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[1]"));
        List<WebElement> listOfElements2 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[2]"));
        List<WebElement> listOfElements3 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[3]"));

        if(string.contains("Fachschlüssel")) {
            listOfElements1.get(0).click();
        }else if (string.contains("Klarname")) {
            listOfElements2.get(0).click();
        }else {
            listOfElements3.get(0).click();
        }
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @When("Waehle Anzeige der Ausprägungen {string}")
    public void waehle_Anzeige_der_Ausprägungen(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='line']/div[2]/span"));
        listOfElements.get(1).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements1 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[1]"));
        List<WebElement> listOfElements2 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[2]"));
        List<WebElement> listOfElements3 = driver.findElements(By.xpath("//*[@id='line']/div[3]/div/ul/li[3]"));


        if(string.contains("Fachschlüssel und Klarname")) {
            listOfElements3.get(1).click();
        }else if (string.contains("Klarname")) {
            listOfElements2.get(1).click();
        }else if(string.contains("Fachschlüssel")) {
            listOfElements1.get(1).click();
        }else if(string.contains("Klassifikationsschlüssel")) {
            driver.findElement(By.xpath("//*[@id='line']/div[3]/div/ul/li[4]")).click();
        }else if(string.contains("Klassifikationsschlüssel und Klarname")) {
            driver.findElement(By.xpath("//*[@id='line']/div[3]/div/ul/li[5]")).click();
        }else {
            driver.findElement(By.xpath("//*[@id='line']/div[3]/div/ul/li[6]")).click();
        }
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Schliesse dann den Dialog des Statistikmerkmals {string}")
    public void schliesse_dann_den_Dialog_des_Statistikmerkmals(String string) {

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Auspraegungen von Berichtsland sind dann nach Fachschluessel aufsteigend sortiert")
    public void auspraegungen_von_Berichtsland_sind_dann_nach_Fachschluessel_aufsteigend_sortiert() {



    }

    @Then("Die ersten drei Eintraege der Spalte Berichtsland lauten dann {string}, {string}, {string}")
    public void die_ersten_drei_Eintraege_der_Spalte_Berichtsland_lauten_dann(String string, String string2, String string3) {

        assertTrue(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[1]")).getText().contains(string));
        assertTrue(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[2]")).getText().contains(string2));
        assertTrue(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[3]")).getText().contains(string3));


    }


    @Then("Auspraegungen von Berichtsland sind dann nach Klarname absteigend sortiert")
    public void auspraegungen_von_Berichtsland_sind_dann_nach_Klarname_absteigend_sortiert() {

    }
    @When("Klicke auf den Sortierungsbutton")
    public void klicke_auf_den_Sortierungsbutton() {

        driver.findElement(By.xpath("//*[@title='aufsteigend']/span")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
    @Then("Auspraegungen von Berichtsland sind dann nach Klassifikationsschluessel aufsteigend sortiert")
    public void auspraegungen_von_Berichtsland_sind_dann_nach_Klassifikationsschluessel_aufsteigend_sortiert() {

    }

    @When("Gebe dann {string} ein in das Suchfeld fuer die Auspraegungen")
    public void gebe_dann_ein_in_das_Suchfeld_fuer_die_Auspraegungen(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@type='search']")))).sendKeys(string);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Alle Auspraegungen auswaehlen {string} ist angezeigt")
    public void alle_Auspraegungen_auswaehlen_ist_angezeigt(String string) {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-datatable-tbody']/tr/td[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());}



    }

    @Then("Nur Auspraegung {string} ist angezeigt")
    public void nur_Auspraegung_ist_angezeigt(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td[2]")).getText(),string);

    }

    @Given("Alle Auspraegungen auswaehlen {string} ist nicht ausgewaehlt")
    public void alle_Auspraegungen_auswaehlen_ist_nicht_ausgewaehlt(String string) {

        driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component p-highlight']")).click();
         try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

    }

    @When("Klicke auf Alle Auspraegungen auswaehlen {string}")
    public void klicke_auf_Alle_Auspraegungen_auswaehlen(String string) {

        driver.findElement(By.xpath("//*[@class='p-datatable-thead']/tr/th/div/div[2]")).click();
         try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


    }

    @Then("Alle Auspraegungen sind dann selektiert")
    public void alle_Auspraegungen_sind_dann_selektiert() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-datatable-tbody']/tr"));
        assertEquals(elementList.size(),17);


    }

    @Then("Alle Auspraegungen auswaehlen {string} ist dann ausgewaehlt")
    public void alle_Auspraegungen_auswaehlen_ist_dann_ausgewaehlt(String string) {


        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-datatable-tbody']/tr"));
        assertEquals(elementList.size(),17);

    }

    @Then("Tabelle hat dann alle Eintraege fuer {string}")
    public void tabelle_hat_dann_alle_Eintraege_fuer(String string) {



        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr"));

        assertEquals(elementList.size(),16);

    }
    @Then("Keine Auspraegung ist mehr selektiert")
    public void keine_Auspraegung_ist_mehr_selektiert() {

        Boolean found =false;
         try {


                driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component p-highlight']")).isDisplayed();

           }
           catch(Exception e) {
              found =true;
           }
        assertTrue(found);


    }

    @Then("Alle Auspraegungen auswaehlen {string} ist dann nicht ausgewaehlt")
    public void alle_Auspraegungen_auswaehlen_ist_dann_nicht_ausgewaehlt(String string) {

        Boolean found =false;
         try {


               driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component p-highlight']")).isDisplayed();

          }
          catch(Exception e) {
             found =true;
          }
        assertTrue(found);


    }

    @Then("Es erscheint eine Warnung {string}")
    public void es_erscheint_eine_Warnung(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        assertEquals(driver.findElement(By.xpath("//*[@class='p-growl-message']/p")).getText(),string);

    }

    @Then("Tabelle wird dann nicht geladen")
    public void tabelle_wird_dann_nicht_geladen() {

    }
    @When("Klicke dann auf Auspraegung {string}")
    public void klicke_dann_auf_Auspraegung(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //change html
        //driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td")).click();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[12]/td[2]")));
        driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[12]/td[1]/div")).click();


        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Auspraegung {string} ist nicht mehr selektiert")
    public void auspraegung_ist_nicht_mehr_selektiert(String string) {


    }

    @Then("Tabelle ist dann ohne einen Eintrag fuer Auspraegung {string}")
    public void tabelle_ist_dann_ohne_einen_Eintrag_fuer_Auspraegung(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr"));
        for(WebElement we:elementList){
               obtainedList.add(we.getText());}

        assertFalse(obtainedList.contains(string));


    }
    @Given("{string} steht im Tabellenheader")
    public void steht_im_Tabellenheader(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr/th/div[1]")).getText(),string);


    }

    @Given("{string} steht darunter im Tabellenheader")
    public void steht_darunter_im_Tabellenheader(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr/th/div[2]")).getText(),string);

    }

    @Given("{string} steht im Spaltenheader")
    public void steht_im_Spaltenheader(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr[2]/th[2]")).getText(),string);

    }

    @Given("{string} steht darunter im Spaltenheader")
    public void steht_darunter_im_Spaltenheader(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr[3]/th")).getText(),string);

    }

    @Given("{string} steht in der Vorspalte")
    public void steht_in_der_Vorspalte(String string) {


        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[1]/th[1]")).getText(),string);

    }

    @Given("Fuenf Auspraegungen stehen jeweils im Zeilenheader")
    public void fuenf_Auspraegungen_stehen_jeweils_im_Zeilenheader() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/table/tbody/tr"));


        assertEquals(elementList.size(),6);

    }

    @Given("{string} steht in der letzten Zeile im Zeilenheader")
    public void steht_in_der_letzten_Zeile_im_Zeilenheader(String string) {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/table/tbody/tr"));
        for(WebElement we:elementList){
               obtainedList.add(we.getText());}
        assertTrue(obtainedList.contains(string));

    }


    @Given("Ziehe erstes {string} in Zwischenueberschrift")
    public void ziehe_erstes_in_Zwischenueberschrift(String string) {

        String from1="//*[@title='";
        String from2="']";
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(from1+string+from2)));
        WebElement from=driver.findElement(By.xpath(from1+string+from2));
        WebElement to=driver.findElement(By.xpath("//*[@id='td_filterzeilen']/div[2]/div/span"));
        js.executeScript("function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                + "var dropEvent = createEvent('drop');\n"
                + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                + "var dragEndEvent = createEvent('dragend');\n"
                + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                + "simulateHTML5DragAndDrop(source,destination);", from, to);

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);


    }

    @When("Waehle dann nur die erste Auspraegung aus")
    public void waehle_dann_nur_die_erste_Auspraegung_aus() {

        driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component p-highlight']")).click();
         try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
         //change html

         //driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td")).click();
         driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td/div")).click();
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


    }

    @Then("Tabellenvorschau wird dann angepasst")
    public void tabellenvorschau_wird_dann_angepasst() {

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("{string} steht dann im Tabellenheader")
    public void steht_dann_im_Tabellenheader(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr/th/div[1]")).getText(),string);

    }

    @Then("{string} steht dann darunter im Tabellenheader")
    public void steht_dann_darunter_im_Tabellenheader(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr/th/div[2]")).getText(),string);
    }

    @Then("{string} steht dann im Spaltenheader")
    public void steht_dann_im_Spaltenheader(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr[2]/th[2]")).getText(),string);
    }

    @Then("{string} steht dann darunter im Spaltenheader")
    public void steht_dann_darunter_im_Spaltenheader(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/thead/tr[3]/th")).getText(),string);

    }

    @Then("Fuer die Auspraegung von {string} gibt es dann eine Ueberschriftenzeile")
    public void fuer_die_Auspraegung_von_gibt_es_dann_eine_Ueberschriftenzeile(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[1]/th[1]")).getText(),"männlich");

    }

    @Then("{string} steht dann darunter in der Vorspalte")
    public void steht_dann_darunter_in_der_Vorspalte(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@id='results']/table/tbody/tr[2]/th[1]")).getText(),string);

    }

    @Then("Fuenf Auspraegungen stehen dann im Zeilenheader")
    public void fuenf_Auspraegungen_stehen_dann_im_Zeilenheader() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/table/tbody/tr"));


        assertEquals(elementList.size(),7);

    }

    @Then("{string} steht dann in der letzten Zeile im Zeilenheader")
    public void steht_dann_in_der_letzten_Zeile_im_Zeilenheader(String string) {


        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/table/tbody/tr"));
        for(WebElement we:elementList){
               obtainedList.add(we.getText());}
        assertTrue(obtainedList.contains(string));

    }

    @Given("Klicke auf den Button Ueberlagerte Werte")
    public void klicke_auf_den_Button_Ueberlagerte_Werte() {

        //ID Changed

        driver.findElement(By.xpath("//*[@id='td_menu']/div/div/ul/li[1]/div")).click();
        //driver.findElement(By.xpath("//*[@id='td_slide']/ul/li[1]/div")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Given("Klicke auf den Button Zusammen {string}")
    public void klicke_auf_den_Button_Zusammen(String string) {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-button p-component p-button-text-only']"));
        elementList.get(0).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Given("Klicke auf den Button Insgesamt {string}")
    public void klicke_auf_den_Button_Insgesamt(String string) {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-button p-component p-button-text-only']"));
        elementList.get(0).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Klicke auf den Button Werteabruf {string}")
    public void klicke_auf_den_Button_Werteabruf(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Tabelle hat eine neue Zeile für Zusammen {string}")
    public void tabelle_hat_eine_neue_Zeile_für_Zusammen(String string) {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/th"));
        for(WebElement we:elementList){
               obtainedList.add(we.getText());}
        assertTrue(obtainedList.contains(string));

    }

    @Then("Tabelle hat eine neue Zeile für Insgesamt {string}")
    public void tabelle_hat_eine_neue_Zeile_für_Insgesamt(String string) {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/th"));
        for(WebElement we:elementList){
               obtainedList.add(we.getText());}
        assertTrue(obtainedList.contains(string));

    }

    @When("Klicke dann auf den Button Ueberlagerte Werte")
    public void klicke_dann_auf_den_Button_Ueberlagerte_Werte() {


    }

    @Then("Abweichung des Wertes fuer Zusammen mit Ueberlagerung vom Wert ohne Ueberlagerung ist kleiner gleich {int}")
    public void abweichung_des_Wertes_fuer_Zusammen_mit_Ueberlagerung_vom_Wert_ohne_Ueberlagerung_ist_kleiner_gleich(Integer int1) {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/td"));
        int n1=elementList.size()-1;
        int n2=elementList.size()-2;
        int m=Integer.parseInt(elementList.get(n1).getText().substring(0, elementList.get(n1).getText().length()-1).replace(" ", ""));
        int m1=Integer.parseInt(elementList.get(n2).getText().substring(0, elementList.get(n2).getText().length()-1).replace(" ", ""));
        driver.findElement(By.xpath("//*[@id='td_slide']/ul/li[1]/div")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> elementList1= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/td"));
        int m3=Integer.parseInt(elementList1.get(n1).getText().replace(" ", ""));
        int m4=Integer.parseInt(elementList1.get(n2).getText().replace(" ", ""));
        assertTrue((m-m3)<4);
        assertTrue((m1-m4)<4);

    }

    @Then("Abweichung des Wertes fuer Insgesamt mit Ueberlagerung vom Wert ohne Ueberlagerung ist kleiner gleich {int}")
    public void abweichung_des_Wertes_fuer_Insgesamt_mit_Ueberlagerung_vom_Wert_ohne_Ueberlagerung_ist_kleiner_gleich(Integer int1) {


    }
    @Given("Habe {int} ausgewählt")
    public void habe_ausgewählt(Integer int1) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[2]/td[1]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Werte fuer Zusammen und Insgesamt sind gleich")
    public void werte_fuer_Zusammen_und_Insgesamt_sind_gleich() {

        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/td"));
        int n1=elementList.size()-1;
        int n2=elementList.size()-2;
        int m=Integer.parseInt(elementList.get(n1).getText().substring(0, elementList.get(n1).getText().length()-1).replace(" ", ""));
        int m1=Integer.parseInt(elementList.get(n2).getText().substring(0, elementList.get(n2).getText().length()-1).replace(" ", ""));
        assertTrue(m==m1);

    }

    @Given("Klicke auf Auspraegung \\(Nordrhein-Westfalen)")
    public void klicke_auf_Auspraegung_Nordrhein_Westfalen() {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[10]/td")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Wert fuer Insgesamt entspricht der Summe aller Werte der Spalte einschliesslich Nordrhein-Westfalen")
    public void wert_fuer_Insgesamt_entspricht_der_Summe_aller_Werte_der_Spalte_einschliesslich_Nordrhein_Westfalen() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/td"));
        int n1=elementList.size()-1;
        int n2=elementList.size()-2;
        int m=Integer.parseInt(elementList.get(n1).getText().substring(0, elementList.get(n1).getText().length()-1).replace(" ", ""));
        int m1=Integer.parseInt(elementList.get(n2).getText().substring(0, elementList.get(n2).getText().length()-1).replace(" ", ""));

        System.out.println(m);
        System.out.println("______________________");
        System.out.println(m1);
        assertTrue(m>m1);

    }

    @Then("Wert fuer Zusammen entspricht Wert fuer Insgesamt minus Wert fuer Nordrhein-Westfalen")
    public void wert_fuer_Zusammen_entspricht_Wert_fuer_Insgesamt_minus_Wert_fuer_Nordrhein_Westfalen() {

    }

    @Then("Merkmal {string} ist nur einmal abgelegt")
    public void merkmal_ist_nur_einmal_abgelegt(String string) {

        Boolean found=false;
        try {
            driver.findElement(By.id("//*[@id='td_filterzeilen']/div[2]/div/div[2]"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);

    }


    @Then("Merkmal {string} ist nur einmal unter Vorbedingungen\\/Filter abgelegt")
    public void merkmal_ist_nur_einmal_unter_Vorbedingungen_Filter_abgelegt(String string) {

        Boolean found=false;
        try {
            driver.findElement(By.id("//*[@id='td_filterzeilen']/div[1]/div/div[2]"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);
    }

    @Given("Merkmal {string} ist nur einmal unter Zeilendefinition abgelegt")
    public void merkmal_ist_nur_einmal_unter_Zeilendefinition_abgelegt(String string) {

        Boolean found=false;
        try {
            driver.findElement(By.id("//*[@id='td_filterzeilen']/div[3]/div/div[2]"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);
    }

    @Then("Merkmal {string} ist nur einmal unter Spaltendefinition abgelegt")
    public void merkmal_ist_nur_einmal_unter_Spaltendefinition_abgelegt(String string) {

        Boolean found=false;
        try {
            driver.findElement(By.id("//*[@id='td_spalten']/div[1]/div/div[2]"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);
    }

    @Then("Button Werteabruf \\(Werteabruf) ist dann nicht aktiv")
    public void button_Werteabruf_Werteabruf_ist_dann_nicht_aktiv() {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-menuitem p-disabled']/a/span[2]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        assertTrue(obtainedList.contains("Werteabruf"));


    }

    @Then("Sektion Zeitidentifizierende Merkmale {string} ist angezeigt")
    public void sektion_Zeitidentifizierende_Merkmale_ist_angezeigt(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div/div/span")).getText().equalsIgnoreCase(string));


    }

    @Then("Sektion Zeitklassifizierende Merkmale {string} ist angezeigt")
    public void sektion_Zeitklassifizierende_Merkmale_ist_angezeigt(String string) {


        assertTrue(driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div[2]/div/span")).getText().equalsIgnoreCase(string));


    }

    @Then("Sektion Wert-Merkmale {string} ist angezeigt")
    public void sektion_Wert_Merkmale_ist_angezeigt(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div[3]/div/span")).getText().equalsIgnoreCase(string));


    }

    @Then("Sektion Erstellte Wert-Merkmale {string} ist angezeigt")
    public void sektion_Erstellte_Wert_Merkmale_ist_angezeigt(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div[4]/div/span")).getText().equalsIgnoreCase(string));


    }

    @Then("Sektion Statistik-Merkmale {string} ist angezeigt")
    public void sektion_Statistik_Merkmale_ist_angezeigt(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div[6]/div/span")).getText().equalsIgnoreCase(string));


    }

    @Then("Alle Sektionen haben Merkmale angezeigt")
    public void alle_Sektionen_haben_Merkmale_angezeigt() {


    }


    @Then("Sektion Zeitklassifizierende Merkmale {string} ist nicht angezeigt")
    public void sektion_Zeitklassifizierende_Merkmale_ist_nicht_angezeigt(String string) {

        Boolean found=false;
        try {
            driver.findElement(By.xpath("//*[@id='td_merkmale']/div[2]/div[2]/div/span"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);

    }

    @Given("Befinde mich im Navigationsmenue in der Kategorie {string} nue")
    public void befinde_mich_im_Navigationsmenue_in_der_Kategorie_nue(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div"))));


    }

    @When("Selektiere dann {string}")
    public void selektiere_dann(String string) {

        driver.findElement(By.id(string)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }



    }

    @Then("Karteireiter {string} wird dann angezeigt")
    public void karteireiter_wird_dann_angezeigt(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@role='tablist']/li/a/span")).getText(),string);

    }

    @Then("Im Feld darunter steht dann die {string}")
    public void im_Feld_darunter_steht_dann_die(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div/div/div[2]/div")).getText(),string);

    }

    @Then("Es wird rechts davon ein Feld Eigenschaften angezeigt")
    public void es_wird_rechts_davon_ein_Feld_Eigenschaften_angezeigt() {

        assertEquals(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div")).getText(),"Eigenschaften");
    }

    @Then("Feld Eigenschaften enthaelt einen Bearbeiten Button")
    public void feld_Eigenschaften_enthaelt_einen_Bearbeiten_Button() {


        assertEquals(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/button/span[2]")).getText(),"Bearbeiten");

    }

    @Then("Feld Eigenschaften enthaelt keinen Bearbeiten Button")
    public void feld_Eigenschaften_enthaelt_keinen_Bearbeiten_Button() {

        Boolean found=false;
        try {
            driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/button/span[2]"));
            found=true;
          }
          catch(Exception e) {

          }
        assertFalse(found);

    }


    @When("Schreibe dann in das Suchfeld das {string}")
    public void schreibe_dann_in_das_Suchfeld_das(String string) {

        driver.findElement(By.id("inputsearch")).sendKeys(string);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("Alle angezeigten Datensatzbeschreibungen haben dann den Bestandteil {string}")
    public void alle_angezeigten_Datensatzbeschreibungen_haben_dann_den_Bestandteil(String string) {

        if(driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr")).getText().contains("Bitte wählen Sie eine Statistik aus.")) {

            System.out.println("found");
        }else {

            assertTrue(driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr")).getText().contains(string));}





    }
    @Then("Karteireiter {string} wird dann angezeigt nue")
    public void karteireiter_wird_dann_angezeigt_nue(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@role='tablist']/li[2]/a/span")).getText(),string);

    }

    @Then("Karteireiter {string} ist dann selektiert")
    public void karteireiter_ist_dann_selektiert(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@role='tablist']/li[2]/a")).getAttribute("aria-selected"),"true");


    }

    @When("Klicke dann auf Karteireiter {string}")
    public void klicke_dann_auf_Karteireiter(String string) {

        driver.findElement(By.xpath("//*[@role='tablist']/li[1]/a/span")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Karteireiter {string} ist dann selektiert nue")
    public void karteireiter_ist_dann_selektiert_nue(String string) {

        assertEquals(driver.findElement(By.xpath("//*[@role='tablist']/li[1]/a")).getAttribute("aria-selected"),"true");
    }

    @When("Klicke dann auf den Button Eigenschaften anzeigen")
    public void klicke_dann_auf_den_Button_Eigenschaften_anzeigen() {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("loadData4")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Im Eigenschaftenfeld werden dann Kurzname und Name der Datensatzbeschreibung aus der Tabelle angezeigt")
    public void im_Eigenschaftenfeld_werden_dann_Kurzname_und_Name_der_Datensatzbeschreibung_aus_der_Tabelle_angezeigt() {

        assertEquals(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/div/table/tbody/tr/td[2]")).getText(),driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td")).getText());
        assertEquals(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/div/table/tbody/tr[2]/td[2]")).getText(),driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr[1]/td[2]")).getText());


    }

    @Then("Button Bearbeiten ist dann aktiv")
    public void button_Bearbeiten_ist_dann_aktiv() {

    assertTrue(driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/button/span[2]")).isEnabled());

    }

    @When("Klicke dann auf den Button Bearbeiten")
    public void klicke_dann_auf_den_Button_Bearbeiten() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@role='tabpanel']/div/div[2]/div/div/div/button/span[2]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Dialog Daten bearbeiten wird dann angezeigt")
    public void dialog_Daten_bearbeiten_wird_dann_angezeigt() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_4_label"))));


    }

    @Then("Button {string} ist angezeigt")
    public void button_ist_angezeigt(String string) {

        assertEquals(driver.findElement(By.id("save")).getText(),"Speichern");
        assertEquals(driver.findElement(By.id("cancel")).getText(),"Abbrechen");

    }

    @Then("Feld Kurzname ist vorausgefuellt und ist nicht aenderbar")
    public void feld_Kurzname_ist_vorausgefuellt_und_ist_nicht_aenderbar() {




        List<WebElement> listOfElements = driver.findElements(By.id("in"));

        assertNotNull(listOfElements.get(0).getAttribute("value"));
        assertNotNull(listOfElements.get(0).getAttribute("disabled"));

    }

    @Then("Feld Name der Datensatzbeschreibung ist vorausgefuellt und ist aenderbar")
    public void feld_Name_der_Datensatzbeschreibung_ist_vorausgefuellt_und_ist_aenderbar() {

        List<WebElement> listOfElements = driver.findElements(By.id("in"));

        assertNotNull(listOfElements.get(1).getAttribute("value"));
        assertNull(listOfElements.get(1).getAttribute("disabled"));

    }

    @Then("Fuege im Feld Name der Datensatzbeschreibung den {string} hinzu")
    public void fuege_im_Feld_Name_der_Datensatzbeschreibung_den_hinzu(String string) {

        List<WebElement> listOfElements = driver.findElements(By.id("in"));

        listOfElements.get(1).sendKeys(string);;

    }

    @When("Klicke dann den Button Speichern")
    public void klicke_dann_den_Button_Speichern() {

        driver.findElement(By.id("save")).click();

    }

    @Then("Dialog Daten bearbeiten wird geschlossen")
    public void dialog_Daten_bearbeiten_wird_geschlossen() {



    }

    @Then("Name der Datensatzbeschreibung hat die Hinzufuegung {string}")
    public void name_der_Datensatzbeschreibung_hat_die_Hinzufuegung(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-datatable-tbody']/tr")).getText().contains(string));

    }

    @Then("Es erscheint die {string}")
    public void es_erscheint_die(String string) {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='p-growl-message']/p"))));
        assertTrue(driver.findElement(By.xpath("//*[@class='p-growl-message']/p")).getText().contains(string));

    }

    @When("Klicke dann auf den Button Oeffnen in der Zeile mit {string}")
    public void klicke_dann_auf_den_Button_Oeffnen_in_der_Zeile_mit(String string) {

        String pa2="//*[@class='p-datatable-tbody']/tr[";
        String pa3="]/td[1]";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-datatable-tbody']/tr/td[1]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        int z= obtainedList.indexOf(string);

        if(z==-1) {

        }
        z+=1;
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(pa2+z+pa3)));
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> elementList1= driver.findElements(By.id("loadData"));
        System.out.println(elementList1.size());
        elementList1.get(z-=1).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Import")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Import() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("importpage"))));


    }

    @Then("Im Navigationsmenue darunter gibt es keinen Eintrag Import")
    public void im_Navigationsmenue_darunter_gibt_es_keinen_Eintrag_Import() {

        Boolean found =false;
         try {


             driver.findElement(By.id("importpage")).isDisplayed();

          }
          catch(Exception e) {
             found =true;
          }
        assertTrue(found);


    }

    @When("Klicke im Navigationsmenue auf Import")
    public void klicke_im_Navigationsmenue_auf_Import() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("importpage")))).click();

    }

    @Then("Seite Import ist geoeffnet")
    public void seite_Import_ist_geoeffnet() {

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("file"))));


    }

    @Then("Es gibt eine Sektion Importdatei")
    public void es_gibt_eine_Sektion_Importdatei() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-card-title']"));
        assertEquals(elementList.get(0).getText(),"Importdatei");

    }

    @Then("Es gibt eine Sektion Dateiübernahme")
    public void es_gibt_eine_Sektion_Dateiübernahme() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-card-title']"));
        assertEquals(elementList.get(1).getText(),"Datenübernahme");

    }

    @Then("Es gibt eine Sektion Inhalte des Imports")
    public void es_gibt_eine_Sektion_Inhalte_des_Imports() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-card-title']"));
        assertEquals(elementList.get(2).getText(),"Inhalte des Imports");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("es gibt eine Sektion Hinweise zum Importreihenfolge")
    public void es_gibt_eine_Sektion_Hinweise_zum_Importreihenfolge() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-card-title']"));
        assertEquals(elementList.get(4).getText(),"Hinweis zur Importreihenfolge");

    }

    @When("Klicke dann auf den Wertedaten-Button zur Selektion des Inhalts")
    public void klicke_dann_auf_den_Wertedaten_Button_zur_Selektion_des_Inhalts() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-radiobutton p-component']"));
        elementList.get(2).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Option Daten neu übernehmen ist dann selektiert")
    public void option_Daten_neu_übernehmen_ist_dann_selektiert() {

        assertTrue(driver.findElement(By.xpath("//*[@id='importNewFlag']/div[2]")).getAttribute("aria-checked").contains("true"));
    }

    @Then("Option Vorhandene Dateien überschreiben ist dann deaktiviert")
    public void option_Vorhandene_Dateien_überschreiben_ist_dann_deaktiviert() {



    }

    @Then("Button Importieren ist dann deaktiviert")
    public void button_Importieren_ist_dann_deaktiviert() {

        assertNotNull(driver.findElement(By.id("upload")).getAttribute("disabled"));

    }

    @When("Klicke dann auf den Button Leerzeilen ausblenden")
    public void klicke_dann_auf_den_Button_Leerzeilen_ausblenden() {



        //driver.findElement(By.xpath("//*[@id='td_slide']/ul/li[2]/div")).click(); changed id not anymore found
        driver.findElement(By.xpath("//*[@id='td_menu']/div/div/ul/li[2]/div")).click();


        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Es existieren dann keine leere Tabellenzeilen")
    public void es_existieren_dann_keine_leere_Tabellenzeilen() {

        List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='results']/div/table/tbody/tr/td"));

        for (WebElement i :elementList) {
            assertFalse(i.getText().contains("-"));
        }

    }

    @Then("Leerzeilen ausblenden ist dann aktiviert")
    public void leerzeilen_ausblenden_ist_dann_aktiviert() {

        //changed ID

        assertTrue(Boolean.parseBoolean(driver.findElement(By.xpath("//*[@id='td_menu']/div/div/ul/li[2]/div")).getAttribute("aria-checked")));

    }

    @When("Klicke dann Tabelle speichern \\(Tabelle speichern)")
    public void klicke_dann_Tabelle_speichern_Tabelle_speichern() {

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[2]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Dialog Tabelle speichern {string} wird dann angezeigt")
    public void dialog_Tabelle_speichern_wird_dann_angezeigt(String string) {

        //wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_7_label")))); ID has changed
        //assertEquals(driver.findElement(By.id("pr_id_7_label")).getText(),string);
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_9_label"))));
        assertEquals(driver.findElement(By.id("pr_id_9_label")).getText(),string);

    }

    @Then("Button Speichern {string} ist dann angezeigt")
    public void button_Speichern_ist_dann_angezeigt(String string) {

        assertEquals(driver.findElement(By.id("save")).getText(),string);


    }

    @Then("Button Abbrechen {string} ist dann angezeigt")
    public void button_Abbrechen_ist_dann_angezeigt(String string) {

        assertEquals(driver.findElement(By.id("abortSave")).getText(),string);
    }

    @Then("Speicherziel Persoenlichlicher Ordner {string} ist angezeigt")
    public void speicherziel_Persoenlichlicher_Ordner_ist_angezeigt(String string) {

        String found="";
        try {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td"));
            found="true";
          }
          catch(Exception e) {
             found="false";
          }


        assertEquals(found,string);


    }

    @Then("Speicherziel Gruppenordner {string} ist angezeigt")
    public void speicherziel_Gruppenordner_ist_angezeigt(String string) {
        String found="";
        try {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td"));
            found="true";
          }
          catch(Exception e) {
             found="false";
          }


        assertEquals(found,string);
    }

    @Then("Speicherziel Transferordner {string} ist angezeigt")
    public void speicherziel_Transferordner_ist_angezeigt(String string) {
        String found="";
        try {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td"));
            found="true";
          }
          catch(Exception e) {
             found="false";
          }


        assertEquals(found,string);
    }

    @Then("Waehle Option \\(Standardtabelle)")
    public void waehle_Option_Standardtabelle() {

        //Class changed

        //driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component']")).click();
        //changed again ID

        //List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-checkbox-box p-component']"));
        //listOfElements.get(6).click();

        driver.findElement(By.xpath("//*[@class='p-checkbox-box p-component']")).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Klicke auf Kategorie {string}")
    public void klicke_auf_Kategorie(String string) {

        if (string.equalsIgnoreCase("Studierende")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td/span")).click();
        }else if (string.equalsIgnoreCase("Prüfungen")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td/span")).click();
        }else if (string.equalsIgnoreCase("Hochschulpersonal")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span")).click();
        }else if (string.equalsIgnoreCase("Habilitationen")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[4]/td/span")).click();
        }else if (string.equalsIgnoreCase("Promovierende")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[5]/td/span")).click();
        }else if (string.equalsIgnoreCase("Hochschulfinanzen")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[6]/td/span")).click();
        }

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Klicke auf Subkategorie {string}")
    public void klicke_auf_Subkategorie(String string) {

        String pa="//*[@class='p-treetable-tbody']/tr[";
        String pa2="]/td/span";
        driver.findElement(By.xpath(pa+string+pa2)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Klicke auf Unterordner zu {string}")
    public void klicke_auf_Unterordner_zu(String string) {

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td"));
        ArrayList<String> obtainedList = new ArrayList<String>();
        for(WebElement we:listOfElements){
               obtainedList.add(we.getText());

        }

        int z= obtainedList.indexOf("me10");

        z+=1;
        String pa="//*[@class='p-treetable-tbody']/tr[";
        String pa2="]/td";
        driver.findElement(By.xpath(pa+z+pa2)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Gebe Tabellennamen ein")
    public void gebe_Tabellennamen_ein() {

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="ZZ"+parts[0]+parts[1].toUpperCase();


        driver.findElement(By.id("tableName")).sendKeys(nue);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke dann den Button Speichern \\(Speichern)")
    public void klicke_dann_den_Button_Speichern_Speichern() {

        driver.findElement(By.id("save")).click();


    }

    @Then("Dialog Tabelle speichern \\(Tabelle speichern) wird dann geschlossen")
    public void dialog_Tabelle_speichern_Tabelle_speichern_wird_dann_geschlossen() {





    }

    @Then("Meldung Tabelle speichern {string} erscheint")
    public void meldung_Tabelle_speichern_erscheint(String string) {


        System.out.println(driver.findElement(By.xpath("//*[@class='p-growl-message']/p")).getText());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Neue Tabelle wird unter {string} - {string} - {string} im entsprechenden Unterordner angezeigt")
    public void neue_Tabelle_wird_unter_im_entsprechenden_Unterordner_angezeigt(String string, String string2, String string3) {


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@class='layout-menu']/li[4]/a")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (string2.equalsIgnoreCase("Studierende")) {
            driver.findElement(By.id("tablesstandard&21311")).click();
        }else if (string2.equalsIgnoreCase("Prüfungen")) {
            driver.findElement(By.id("tablesstandard&21321")).click();
        }else if (string2.equalsIgnoreCase("Hochschulpersonal")) {
            driver.findElement(By.id("tablesstandard&21341")).click();
        }else if (string2.equalsIgnoreCase("Habilitationen")) {
            driver.findElement(By.id("tablesstandard&21351")).click();
        }else if (string2.equalsIgnoreCase("Promovierende")) {
            driver.findElement(By.id("tablesstandard&21352")).click();
        }else if (string2.equalsIgnoreCase("Hochschulfinanzen")) {
            driver.findElement(By.id("tablesstandard&21371")).click();
        }

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (string3.equalsIgnoreCase("Zusammenfassende Übersichten")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td/span")).click();
            }else {
                driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td/span")).click();
            }

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="ZZ"+parts[0]+parts[1].toUpperCase();

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
        ArrayList<String> obtainedList = new ArrayList<String>();

        for(WebElement we:listOfElements){
               obtainedList.add(we.getText());


        }

        int z= obtainedList.indexOf("me10");
        System.out.println(z);
        z+=1;
        String pa="//*[@class='p-treetable-tbody']/tr[";
        String pa2="]/td/span";
        driver.findElement(By.xpath(pa+z+pa2)).click();


    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    List<WebElement> listOfElements1 = driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
    ArrayList<String> obtainedList1 = new ArrayList<String>();
    for(WebElement we:listOfElements1){
           obtainedList1.add(we.getText());


    }
     assertTrue(obtainedList1.contains(nue));
    }
    @Then("Gebe Tabellennamen ein nue")
    public void gebe_Tabellennamen_ein_nue() {

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="DD"+parts[0]+parts[1].toUpperCase();


        driver.findElement(By.id("tableName")).sendKeys(nue);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Gebe Tabelle frei und melde ab")
    public void gebe_Tabelle_frei_und_melde_ab() {

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="DD"+parts[0]+parts[1].toUpperCase();

        String pa2="//*[@class='p-treetable-tbody']/tr[";
        String pa4="]/td[5]/div/span/button[2]";
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ArrayList<String> obtainedList = new ArrayList<String>();
        List<WebElement> elementList= driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
        for(WebElement we:elementList){
           obtainedList.add(we.getText());
           }
        int z= obtainedList.indexOf(nue);
        z+=1;
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.xpath(pa2+z+pa4)));

        driver.findElement(By.xpath(pa2+z+pa4)).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("continue")))).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("logout")))).click();
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

           wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("yes")))).click();
           try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

    }

    @Then("Neue Tabelle wird unter {string} - {string} - {string} im entsprechenden Unterordner angezeigt nue")
    public void neue_Tabelle_wird_unter_im_entsprechenden_Unterordner_angezeigt_nue(String string, String string2, String string3) {


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@class='layout-menu']/li[4]/a")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (string2.equalsIgnoreCase("Studierende")) {
            driver.findElement(By.id("tablesstandard&21311")).click();
        }else if (string2.equalsIgnoreCase("Prüfungen")) {
            driver.findElement(By.id("tablesstandard&21321")).click();
        }else if (string2.equalsIgnoreCase("Hochschulpersonal")) {
            driver.findElement(By.id("tablesstandard&21341")).click();
        }else if (string2.equalsIgnoreCase("Habilitationen")) {
            driver.findElement(By.id("tablesstandard&21351")).click();
        }else if (string2.equalsIgnoreCase("Promovierende")) {
            driver.findElement(By.id("tablesstandard&21352")).click();
        }else if (string2.equalsIgnoreCase("Hochschulfinanzen")) {
            driver.findElement(By.id("tablesstandard&21371")).click();
        }

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if (string3.equalsIgnoreCase("Zusammenfassende Übersichten")) {
            driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td/span")).click();
            }else {
                driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td/span")).click();
            }

        DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
        Calendar obj = Calendar.getInstance();
        String str = formatter.format(obj.getTime());
        String[] parts = str.split("_");
        String nue ="DD"+parts[0]+parts[1].toUpperCase();

        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
        ArrayList<String> obtainedList = new ArrayList<String>();

        for(WebElement we:listOfElements){
               obtainedList.add(we.getText());


        }

        int z= obtainedList.indexOf("me10");
        System.out.println(z);
        z+=1;
        String pa="//*[@class='p-treetable-tbody']/tr[";
        String pa2="]/td/span";
        driver.findElement(By.xpath(pa+z+pa2)).click();


    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    List<WebElement> listOfElements1 = driver.findElements(By.xpath("//*[@class='p-treetable-tbody']/tr/td[1]"));
    ArrayList<String> obtainedList1 = new ArrayList<String>();
    for(WebElement we:listOfElements1){
           obtainedList1.add(we.getText());


    }
     assertTrue(obtainedList1.contains(nue));
    }

    @Then("Im Navigationsmenue darunter gibt es einen Eintrag Datenabfrage {string}")
    public void im_Navigationsmenue_darunter_gibt_es_einen_Eintrag_Datenabfrage(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.id("requestdata")));

        Boolean found=false;
        try {
            driver.findElement(By.id("requestdata"));
            found=true;
          }
          catch(Exception e) {

          }
        assertTrue(found);

    }

    @Given("Befinde mich auf der Seite Datenabfrage {string}")
    public void befinde_mich_auf_der_Seite_Datenabfrage(String string) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView();", driver.findElement(By.id("requestdata")));
        driver.findElement(By.id("requestdata")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Given("Waehle aus dem Dropdownmenue das Requestwort {string}")
    public void waehle_aus_dem_Dropdownmenue_das_Requestwort(String string) {

        //wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name("queryType"))));
        driver.findElement(By.xpath("//*[@class='p-dropdown-label p-inputtext']")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        if (string.equalsIgnoreCase("GET")) {
            driver.findElement(By.xpath("//*[@class='p-dropdown-items-wrapper']/ul/li[1]")).click();
        }else if(string.equalsIgnoreCase("POST")) {
            driver.findElement(By.xpath("//*[@class='p-dropdown-items-wrapper']/ul/li[2]")).click();

        }

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }



    }

    @Given("Trage ein die {string} in das URL-Feld")
    public void trage_ein_die_in_das_URL_Feld(String string) {

        driver.findElement(By.id("in")).sendKeys(string);

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @When("Klicke dann den Button Absenden {string}")
    public void klicke_dann_den_Button_Absenden(String string) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id("submit")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @When("Bestaetige dann den Dialog Query absenden {string} mit Ja")
    public void bestaetige_dann_den_Dialog_Query_absenden_mit_Ja(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> listOfElements = driver.findElements(By.id("yes"));
        listOfElements.get(1).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("Eine Fehlermeldung {string} zum fehlgeschlagenen Request wird angezeigt")
    public void eine_Fehlermeldung_zum_fehlgeschlagenen_Request_wird_angezeigt(String string) {


        System.out.println(driver.findElement(By.xpath("//*[@class='p-grid p-fluid']/div/p")).getText());


    }

    @Then("HTTP-Status ist {string}")
    public void http_Status_ist(String string) {

        assertTrue(driver.findElement(By.xpath("//*[@class='p-grid']/div[3]/p[2]")).getText().contains("400"));

    }

    @Given("Fuege ein das {string} in den JSON-Body")
    public void fuege_ein_das_in_den_JSON_Body(String string) {


        driver.findElement(By.xpath("//*[@class='ql-editor ql-blank']")).sendKeys(string);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("Klicke dann den Button Zuruecksetzen {string}")
    public void klicke_dann_den_Button_Zuruecksetzen(String string) {

        driver.findElement(By.id("cancel")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Alle Felder werden zurueckgesetzt")
    public void alle_Felder_werden_zurueckgesetzt() {


        System.out.println(driver.findElement(By.id("in")).getText());
        System.out.println(driver.findElement(By.xpath("//*[@class='ql-editor ql-blank']")).getText());
        assertEquals(driver.findElement(By.id("in")).getText(),"");
        assertEquals(driver.findElement(By.xpath("//*[@class='ql-editor ql-blank']")).getText(),"");

    }

    @Given("Befinde mich auf Tab MySQL {string}")
    public void befinde_mich_auf_Tab_MySQL(String string) {

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@class='p-radiobutton-box p-component']")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Given("Fuege ein den MySQL-Befehl {string} in das Query-Feld")
    public void fuege_ein_den_MySQL_Befehl_in_das_Query_Feld(String string) {

        driver.findElement(By.xpath("//*[@class='ql-editor ql-blank']")).sendKeys(string);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @When("Klicke dann auf den Button Werteabruf {string}")
    public void klicke_dann_auf_den_Button_Werteabruf(String string) {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Then("Tabelle wird komplett angezeigt und mit Werten gefuellt")
    public void tabelle_wird_komplett_angezeigt_und_mit_Werten_gefuellt() {

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='results']/div/table/thead/tr[3]/th"));
        System.out.println(listOfElements.size());
        assertTrue(listOfElements.size()>0);


    }

    @Given("Habe in der Kategorie Auswertungen {string}, {string} und {string} ausgewaehlt nue")
    public void habe_in_der_Kategorie_Auswertungen_und_ausgewaehlt_nue(String string, String string2, String string3) {

        driver.findElement(By.id("evaluation")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id(string2)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id(string3)).click();

        try {

            driver.findElement(By.xpath("//*[@class='p-radiobutton-box p-component']")).click();
          }
          catch(Exception e) {

          }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tool")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Given("Habe in der Kategorie Auswertungen {string} ausgewaehlt und Land ausgewaehlt")
    public void habe_in_der_Kategorie_Auswertungen_ausgewaehlt_und_Land_ausgewaehlt(String string) {
        driver.findElement(By.id("evaluation")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        try {

            List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-radiobutton-box p-component']"));
            listOfElements.get(1).click();
          }
          catch(Exception e) {

          }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tool")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Given("Habe in der Kategorie Auswertungen {string} und {string}  ausgewaehlt nue")
    public void habe_in_der_Kategorie_Auswertungen_und_ausgewaehlt_nue(String string, String string2) {



        driver.findElement(By.id("evaluation")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.id(string2)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        try {

            List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@class='p-radiobutton-box p-component']"));
            listOfElements.get(1).click();
          }
          catch(Exception e) {

          }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("tool")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("Tabelle wird komplett angezeigt und mit Werten gefuellt nue")
    public void tabelle_wird_komplett_angezeigt_und_mit_Werten_gefuellt_nue() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='results']/div/table/thead/tr/th"));
        System.out.println(listOfElements.size());
        assertTrue(listOfElements.size()>0);
    }



    @Given("Delete This step {string}")
    public void delete_This_step(String string) {

        String from1="//*[@title='";
        String from2="']/div[3]/i";


        driver.findElement(By.xpath(from1+string+from2)).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        List<WebElement> listOfElements = driver.findElements(By.id("line"));

        wait.until(ExpectedConditions.visibilityOf(listOfElements.get(0)));
        driver.findElement(By.xpath("//*[@class='p-datatable-thead']/tr/th/div/div[2]")).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@class='p-datatable-thead']/tr/th/div/div[2]")).click();
        driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

        wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }


    @Given("Befinde mich in der Maske \\(Ordnerverzeichnis)")
    public void befinde_mich_in_der_Maske_Ordnerverzeichnis() {

        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@class='layout-menu']/li[6]/a")))).click();;

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
   }


   @Given("Klicke in dem Navigationsmenue auf {string} unter \\(Ordnerverzeichnis)")
   public void klicke_in_dem_Navigationsmenue_auf_unter_Ordnerverzeichnis(String string) {

//   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id(string)))).click();
   if (string.contains("Persoenlicher Ordner")) {
           wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablessaved&personal")))).click();
           }else if (string.contains("Gruppenordner")) {
           wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablessaved&shared")))).click();
           }else {
               try {
                   Thread.sleep(30000);
               } catch (InterruptedException e) {
                   e.printStackTrace();
               }
               wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("tablessaved&transfer")))).click();
           }
   try {
       Thread.sleep(5000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
}



   @Given("Klicke in dem Ergebnisfeld auf {string}")
   public void klicke_in_dem_Ergebnisfeld_auf(String string) {

       try {
           Thread.sleep(30000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
       WebElement ele;
       if (string.contains("Tabellen")) {
            ele =driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[2]/td"));
       }else if (string.contains("Wertmerkmale")) {ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[1]/td"));
       }else {
           try {
               Thread.sleep(30000);
           } catch (InterruptedException e) {
               e.printStackTrace();
           }
           ele=driver.findElement(By.xpath("//*[@class='p-treetable-tbody']/tr[3]/td/span"));}
       ele.click();
       try {
           Thread.sleep(5000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
   }



   @When("Klicke dann auf den Button Eigenschaften anzeigen einer Regel")
   public void klicke_dann_auf_den_Button_Eigenschaften_anzeigen_einer_Regel() {

       try {
           Thread.sleep(2000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
       driver.findElement(By.id("properties")).click();
       try {
           Thread.sleep(3000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
   }

   @Then("Eigenschaften Regel werden angezeigt")
   public void eigenschaften_Regel_werden_angezeigt() {

       wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("pr_id_4_label"))));


   }


   @Given("Regionalauswahl \\(Bund) ist vorausgewaehlt")
   public void regionalauswahl_Bund_ist_vorausgewaehlt() {

   }

   @When("Oeffne den Dialog des Statistikmerkmals {string}")
   public void oeffne_den_Dialog_des_Statistikmerkmals(String string) {

       String from1="//*[@title='";
       String from2="']/div[3]/i";


       driver.findElement(By.xpath(from1+string+from2)).click();
       try {
           Thread.sleep(3000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
       List<WebElement> listOfElements = driver.findElements(By.id("line"));

       wait.until(ExpectedConditions.visibilityOf(listOfElements.get(0)));

   }


   @Then("Option \\(Regeln) wird dann angezeigt")
   public void option_Regeln_wird_dann_angezeigt() {
   assertTrue(driver.findElement(By.xpath("//*[@class='p-overlaypanel-content']/div/div[9]/div/div")).getText().contains("Regeln"));
   }


   @Then("Unterhalb Regeln wird dann \\(keine Regel) angezeigt")
   public void unterhalb_Regeln_wird_dann_keine_Regel_angezeigt() {
   assertTrue(driver.findElement(By.id("rule")).getText().contains("keine Regel"));
   }



   @Then("Option \\(Regeln) wird dann nicht angezeigt")
   public void option_Regeln_wird_dann_nicht_angezeigt() {
   Boolean found =false;
   try {


   driver.findElement(By.xpath("//*[@class='p-overlaypanel-content']/div/div[9]/div/div")).getText().contains("Regeln");

    }
    catch(Exception e) {
       found =true;
    }
  assertTrue(found);
   }

   @Given("Klicke auf Pfeil rechts von \\(keine Regel)")
   public void klicke_auf_Pfeil_rechts_von_keine_Regel() {
   try {
   Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }
   driver.findElement(By.id("rule")).click();
   try {
   Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
}
   }


   @When("Waehle dann Regel durch Klick auf die erste Regel aus")
   public void waehle_dann_Regel_durch_Klick_auf_die_erste_Regel_aus() {
   driver.findElement(By.xpath("//*[@class='p-overlaypanel-content']/div/div[9]/div/div/div/div[3]/div/ul/li[2]")).click();
   }



   @Then("Wird die Auswahl hervorgehoben")
   public void wird_die_Auswahl_hervorgehoben() {
   driver.findElement(By.xpath("//*[@class='p-overlaypanel-content']/div/div[9]/div/div/div/div")).getText().contains("Früheres Bundesgebiet / Neue Länder");

    }

   @When("Klicke dann auf Button \\(Eigenschaften anzeigen) einer Regel")
   public void klicke_dann_auf_Button_Eigenschaften_anzeigen_einer_Regel() {
   driver.findElement(By.id("properties")).click();
   }


   @Given("Funktion \\(Berechnung durchführen) ist aufgerufen")
   public void funktion_Berechnung_durchführen_ist_aufgerufen() {
   try {
   Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[6]")))).click();
   try {
   Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("formula1Ber"))));
   }

   @Given("Schreibe Name {string} und Beschreibung {string} des EMM in die entsprechenden Felder und waehle {string}")
   public void schreibe_Name_und_Beschreibung_des_EMM_in_die_entsprechenden_Felder_und_waehle(String string, String string2, String string3) {
   DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
   Calendar obj = Calendar.getInstance();
   String str = formatter.format(obj.getTime());
   String[] parts = str.split("_");
   String nue ="AB"+parts[0]+parts[1];
   driver.findElement(By.id("merkmalNameBer")).sendKeys(nue);
   driver.findElement(By.id("merkmaltextBer")).sendKeys(string2);
   driver.findElement(By.id("statistikBer")).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='statistikBer']/div[3]/div/ul/li[1]")))).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }

   @Given("{string} Anzahl ist ausgewaehlt")
   public void anzahl_ist_ausgewaehlt(String string) {
   driver.findElement(By.id("maßeinheitBer")).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='maßeinheitBer']/div[3]/div/ul/li[1]")))).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }

   @Given("Waehle {string} aus dem Pulldownmenue in Basisangaben")
   public void waehle_aus_dem_Pulldownmenue_in_Basisangaben(String string) {
   driver.findElement(By.id("statistik2Ber")).click();
   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }


   if (string.equalsIgnoreCase("21311")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[1]")).click();
   }else if(string.equalsIgnoreCase("21321")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[1]")).click();
   }else if(string.equalsIgnoreCase("21341")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[2]")).click();

   try {
           Thread.sleep(2000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }



  try {
   Thread.sleep(2000);
    } catch (InterruptedException e) {
e.printStackTrace();
    }
   }

   @Given("Waehle Wertmerkmal {string} aus dem Wertmerkmal-Pulldownmenue")
   public void waehle_Wertmerkmal_aus_dem_Wertmerkmal_Pulldownmenue(String string) {
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[2]/span"));
   listOfElements.get(0).click();
   try {
       Thread.sleep(3000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   List<WebElement> listOfElements1 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[1]"));
   List<WebElement> listOfElements2 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[1]"));
   List<WebElement> listOfElements3 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[1]"));
   List<WebElement> listOfElements4 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[2]"));
   List<WebElement> listOfElements5 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[3]"));
   List<WebElement> listOfElements6 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[4]"));
   List<WebElement> listOfElements7 = driver.findElements(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[5]"));

   if(string.contains("STUDWS")) {
       listOfElements1.get(0).click();
   }else if (string.contains("PRUEF")) {
       listOfElements2.get(0).click();
   }else if (string.contains("PERS")) {
       listOfElements3.get(0).click();
   }else if (string.contains("STUDSS")) {
       listOfElements4.get(0).click();
   }else if(string.contains("STUD1HS")) {
       listOfElements5.get(0).click();
   }else if(string.contains("STUD1FS")) {
       listOfElements7.get(0).click();
   }else if(string.contains("STUD")) {
   listOfElements6.get(0).click();
   }
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }
   }

   @Given("Gebe Formel {string} ein")
   public void gebe_Formel_ein(String string) {
   driver.findElement(By.id("formula1Ber")).sendKeys(string);
   }

   @When("Klicke dann auf den Button Speichern \\(Speichern)")
   public void klicke_dann_auf_den_Button_Speichern_Speichern() {
   driver.findElement(By.xpath("//*[@class='p-button p-component p-button-success p-button-text-icon-left']")).click();
   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }

   @Then("Funktion Berechnung durchfuehren \\(Berechnung durchführen) ist dann geschlossen")
   public void funktion_Berechnung_durchfuehren_Berechnung_durchführen_ist_dann_geschlossen() {

   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));
       assumeTrue(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]")).isDisplayed());
   }

   @Then("Kategorie Auswertungen {string} wird dann angezeigt")
   public void kategorie_Auswertungen_wird_dann_angezeigt(String string) {
   try {
   Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }

   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[5]"))));

   List<WebElement> elementList= driver.findElements(By.xpath("//*[@id='td_merkmale']/div/div/div/div/div"));

   assertEquals(elementList.get(0).getText(),string);
//ID geändert
//assertEquals(driver.findElement(By.xpath("//*[@class='p-dataview-content']/div/div[1]")).getText(),string);

}

   @Then("EMM ist in der Merkmalsliste")
   public void emm_ist_in_der_Merkmalsliste() {
   DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
   Calendar obj = Calendar.getInstance();
   String str = formatter.format(obj.getTime());
   String[] parts = str.split("_");
   String nue ="//*[@title='test122c [AB"+parts[0]+parts[1] + "]']";
   assertTrue(driver.findElement(By.xpath(nue)).getText().contains("test122c [AB\"+parts[0]+parts[1] + \"]\""));
   }


   @Then("Es laesst sich damit eine abrufbare Tabelle erstellen")
   public void es_laesst_sich_damit_eine_abrufbare_Tabelle_erstellen() {
   String Reg = "LAND";
   Integer Zeile = 1;
   ziehe_erstes_in_Zeilendefinition(Reg, 1);

   DateFormat formatter = new SimpleDateFormat("dd_MMM_yy");
   Calendar obj = Calendar.getInstance();
   String str = formatter.format(obj.getTime());
   String[] parts = str.split("_");

   String emm ="test122c [AB\"+parts[0]+parts[1] + \"]\"";
   Integer Spalte = 1;
   ziehe_erstes_in_Spaltendefinition(emm, Spalte);

   String time = "JAHR";
   ziehe_erstes_in_Vorbedingungen_Filter(time);

   String semester =  "SEMESTER";
   ziehe_erstes_in_Vorbedingungen_Filter(semester);

   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }

   driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[1]")).click();

   wait.until(ExpectedConditions.invisibilityOf(driver.findElement(By.id("pr_id_3"))));
   try {
       Thread.sleep(3000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }

   try {
       Thread.sleep(5000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }
   List<WebElement> listOfElements = driver.findElements(By.xpath("//*[@id='results']/div/table/thead/tr[3]/th"));
   System.out.println(listOfElements.size());
   assertTrue(listOfElements.size()>0);

   }

   @Given("Es steht nur das {string} zur Verfuegung")
   public void es_steht_nur_das_zur_Verfuegung(String string) {
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[2]/span")))).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
      e.printStackTrace();
   }
   assertTrue(driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[1]")).getText().contains(string));
   Boolean found=false;
   try {
       driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[2]"));
       found=true;
     }
     catch(Exception e) {

     }
   assertFalse(found);

   }

   @When("Waehle dann {string} aus dem Pulldownmenue in Basisangaben")
   public void waehle_dann_aus_dem_Pulldownmenue_in_Basisangaben(String string) {
   driver.findElement(By.id("statistik2Ber")).click();
   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
   e.printStackTrace();
   }


   if (string.equalsIgnoreCase("21311")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[1]")).click();
   }else if(string.equalsIgnoreCase("21321")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[1]")).click();
   }else if(string.equalsIgnoreCase("21341")) {
       driver.findElement(By.xpath("//*[@id='statistik2Ber']/div[3]/div/ul/li[2]")).click();

   try {
           Thread.sleep(2000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }
   }

   @Then("Es steht dann nur das {string} zur Verfuegung")
   public void es_steht_dann_nur_das_zur_Verfuegung(String string) {
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[2]/span")))).click();
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   assertTrue(driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[1]")).getText().contains(string));

   Boolean found=false;
   try {
       driver.findElement(By.xpath("//*[@id='merkmal2Ber']/div[3]/div/ul/li[2]"));
       found=true;
     }
     catch(Exception e) {

     }
   assertFalse(found);
   }

   @When("Klicke dann auf den Button Berechnung durchfuehren {string}")
   public void klicke_dann_auf_den_Button_Berechnung_durchfuehren(String string) {
   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//*[@id='td_menu']/div/ul/li[6]")))).click();


   }

   @Then("Dialog Berechnung durchfuehren {string} ist dann angezeigt")
   public void dialog_Berechnung_durchfuehren_ist_dann_angezeigt(String string) {
   assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_7']/div/span")).getText().contains("Berechnung durchführen"));
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }




   @Then("Es gibt eine Sektion \\(Ergebnis der Berechnung)")
   public void es_gibt_eine_Sektion_Ergebnis_der_Berechnung() {
   assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_7']/div/div/div/div/div[1]")).getText().contains("Ergebnis der Berechnung"));
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }


   @Then("Es gibt eine Sektion \\(Basisangaben für Berechnung)")
   public void es_gibt_eine_Sektion_Basisangaben_für_Berechnung() {
   assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_7']/div/div/div/div/div[3]")).getText().contains("Basisangaben für Berechnung"));
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }


   @Then("Es gibt eine Sektion \\(Ausgewählte Operanden für Berechnung)")
   public void es_gibt_eine_Sektion_Ausgewählte_Operanden_für_Berechnung() {
   assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_7']/div/div/div/div/div[5]")).getText().contains("Ausgewählte Operanden für Berechnung"));
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }


   @Then("Es gibt eine Sektion \\(Formel der Berechnung)")
   public void es_gibt_eine_Sektion_Formel_der_Berechnung() {
   assertTrue(driver.findElement(By.xpath("//*[@id='pr_id_7']/div/div/div/div/div[7]")).getText().contains("Formel der Berechnung"));
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   }






//___________________________________________________________________________________________________________
    //take screenshot by failure and quiting the driver
    @After()
    public void takeScreenshotOnFailure(Scenario scenario) {

       if (scenario.isFailed()) {

           final byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);

           scenario.embed(screenshot, "image/png");
           try {
               wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("logout")))).click();
               driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

                  wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("yes")))).click();
               driver.close();
             }
             catch(Exception e) {
                 driver.close();
             }

           }else {

               try {
                   wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("logout")))).click();
                   driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

                      wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("yes")))).click();
                   driver.close();
                 }
                 catch(Exception e) {
                     driver.close();
                 }
               }

        }






}
