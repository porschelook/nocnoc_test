import { expect, Page } from "@playwright/test";

export class ProductPage {
    private page: Page;
 
    baseUrl = 'https://nocnoc.com/p/Televisions/LG-4K-Smart-TV-webOS-%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99-55UQ/12290669';

    BtnLogin = 'login-btn';
    BtnCart = 'cart-btn';
    BtnRating = '.star-rating.sm';
    BtnWishList = 'wishlist-btn';
    InputQuatity = 'input[name="quantity"]';
   
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

    

    // async checkWishList () {
    //     await this.page.click('[class="wishlist-compare-section-new"]');
        
           
          
    // } 
    
    async checkRating() {
      
        await this.page.click(this.BtnRating);  // Select the span by class

        const popover = await this.page.locator('.popover.show.bs-popover-auto');
        await expect(popover).toBeVisible();

    } 

    async IncreaseItems() {
        
        const valueNum = parseInt(await this.page.locator(this.InputQuatity).inputValue());
        
        
        await this.page.locator('.icon-plus').click();
    
        const expectedValue = valueNum + 1;
    
         const actualValue = parseInt(await this.page.locator(this.InputQuatity).inputValue());
        expect(actualValue).toBe(expectedValue);
    }
    

    async DecreaseItems() {
        const valueNum = parseInt(await this.page.locator(this.InputQuatity).inputValue());
        
        
        await this.page.locator('.icon-minus').click();
    
         const expectedValue = valueNum -  1;
    
         const actualValue = parseInt(await this.page.locator(this.InputQuatity).inputValue());
        expect(actualValue).toBe(expectedValue);
    }

    async checkTrueValue() {
        expect(parseInt(await this.page.locator(this.InputQuatity).inputValue())).toBeTruthy();
        
    }
    async getStockQuatity() {
        const textContent = await this.page.locator('.product-stock-container strong').innerText();

        const stockNumber = parseInt(textContent.match(/\d+/)[0], 10); // Convert stockNumber to an integer
       return stockNumber;
    }

    async checkValueNoMoreThanStocks() {
 
        const stockNumber = await this.getStockQuatity(); 
        const inputQuantity = parseInt(await this.page.locator(this.InputQuatity).inputValue(), 10); // Parse the input value to an integer

        expect(inputQuantity).toBeLessThanOrEqual(stockNumber); // Compare as numbers

         
    }
    
    async checkPlusDisable() {
        const stockNumber = await this.getStockQuatity();
        const inputQuantity = parseInt(await this.page.locator(this.InputQuatity).inputValue(), 10); // Parse the input value to an integer

        if (stockNumber === inputQuantity) {
            const isButtonDisabled = await this.page.locator('button[action="+"]').isDisabled();
            
            expect(isButtonDisabled).toBe(true); // Assert that the button is disabled
            return false;  
        } else {
            return true;
            // console.log('Stock number does not equal input quantity.');
          }
         
    }

    async checkMinusDisable() {
        const inputQuantity = parseInt(await this.page.locator(this.InputQuatity).inputValue(), 10); // Parse the input value to an integer

        if (1 === inputQuantity) {
            const isButtonDisabled = await this.page.locator('button[action="-"]').isDisabled();
            
            expect(isButtonDisabled).toBe(true); // Assert that the button is disabled
            return true;  
        } else {
            return false;
            // console.log('Stock number does not equal input quantity.');
          }
         
    }

    
    async checkValueNoLessThanMinimum() {
 
        const inputQuantity = parseInt(await this.page.locator(this.InputQuatity).inputValue(), 10); // Parse the input value to an integer

        expect(inputQuantity).toBeGreaterThan(0);  

         
    }
    
}