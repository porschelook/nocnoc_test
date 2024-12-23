import { expect, Page } from "@playwright/test";

export class HomePage {
    private page: Page;
 
    baseUrl = 'https://nocnoc.com/';

    BtnLogin = 'login-btn';
    BtnCart = 'cart-btn';
    BtnLanguage = 'language-btn';
    BtnHelp = 'help';
   
    private inputPhoneOrEmail: string = "#email-phone";
    /**
     * 
     * @param {Page} page 
     */

    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async checkLogin() {
         
        await this.page.getByTestId('login-btn').click();
    } 

    async checkCart() {
        await this.page.getByTestId(this.BtnCart).click();
    } 

    async checkExternal () {
        await this.page.getByTestId(this.BtnHelp).click();
        const [newPage] = await Promise.all([
              await this.page.waitForEvent('popup'),
              this.page.getByTestId(this.BtnHelp).click(),
          ])
           
          await expect(newPage).toHaveURL('https://support.nocnoc.com/hc/th');
    } 
    
    async checkLanguage() {
        await this.page.getByTestId(this.BtnLanguage).click();
         
        await this.page.getByAltText('EN').click();
    } 

    async fillPhoneNumber(inputNum: string): Promise<void> {
        await this.page.fill(this.inputPhoneOrEmail, inputNum, { timeout: 5000 });
        expect(await this.page.locator(this.inputPhoneOrEmail).inputValue()).toBe(inputNum);
    }   

    async fillEmail(inputEmail: string): Promise<void> {
        await this.page.fill(this.inputPhoneOrEmail, inputEmail, { timeout: 5000 });
        expect(await this.page.locator(this.inputPhoneOrEmail).inputValue()).toBe(inputEmail);
    }
    
    async login(phoneNumber: string): Promise<void> {
        await this.page.fill(this.inputPhoneOrEmail, phoneNumber, { timeout: 5000 });
        // await this.page.getByText('ต่อไป').click();

        await this.page.keyboard.press('Enter');
        // expect(await this.page.getByText('กรอกเบอร์โทรศัพท์หรืออีเมลที่ถูกต้อง').isVisible());
        await this.page.screenshot({ path: 'A.png' });
        // await expect( this.page.locator(this.inputPhoneOrEmail)).toHaveClass('form-control is-invalid');
        
     


    }

    

     
}