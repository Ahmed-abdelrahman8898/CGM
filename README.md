Page
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageBase {

	protected static WebDriver driver;
	protected static WebDriverWait wait;

	//create instructor to initialize the pageelement

	public PageBase(WebDriver driver) {

		PageFactory.initElements(driver, this);
		wait = new WebDriverWait(driver, 60);
		}
	//Helper Methods
	protected static void btn_click(WebElement button) {

		wait.until(ExpectedConditions.elementToBeClickable(button)).click();;



	}

	protected static void text_set(WebElement element, String text) {
		element.sendKeys(text);
	}

	protected static void element_hover(WebElement element) {
		Actions action = new Actions(driver);
		action.moveToElement(element).perform();
	}

}

_________________
Pom
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>hsstat-serenity-TA</groupId>
	<artifactId>hsstat-serenity-TA</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>hsstat-serenity-TA</name>
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
________________________________-
Tables
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Scanner;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;



public class TabelleVergleichRunner {
		public static ArrayList<String> captionold(ChromeDriver driver)    {
			ArrayList<String> out_captionold = new ArrayList<String>();
			try {
				List<WebElement> elementList= driver.findElements(By.xpath("//*/thead/tr[1]/th/span/input"));
				int e1=elementList.size();
				for (WebElement we:elementList) {
					out_captionold.add(we.getAttribute("value"));
				}
				out_captionold.add(driver.findElement(By.xpath("//*/thead/tr[1]/th/span")).getText());


			}catch (Exception e) {

	        }



			return out_captionold;
		}
		public static ArrayList<String> captionnew(ChromeDriver driver)    {
			ArrayList<String> out_captionnew = new ArrayList<String>();
			try {

				 List<WebElement> elementList= driver.findElements(By.xpath("//*/table/caption/span"));
				 for (WebElement we:elementList) {
					 out_captionnew.add(we.getText());
				 }


	        } catch (Exception e) {

	        }

			return out_captionnew;
		}
		//______________________________________________________Header______________________
		public static ArrayList<String> headerold(ChromeDriver driver){

			System.out.println(driver.findElement(By.xpath("//*/thead/tr[1]/th[1]")).getAttribute("innerHTML"));
			System.out.println(driver.findElement(By.xpath("//*/thead/tr[1]/th[1]")).getAttribute("outerHTML"));
			ArrayList<String> out_headerold = new ArrayList<String>();
			String h="//*/thead/tr[";
			List<WebElement> elementList= driver.findElements(By.xpath("//*/thead/tr"));
	        int e1=elementList.size();
	        for (int i = 0; i < e1; i++) {


	        	  List<WebElement> elementList3= driver.findElements(By.xpath(h+(i+2)+"]/th"));

	        	  for (int i1 = 0; i1 < elementList3.size(); i1++) {



	        		  try {

	        			  out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/input")).getAttribute("value"));
	        			  System.out.println("Todays first : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/input")).getAttribute("value"));

	      			} catch (Exception e) {

	      				if(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText().isEmpty()) {
	      					System.out.println("Todays second : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());

	      				}else {
	      					out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
	      					System.out.println("Todays third : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
	      				}

	      			//out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
	      			}
	        		  try {
	        			  List<WebElement> elementList303= driver.findElements(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input"));
	        			  for (WebElement t:elementList303) {
	        				  out_headerold.add(t.getAttribute("value"));
	            			  System.out.println("Todays : my new try " +t.getAttribute("value"));


	        			  }

	        			  //out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input")).getAttribute("value"));
	        			  //System.out.println("Todays : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input")).getAttribute("value"));

	      			} catch (Exception e) {

	      			}

	        	  }}
	        return out_headerold;
		}
		//______________________________________________________Header old new logic ______________________
				public static ArrayList<String> headerold1(ChromeDriver driver){
					ArrayList<String> out_headerold = new ArrayList<String>();
					driver.findElement(By.xpath("//*[@class='show-empty-columns']")).click();
					 try {
							Thread.sleep(3000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					String h="//*/thead/tr[";
					List<WebElement> elementList= driver.findElements(By.xpath("//*/thead/tr"));
			        int e1=elementList.size();
			        for (int i = 0; i < e1; i++) {


			        	  List<WebElement> elementList3= driver.findElements(By.xpath(h+(i+2)+"]/th"));

			        	  for (int i1 = 0; i1 < elementList3.size(); i1++) {



			        		  try {

			        			  out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/input")).getAttribute("value"));
			        			  System.out.println("Todays first new  : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/input")).getAttribute("value"));

			      			} catch (Exception e) {



			      			//out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
			      			}
			        		  try {
			        			  List<WebElement> elementList303= driver.findElements(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input"));
			        			  for (WebElement t:elementList303) {
			        				  out_headerold.add(t.getAttribute("value"));
			            			  System.out.println("Todays : my new try new " +t.getAttribute("value"));


			        			  }

			        			  //out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input")).getAttribute("value"));
			        			  //System.out.println("Todays : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]/span/input")).getAttribute("value"));

			      			} catch (Exception e) {

			      			}
			        			if(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText().isEmpty()) {
			      					System.out.println("Todays second  new: " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());

			      				}else {
			      					out_headerold.add(driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
			      					System.out.println("Todays third new : " +driver.findElement(By.xpath(h+(i+2)+"]/th["+(i1+1)+"]")).getText());
			      				}

			        	  }}
			        return out_headerold;
				}
				//________________________________________________________
		public static ArrayList<String> headernew(ChromeDriver driver){
			ArrayList<String> out_headernew = new ArrayList<String>();
			List<WebElement> elementList5= driver.findElements(By.xpath("//*/thead/tr"));
			String hnew="//*/thead/tr[";
			 for (int somar = 0; somar < elementList5.size(); somar++) {


	       	  List<WebElement> elementList6= driver.findElements(By.xpath(hnew+(somar+1)+"]/th"));


	       	  for (int sema = 0; sema < elementList6.size(); sema++) {
	       		  try {

	       			out_headernew.add(driver.findElement(By.xpath(hnew+(somar+1)+"]/th["+(sema+1)+"]/input")).getAttribute("value"));

	     			} catch (Exception e) {

	     			out_headernew.add(driver.findElement(By.xpath(hnew+(somar+1)+"]/th["+(sema+1)+"]")).getText());
	     			//System.out.println(driver.findElement(By.xpath(hnew+(somar+1)+"]/th["+(sema+1)+"]")).getText());
	     			//System.out.println("________________________-");
	     			}

	       	  }

			 }



			return out_headernew ;

		}
		//______________________body_______________________________--____________________
		public static ArrayList<String> bodyold(ChromeDriver driver){
			ArrayList<String> out_bodyold = new ArrayList<String>();
			ArrayList<String> obtainedList20 = new ArrayList<String>();
			 String body="//*/tbody/tr[";
			 String nope1;
			 String nope2;
			 List<WebElement> elementList20= driver.findElements(By.xpath("//*/tbody/tr"));
			 int e20=elementList20.size();
			 List<WebElement> elementList5008= driver.findElements(By.xpath("//*/tbody/tr/th"));
			 String found1;
		        for (int i20 = 0; i20 < e20; i20++) {

		        	  nope1="";
		        	  nope2="";
		        	  try {
		        		  List<WebElement> elementList40= driver.findElements(By.xpath(body+(i20+1)+"]/th"));
		        		  found1="True1";
		        		  }catch (Exception e30) {
		        			  found1="false1";
		        		  }
		        	 if(found1.equalsIgnoreCase("True1")) {

			        		  List<WebElement> elementList40= driver.findElements(By.xpath(body+(i20+1)+"]/th"));

			        		  for (int i40 = 0; i40 < elementList40.size(); i40++) {
				        		  try {

				        			  found1="done";
				        			  //obtainedList20.add(driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value"));
				        			  nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value");
				        			  nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value");

				      			} catch (Exception e) {

				      			found1="done";
				      			//obtainedList20.add(driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText());
				      			nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText();
				      			nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText();
				      			}

				        	  }

		        	 }
		        		 List<WebElement> elementList399= driver.findElements(By.xpath(body+(i20+1)+"]/td"));
		        		 for (int i60=0; i60<elementList399.size();i60++) {

		        			 String top=driver.findElement(By.xpath(body+(i20+1)+"]/td")).getText().replace("e", "").replace(".", " ");
		        			 //System.out.println(top);
		        			 //obtainedList20.add(top);
		        			 nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/td")).getText().replace("e", "").replace(".", " ");

		        			 try {
		        				 String substring = driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").substring(Math.max(driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").length() - 2, 0));
		        				 System.out.println("substring here :-"+substring);
		        			 if(substring.equalsIgnoreCase(",0")) {
		        				 nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").replace(",0", "");

		        			 }else {
		        				 nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ");

		        			 }
		        			 }catch (Exception e) {
		        				 System.out.println("");
		        			 }

		        		 }





		        		 //out_bodyold.add(nope1);
		        		 out_bodyold.add(nope2);
		        		 //System.out.println("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
		        		 //System.out.println(nope2);
		        		 //System.out.println("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");

		        	}



			return out_bodyold;
		}
		//_____________________________________________ old body new logic_______________________
		public static ArrayList<String> bodyold1(ChromeDriver driver){
			ArrayList<String> out_bodyold = new ArrayList<String>();
			ArrayList<String> obtainedList20 = new ArrayList<String>();
			 String body="//*/tbody/tr[";
			 String nope1;
			 String nope2;
			 driver.findElement(By.xpath("//*[@class='show-empty-rows']")).click();
			 try {
					Thread.sleep(3000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			 List<WebElement> elementList20= driver.findElements(By.xpath("//*/tbody/tr"));
			 int e20=elementList20.size();
			 List<WebElement> elementList5008= driver.findElements(By.xpath("//*/tbody/tr/th"));
			 String found1;
		        for (int i20 = 0; i20 < e20; i20++) {

		        	  nope1="";
		        	  nope2="";
		        	  try {
		        		  List<WebElement> elementList40= driver.findElements(By.xpath(body+(i20+1)+"]/th"));
		        		  found1="True1";
		        		  }catch (Exception e30) {
		        			  found1="false1";
		        		  }
		        	 if(found1.equalsIgnoreCase("True1")) {

			        		  List<WebElement> elementList40= driver.findElements(By.xpath(body+(i20+1)+"]/th"));

			        		  for (int i40 = 0; i40 < elementList40.size(); i40++) {
				        		  try {

				        			  found1="done";
				        			  //obtainedList20.add(driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value"));
				        			  nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value");
				        			  nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]/input")).getAttribute("value");

				      			} catch (Exception e) {

				      			found1="done";
				      			//obtainedList20.add(driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText());
				      			nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText();
				      			nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/th["+(i40+1)+"]")).getText();
				      			}

				        	  }

		        	 }
		        		 List<WebElement> elementList399= driver.findElements(By.xpath(body+(i20+1)+"]/td"));
		        		 for (int i60=0; i60<elementList399.size();i60++) {

		        			 String top=driver.findElement(By.xpath(body+(i20+1)+"]/td")).getText().replace("e", "").replace(".", " ");
		        			 //System.out.println(top);
		        			 //obtainedList20.add(top);
		        			 nope1= nope1 +driver.findElement(By.xpath(body+(i20+1)+"]/td")).getText().replace("e", "").replace(".", " ");
		        			 try {
		        				 String substring = driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").substring(Math.max(driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").length() - 2, 0));
		        				 System.out.println("substring here :-"+substring);
		        			 if(substring.equalsIgnoreCase(",0")) {
		        				 nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ").replace(",0", "");

		        			 }else {
		        				 nope2= nope2 +driver.findElement(By.xpath(body+(i20+1)+"]/td["+(i60+1)+"]")).getText().replace("e", "").replace(".", " ");

		        			 }
		        			 }catch (Exception e) {
		        				 System.out.println("");
		        			 }
		        		 }





