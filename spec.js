// spec.js
describe('Clickdoc Suite', function () {
    var until = protractor.ExpectedConditions;

    beforeEach(function() {
        //navigate to url
        browser.waitForAngularEnabled(false);
        
        browser.get('https://demo.clickdoc.de/cd-de/');
         //define the condition
        
         //check if the cookies popup is displayed or not
        browser.sleep(3000)

        element(by.xpath("//*[@class='btn btn-primary agree-consent agree-consent--all']")).isDisplayed().then(function (result) {
            if (result) {
                element(by.xpath("//*[@class='btn btn-primary agree-consent agree-consent--all']")).click()
            }
        })
    
      



        browser.sleep(3000)
      });

      it('Login Test', function () {
        //SOme Testing steps will be skipped on purpose like forexample:
        //killing the Browser
    
       
        
       
    
        
        var ele_profile = element(by.xpath('//*/body/app-root[1]/div[2]/div[1]/app-header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[5]/a[1]/span[1]'))
        browser.wait(until.elementToBeClickable(ele_profile), 15000);
        ele_profile.click()
    
    
    
        //wait few sec to mimic as if a human is using the app so we wont get error because of the speed
        browser.sleep(3000)
        // check1 : the X icon
        element(by.xpath('//*/body/app-iframe-dialog/div/div/div/span')).isDisplayed().then(function (result) {
            if (result) {
                expect(result).
                    toEqual(true);
            }
        })
    
        //switching frame
    
        browser.switchTo().frame(element(by.id('iframeDialog')).getWebElement());
        browser.wait(until.presenceOf(element(by.id('mat-input-1'))), 15000, 'Element taking too long to appear in the DOM (Email)');
        //checking element exists
        var ele_email = element(by.id('mat-input-1'));
        expect(ele_email.isDisplayed()).
            toEqual(true);
    
        var ele_pass = element(by.id('mat-input-2'));
        expect(ele_pass.isDisplayed()).
            toEqual(true);
    
        var ele_link_forgetpassword = element(by.xpath("//*[@translate='login.forgotPassword']"));
        expect(ele_link_forgetpassword.isDisplayed()).
            toEqual(true);
        
        var ele_btn_login = element(by.xpath("//*[@translate='login.buttons.login']"));
        expect(ele_btn_login.isDisplayed()).
            toEqual(true);
        
    
        var ele_btn_register = element(by.xpath("//*[@translate='login.buttons.register']"));
        expect(ele_btn_register.isDisplayed()).
            toEqual(true);
        //ckick login to check the error (i know the testcase said the field itself be red(getAttribute('aria-invalid')but
        // as best practice the error message should be checked first and this field itself will be tested by next step)
        ele_btn_login.click()
        browser.sleep(3000)
        element(by.xpath("//*[@id='mat-error-0']")).isDisplayed().then(function (result) {
            if (result) {
                expect(element(by.xpath("//*[@id='mat-error-0']")).getCssValue('color')).
                    toEqual('rgba(244, 67, 54, 1)');
            }
        })
        element(by.xpath("//*[@id='mat-error-0']")).isDisplayed().then(function (result) {
            if (result) {
                expect(element(by.xpath("//*[@id='mat-error-1']")).getCssValue('color')).
                    toEqual('rgba(244, 67, 54, 1)');
            }
        })
    
        //enter valid email and invalid password
        ele_email.sendKeys('ahmed.alwany@hotmail.com')
        expect(ele_email.getAttribute('aria-invalid')).
            toEqual('false');
        ele_pass.sendKeys('abcdefg')
        expect(ele_pass.getAttribute('aria-invalid')).
            toEqual('false');
        ele_btn_login.click()
        browser.sleep(5000)
        expect(element(by.xpath("//*[@class='mt-0']")).getText()).
            toEqual('Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?');
        ele_email.clear();
        ele_email.sendKeys('testmail.com')
        browser.wait(until.elementToBeClickable(ele_btn_login), 15000).then(function () {
            ele_btn_login.click()
        })
    
        browser.sleep(3000)
        expect(element(by.xpath("//*[@class='mt-0']")).getText()).
            toEqual('Bitte überprüfen Sie Ihre Eingaben und probieren Sie es erneut. Haben Sie noch keine CGM LIFE ID?');
        ele_email.clear();
        ele_email.sendKeys('ahmed.alwany@hotmail.com')
        ele_pass.clear();
        ele_pass.sendKeys('Test123456@')
        ele_btn_login.click()
        browser.switchTo().defaultContent();
    
    
        browser.wait(until.presenceOf(element(by.xpath("//*[@class='avatar__element ng-star-inserted']"))), 20000, 'Element taking too long to appear in the DOM (usericon)');
        //click the thirdpointlevel
        element(by.xpath("//*/body/app-root[1]/div[2]/div[1]/app-header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[6]/a/div")).click()
        //get the list of element
        let list = element(by.xpath("//*/body/app-root[1]/div[2]/div[1]/app-header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[6]/div")).all(by.tagName('a'));
        expect(list.get(0).getText()).toBe('Mein Profil');
        expect(list.get(1).getText()).toBe('Logout')
        //logout
        list.get(1).click()
        browser.wait(until.presenceOf(ele_profile),
            5000, 'Element taking too long to appear in the DOM (frontpage)')
    
    });

   
    it('Second Scenario', function() {
        //click search
        var ele_search = element(by.xpath("//*/body/app-root[1]/div[2]/div[1]/app-header[1]/div[1]/div[2]/div[1]/div[2]/ul[1]/li[3]/a[1]/span[1]"));
        browser.wait(until.elementToBeClickable(ele_search), 15000).then(function () {
            ele_search.click()
            browser.sleep(3000)

        })
        // click Search
        browser.wait(until.presenceOf(element(by.xpath("//*[@class='container-fluid filter-container']"))), 5000, 'Element taking too long to appear in the DOM (search section)');
        expect(element(by.xpath("//*[@class='card d-flex flex-column justify-content-center no-gutters']")).isPresent()).toBe(true);
        //checking all element exists
        var ele_result=element(by.xpath("//*[@class='card d-flex flex-column justify-content-center no-gutters']"));
        var ele_iname=element(by.id('search-query-typeahead'))
        var ele_ilocation=element(by.id('search-location-typeahead'))
        var ele_btn_search=element(by.xpath("//*[@translate='doctorSearch.search.filter.submit']"))
        expect(ele_iname.isPresent()).toBe(true);
        expect(ele_ilocation.isPresent()).toBe(true);
        expect(ele_btn_search.isPresent()).toBe(true);
        expect(element(by.xpath("//*[@translate='search.filter.checkbox.online.booking']")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@translate='search.filter.checkbox.video.appointment']")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@translate='search.filter.checkbox.accessibility']")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@class='custom-control-label']/span[2]")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@class='row sort-section'][2]/div/div/label/span[2]")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@class='row sort-section'][3]/div/div/label/span[2]")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@class='ngx-slider-span ngx-slider-bar']")).isPresent()).toBe(true);
        expect(ele_result.getText()).
        toEqual('AUF DER LINKEN SEITE KÖNNEN SIE DIE ARZTSUCHE STARTEN.');
        ele_iname.sendKeys('Beate')
        browser.sleep(3000)
        expect(element(by.xpath("//*[@role='listbox']")).isPresent()).toBe(true);
        //check the suggestion
        let suggestionslist = element.all(by.xpath("//*[@role='listbox']")).all(by.css('.dropdown-item-inner'));
       var count1 = suggestionslist.count();
        ele_iname.sendKeys(' Edel')

        browser.sleep(3000)
        let suggestionslist1 = element.all(by.xpath("//*[@role='listbox']")).all(by.css('.dropdown-item-inner'));

        expect(count1).toBeGreaterThan(suggestionslist1.count());
        ele_iname.clear()
        ele_iname.sendKeys('#####')
        browser.sleep(3000)
        expect(element(by.xpath("//*[@role='listbox']")).isPresent()).toBe(false);
        ele_iname.clear()
        ele_iname.sendKeys('Beate')
        ele_btn_search.click()
        browser.sleep(3000)
        //check the result
        expect(element(by.xpath("//*[@class='header-image']")).isPresent()).toBe(true);
        expect(element(by.xpath("//*[@class='contact-header__content-titles']")).isPresent()).toBe(true);

        var ele_more=element(by.xpath("//*[@class='load-more-link']"));

        browser.actions().mouseMove(ele_more).perform();
        ele_more.click()     
        browser.sleep(3000)


      });
    
});