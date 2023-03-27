import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args:[
        '--start-maximized' // you can also use '--start-fullscreen'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1040});
    await page.goto('https://spaceinvasion.bitmeup.com/');
    // Set screen size
    await page.waitForNetworkIdle();
    await page.waitForSelector('[id="bitmeup.login.email"]');
    await page.type('[id="bitmeup.login.email"]', 'dhgsagrg@sharklasers.com');
    await page.type('[id="bitmeup.login.password"]', 'Password1');
    await page.waitForNetworkIdle();
    await page.waitForSelector('.login_button');
    await page.click('.login_button');
    await page.waitForNetworkIdle();
    await page.waitForSelector('[onclick="startpage.selectInstance(46)"]');
    await page.click('[onclick="startpage.selectInstance(46)"]');
    await page.waitForNetworkIdle();
    let url = new URL(page.url());
    let sid = url.searchParams.get('sid');
    await page.goto('https://spaceinvasion.bitmeup.com/indexInternal.es?action=internalHome&sid='+ sid);
    await page.waitForNetworkIdle();
    let tasks = await page.$$('[id="tutorial.text"] td>table>tbody>tr>td td:first-of-type');
    
    console.log(tasks);
    tasks = await Promise.all(tasks.map(async task => {
        let text = await task.evaluate(el => el.textContent)
        
        return text.trim().match(/Increase your ([\w\s]+) level/)[1];
    }));
    console.log(tasks);
    //await browser.close();
  })();