		        		 //out_bodyold.add(nope1);
		        		 out_bodyold.add(nope2);
		        		 //System.out.println("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
		        		 //System.out.println(nope2);
		        		 //System.out.println("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");

		        	}



			return out_bodyold;
		}
		//_________________________________________________________________________________________________

		public static ArrayList<String> bodynew(ChromeDriver driver){
			ArrayList<String> out_bodynew = new ArrayList<String>();
			String body="//*/tbody/tr[";
			String nope;
			String nope2;
			 List<WebElement> elementList202= driver.findElements(By.xpath("//*/tbody/tr"));
			 int e202=elementList202.size();
			 String found12;
		        for (int i202 = 0; i202 < e202; i202++) {
		        	nope="";
		        	nope2="";

		        	  try {
		        		  List<WebElement> elementList402= driver.findElements(By.xpath(body+(i202+1)+"]/th"));
		        		  found12="True1";
		        		  }catch (Exception e302) {
		        			  found12="false1";
		        		  }
		        	 if(found12.equalsIgnoreCase("True1")) {

			        		  List<WebElement> elementList402= driver.findElements(By.xpath(body+(i202+1)+"]/th"));

			        		  for (int i402 = 0; i402 < elementList402.size(); i402++) {
				        		  try {

				        			  found12="done";

				        			  nope=nope+driver.findElement(By.xpath(body+(i202+1)+"]/th["+(i402+1)+"]/input")).getAttribute("value");
				        			  nope2=nope2+driver.findElement(By.xpath(body+(i202+1)+"]/th["+(i402+1)+"]/input")).getAttribute("value");
				      			} catch (Exception e) {

				      			found12="done";

				      			nope=nope+driver.findElement(By.xpath(body+(i202+1)+"]/th["+(i402+1)+"]")).getText();
				      			nope2=nope2+driver.findElement(By.xpath(body+(i202+1)+"]/th["+(i402+1)+"]")).getText();
				      			}

				        	  }

		        	 }
		        		 List<WebElement> elementList3992= driver.findElements(By.xpath(body+(i202+1)+"]/td"));
		        		 for (int i602=0; i602<elementList3992.size();i602++) {


		        			 //removing a - maybe later be deleter
		        			 nope=nope+driver.findElement(By.xpath(body+(i202+1)+"]/td")).getText().replace("e", "").replace(".", " ");
		        			 nope2=nope2+driver.findElement(By.xpath(body+(i202+1)+"]/td["+(i602+1)+"]")).getText().replace("e", "").replace(".", " ").replace("--", "-");

		        			 }


		        		 //out_bodynew.add(nope);
		        		 out_bodynew.add(nope2);

		        	}



			return out_bodynew;
		}





		public static void main(String[] args) {
			System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir")+"/Drivers/chromedriver.exe");
			ChromeOptions options =new ChromeOptions();
			options.addArguments("--headless");
			options.addArguments("--windows-size=1920,1080");
			ChromeDriver driver=new ChromeDriver();
			driver.manage().deleteAllCookies();
			driver.manage().window().maximize();
			ArrayList<String> data = new ArrayList<String>();
			/*data.add("11111-0001");
			data.add("11111-0002");
			data.add("12111-0001");
			data.add("12111-0002");
			data.add("12111-0003");
			data.add("12111-0004");
			data.add("12111-0005");
			data.add("12111-0006");
			data.add("62421-0010");
			data.add("21421-0001");*/
			DateFormat formatter1 = new SimpleDateFormat("dd_MMM_yyyy");
			Calendar obj1 = Calendar.getInstance();
			String str1 ="Report_" +formatter1.format(obj1.getTime());

			boolean firstrun = true;

			try {
			      File myObj = new File("try.txt");
			      Scanner myReader = new Scanner(myObj);

			      while (myReader.hasNextLine()){
			          data.add(myReader.nextLine());
			      }
			      myReader.close();
			    } catch (IOException e) {
			      System.out.println("An error occurred.");
			      e.printStackTrace();
			    }


			for (String s:data) {
				String rep=s;
				String[] parts = s.split("-");
				String sos=parts[0];





			//String rep="11111-0002";
			//String sos="11111";
			//String oldurl="https://www-genesis.destatis.de/genesis/online/result/rep/de#abreadcrumb";
			String oldurl="http://genesis-test-web01-neu/genesisGORSTABLE/online/result/rep/de";
			String newurl="http://genesis-test-web01-neu.wi.stba.de/gor-stable/statistic/sos/table/rep";
			oldurl =oldurl.replace("rep", rep);
			newurl =newurl.replace("rep", rep);
			newurl =newurl.replace("sos", sos);
			driver.navigate().to(oldurl);
			try {
	            Thread.sleep(10000);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
			boolean nodata=false;
			try {

				if(driver.findElement(By.xpath("//*[@class='highEmph']")).isDisplayed()) {
					nodata=true;
				}

	        } catch (Exception e) {
	            e.printStackTrace();
	        }
			try {

				driver.findElement(By.xpath("//*[@class='etlinkcomplete']")).click();


	        } catch (Exception e) {
	            e.printStackTrace();
	        }
			try {
	            Thread.sleep(5000);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }



			ArrayList<String> oldcaption = new ArrayList<String>();
			oldcaption=captionold(driver);
			ArrayList<String> oldheader = new ArrayList<String>();
			try {

				oldheader=headerold(driver);
				System.out.println(oldheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""));

			}catch(Exception e) {

			}

			ArrayList<String> oldheader1 = new ArrayList<String>();
			try {
				oldheader1=headerold1(driver);
				System.out.println(oldheader1.toString().replace("\n", "").replace("\r", "").replace(", ", ""));
			}catch(Exception e){

			}

			ArrayList<String> oldbody = new ArrayList<String>();
			oldbody=bodyold(driver);
			ArrayList<String> oldbody1 = new ArrayList<String>();
			try {
				oldbody1=bodyold1(driver);
			}catch(Exception e){

			}




			System.out.println("**********************************************My caption****************");
			for(int m=0;m<oldcaption.size();m++) {
				System.out.println(oldcaption.get(m));
			}

			System.out.println(oldcaption.size());
			System.out.println("**********************************************Header********************");
			for(int m=0;m<oldheader.size();m++) {
				System.out.println(oldheader.get(m));
			}
			System.out.println(oldheader.size());
			for(int m=0;m<oldheader1.size();m++) {
				System.out.println(oldheader1.get(m));
			}
			System.out.println(oldheader1.size());
			System.out.println("**********************************************Body***************************************+");
			for(int m=0;m<oldbody.size();m++) {
				System.out.println(oldbody.get(m));
			}
			System.out.println(oldbody.size());
			System.out.println("**********************************************newcaption**************************************");

			for(int m=0;m<oldbody1.size();m++) {
				System.out.println(oldbody1.get(m));
			}
			System.out.println(oldbody1.size());
			driver.navigate().to(newurl);
			try {

				try {
					Thread.sleep(15000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}

				driver.findElement(By.xpath("//*[@class='button button-button cookie-consent-closebutton']")).click();

			} catch (Exception e) {
			}


			ArrayList<String> newcaption = new ArrayList<String>();
			newcaption=captionnew(driver);
			ArrayList<String> newheader = new ArrayList<String>();
			newheader=headernew(driver);
			for(int m=0;m<newcaption.size();m++) {
				System.out.println(newcaption.get(m));
			}
			System.out.println(newcaption.size());
			for(int m=0;m<newheader.size();m++) {
				System.out.println(newheader.get(m));
			}
			System.out.println(newheader.size());
			ArrayList<String> newbody = new ArrayList<String>();
			newbody=bodynew(driver);
			for(int m=0;m<newbody.size();m++) {
				System.out.println(newbody.get(m));
			}
			System.out.println("this is new body : "+newbody.size());
			System.out.println("this is oldcaption : "+oldcaption.size());
			System.out.println("this is old header : "+oldheader.size());
			System.out.println("this is old header new logic : "+oldheader1.size());
			System.out.println("this is old body : "+oldbody.size());
			System.out.println("this is old body new logic : "+oldbody1.size());
			System.out.println("this is new caption : "+newcaption.size());
			System.out.println("this is new header : "+newheader.size());
			System.out.println("this is new body : "+newbody.size());
			System.out.println("888888888888888888888888888888888888888888888888888888888888888888");
			ArrayList<String> newcaption_splitted = new ArrayList<String>();
			for (String c1:newcaption) {
				String[] splittedcaption = c1.split(" ");
				 for (String c2:splittedcaption) {
					 newcaption_splitted.add(c2);

				 }
				}

			for (String c3:newcaption_splitted) {
				 System.out.println("this is split : "+c3);

			 }
			System.out.println("try to fix head_______________________________");
			String[] tom ;

			ArrayList<String> oldheaderremoved = new ArrayList<String>();

			ArrayList<String> newheaderremoved = new ArrayList<String>();

			try {
				tom=newheader.get(0).split("\n");
				for (int te=tom.length;te<oldheader1.size();te++) {
					oldheaderremoved.add(oldheader1.get(te));
			}
				for (int te=(tom.length-1);te<newheader.size();te++) {
					newheaderremoved.add(newheader.get(te));
			}
				for(String me:oldheaderremoved) {
					System.out.println("older removed header: " +me);

			}
				for(String me:oldheaderremoved) {
					System.out.println("new removed header: " +me);

			}
			}catch(Exception e) {

			}
			System.out.println(oldheaderremoved.toString().replace("\n", "").replace("\r", "").replace(", ", "").equalsIgnoreCase(newheaderremoved.toString().replace("\n", "").replace("\r", "").replace(", ", "")));




			System.out.println("try to fix head_______________________________");


			//_____________________________________caption check________________________________________________
			boolean captionchek=true;
			String captionerror ="";

			if (oldcaption.size()==newcaption.size()||newcaption.size()==(oldcaption.size()-1)) {

				for (String c:newcaption) {
					System.out.println(oldcaption.toString().replace(",", "").replace(" ", ""));
					if(oldcaption.toString().replace(",", "").replace(" ", "").contains(c.replace(" ", ""))) {


						System.out.println("this is correct captio   :  "+c);
						}else {
							captionchek=false;
							System.out.println(c);
							captionerror="The value of caption not correct";
							break;

						}

				}


			}else {
				captionchek=false;
				captionerror="Size of caption not correct please check";

			}
			if (captionchek == false) {
				for (String c4:newcaption_splitted) {
					if(oldcaption.toString().replace(",", "").replace(" ", "").contains(c4)) {
						System.out.println("yes it is inside: "+c4);
						captionchek=true;


					}else {
						captionchek=false;
						break;
					}

				}
			}
			/*if (oldcaption.size()==newcaption.size()) {

				for (String c:oldcaption) {
					if(newcaption.contains(c)) {
						}else {
							captionchek=false;
							captionerror="The value of caption not correct(before report)";
							break;

						}

				}


			}else {
				captionchek=false;
				captionerror="Size of caption not correct please check(before report)";

			}*/
			//_____________________________________Headercheck________________________________________________
			boolean headercheck=true;
			String headererror ="" ;
			//maybe delete________________________________
			HashMap<String, String> mapheader = new HashMap<String, String>();
			System.out.println(oldheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""));
			System.out.println(newheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""));
			if (oldheader.size()==newheader.size()) {
				for (int tema23 = 0;tema23 < oldheader.size(); tema23++) {

					 if(oldheader.get(tema23).equalsIgnoreCase(newheader.get(tema23))) {
						 System.out.println("Yes it is equal: "+oldheader.get(tema23)+" = "+newheader.get(tema23));
					 }else {
					 System.out.println("This is old header : ("+oldheader.get(tema23)+" )Not equal this new : ("+newheader.get(tema23)+")");
					 headercheck=false;
					headererror ="Value of header not correct please check";
					//maybe delete____________________
					mapheader.put(String.valueOf(tema23+1), "row number ("+(tema23+1)+") is not equal: "+"This is old header : ("+oldheader.get(tema23)+" )Not equal this new : ("+newheader.get(tema23)+")");

					 }

		     		}



			}else if(oldheader.toString().replace("\n", "").replace("\r", "").replace(", ", "").equalsIgnoreCase(newheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""))) {
				System.out.println("___________________________++++++++++++++++++++++________________________-");

				System.out.println(oldheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""));
				System.out.println(newheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""));
				System.out.println(oldheader.toString().replace("\n", "").replace("\r", "").replace(", ", "").equalsIgnoreCase(newheader.toString().replace("\n", "").replace("\r", "").replace(", ", "")));
				System.out.println("___________________________++++++++++++++++++++++________________________-");
			} else if (oldheader1.size()==newheader.size()) {
				for (int tema23 = 0;tema23 < oldheader.size(); tema23++) {

					 if(oldheader1.get(tema23).equalsIgnoreCase(newheader.get(tema23))) {
						 System.out.println("Yes it is equal: "+oldheader1.get(tema23)+" = "+newheader.get(tema23));
					 }else {
					 System.out.println("This is old header : ("+oldheader1.get(tema23)+" )Not equal this new : ("+newheader.get(tema23)+")");
					 headercheck=false;
					headererror ="Value of header not correct please check";
					//maybe delete____________________
					mapheader.put(String.valueOf(tema23+1), "row number ("+(tema23+1)+") is not equal: "+"This is old header : ("+oldheader1.get(tema23)+" )Not equal this new : ("+newheader.get(tema23)+")");

					 }

		     		}


			}else if(oldheader1.toString().replace("\n", "").replace("\r", "").replace(", ", "").equalsIgnoreCase(newheader.toString().replace("\n", "").replace("\r", "").replace(", ", ""))) {

			}else if(oldheaderremoved.toString().replace("\n", "").replace("\r", "").replace(", ", "").equalsIgnoreCase(newheaderremoved.toString().replace("\n", "").replace("\r", "").replace(", ", ""))) {

			}else {
				headercheck=false;
				headererror ="Header size not equal please check";
				//maybe delete______________________
				mapheader.put(String.valueOf(0), "The size of header not equal ");
			}





			//_____________________________________bodycheck________________________________________________

				boolean bodycheck = true;
				String bodysizechech;
				Dictionary dict = new Hashtable();

				HashMap<String, String> map = new HashMap<String, String>();
				if (oldbody.size()==newbody.size()) {

					 for (int tema23 = 0;tema23 < oldbody.size(); tema23++) {

		     			 if(oldbody.get(tema23).equalsIgnoreCase(newbody.get(tema23))) {
		     				System.out.println("passed");
		     				System.out.println("Yes it is equal: "+oldbody.get(tema23)+" = "+newbody.get(tema23));
		     			 }else {
		     				System.out.println("Failed");
		     				System.out.println(oldbody.get(tema23).equalsIgnoreCase(newbody.get(tema23)));
		     				System.out.println("This is old : ("+oldbody.get(tema23)+" ) Not equal this new : ("+newbody.get(tema23)+")");
		     				map.put(String.valueOf(tema23+1), "row number ("+(tema23+1)+") is not equal ");

		     			 }
		     			 }


				}else if(oldbody1.size()==newbody.size()) {
					for (int tema23 = 0;tema23 < oldbody1.size(); tema23++) {

		     			 if(oldbody1.get(tema23).equalsIgnoreCase(newbody.get(tema23))) {
		     				System.out.println("passed");
		     				System.out.println("Yes it is equal: "+oldbody1.get(tema23)+" = "+newbody.get(tema23));
		     			 }else {
		     				System.out.println("Failed");
		     				System.out.println(oldbody1.get(tema23).equalsIgnoreCase(newbody.get(tema23)));
		     				System.out.println("This is old : ("+oldbody1.get(tema23)+" ) Not equal this new : ("+newbody.get(tema23)+")");
		     				map.put(String.valueOf(tema23+1), "row number ("+(tema23+1)+") is not equal ");

		     			 }
		     			 }



				} else {
					bodycheck=false;
					bodysizechech="body size not equal";
					map.put(String.valueOf(0), "The size of body not equal. Size of old :  "+oldbody.size()+". Size of new:  "+newbody.size());

				}



				if(captionchek==false) {
					System.out.println(captionerror);
				}
				if(headercheck==false) {
					System.out.println(headererror);
				}
				if (map.isEmpty()) {
					System.out.println("Body is equal");
				}else {
					for (String key : map.keySet()) {
						  System.out.println(" ("+key+") ist not equal and this is inside the map :"+map.get(key));
						}

				}

				try {
				      File myObj = new File("Reports/"+str1+".txt");
				      if (myObj.createNewFile()) {
				        System.out.println("File created: " + myObj.getName());
				      } else {
				        System.out.println("File already exists.");
				      }
				    } catch (IOException e) {
				      System.out.println("An error occurred.");
				      e.printStackTrace();
				    }
				  try {
					  FileWriter myWriter = new FileWriter("Reports/"+str1+".txt",true);

					  if (firstrun) {
						  DateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy");
						  Calendar obj = Calendar.getInstance();
						  String str = formatter.format(obj.getTime());
						  myWriter.write(str);
						  myWriter.write("\n");
						  myWriter.write("Old Url: " +oldurl);
						  myWriter.write("\n");
						  myWriter.write("New Url: "+newurl);
						  myWriter.write("\n");
						  firstrun=false;
					  }

					  myWriter.write("\n");
					  myWriter.write(rep);
					  myWriter.write("\n");
					  myWriter.write("____________");
					  myWriter.write("\n");
						if(captionchek==false) {
							myWriter.write(captionerror);
							  myWriter.write("\n");

						}else {
							myWriter.write("\n");
							  myWriter.write("Correct caption");
							  myWriter.write("\n");
						}
						if(headercheck==false) {
							myWriter.write(headererror);
							myWriter.write("\n");

						}else {
							myWriter.write("\n");
							  myWriter.write("Correct Size of Header");
							  myWriter.write("\n");
						}
						//maybedelete__________________
						if (mapheader.isEmpty()) {
							myWriter.write("\n");
							myWriter.write("Correct header value");
							myWriter.write("\n");

						}else {
							myWriter.write("\n");
							for (String key : mapheader.keySet()) {
								  System.out.println("the row of ("+key+") of header is not equal and this is inside the map :"+mapheader.get(key));
								  myWriter.write("the row of ("+key+") of header is not equal: "+mapheader.get(key));
								  //myWriter.write("the row of ("+key+") of header is not equal");
								myWriter.write("\n");
								}

						}
						//_____________________________
						if (map.isEmpty()) {
							myWriter.write("\n");
							myWriter.write("Correct body");
							myWriter.write("\n");
							System.out.println("Body is equal");
						}else {
							myWriter.write("\n");
							for (String key : map.keySet()) {
								  System.out.println("the row of ("+key+") of body is not equal and this is inside the map :"+map.get(key));
								  myWriter.write("the row of ("+key+") of body is not equal "+map.get(key));
								myWriter.write("\n");
								}

						}
						if(nodata) {myWriter.write("\n");
						myWriter.write("There is no data");
						myWriter.write("\n");
						}
						myWriter.write("\n");
						myWriter.write("_________________________________________________________________________________________________________");
						myWriter.close();


				    } catch (IOException e) {
				      System.out.println("An error occurred.");
				      e.printStackTrace();
				    }








		}

		}

	}







