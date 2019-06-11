import * as puppeteer from 'puppeteer';
(async () => {

    const browser = await puppeteer.launch();


    // RETURNS A NEW PAGE.
    const page = await browser.newPage();




    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




    page.screenshot({}); // SCREENSHOT
    page.pdf() // PDF. NOT WORKING FOR MY VERSION.

    // GOES TO A SPECIFIC URL
    page.goto('URL');

    // GETS AN ELEMENT IN THE PAGE. LIKE (document.querySelector)
    page.waitFor('selector')

    // GETS ARRAY OF ELEMENTS. LIKE (document.querySelectorAll)
    page.$$('selector');

    // GETTING AN ELEMENT
    const buttonEelement = await page.waitFor('button.my-btn-class-herbe2-el-le2');


    buttonEelement.click();

    const input = await page.waitFor('#email');
    input.type('a@a.com'); //  WE CAN'T TYPE A BUTTON BUT ELEMENTS GOT SUCH FUNCTION ANYWAYS.

    const fileInput = await page.waitFor('#file');
    fileInput.uploadFile('C:/PIER"S biggest dream or mawada"s/img.png'); // USED TO UPLOAD IMAGES


    // GOT FUNCTIONS LIKE : CLICK / MOVE / FOCUS. 
    page.mouse;

})();