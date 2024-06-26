describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').type('qat@mailinator.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('button[data-qa="login-button"]').click();

     // Step 3: Fetch labels and prices of featured items, sort them, and print on console
     cy.get('.features_items .productinfo').each(($el) => {
      const label = $el.find('p').text();
      const priceText = $el.find('h2').text();
      const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
      cy.log(`Label: ${label}, Price: ${price}`);
    });

    cy.get('.features_items .productinfo').then(($items) => {
      const products = Array.from($items).map(item => {
        const label = Cypress.$(item).find('p').text();
        const priceText = Cypress.$(item).find('h2').text();
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        return { label, price };
      });
       //Sort products by price low to high
      products.sort((a, b) => a.price - b.price);
      products.forEach(product => {
        //print sorted products from low to high
        cy.log(`Label: ${product.label}, Price: ${product.price}`);
        console.log(`Label: ${product.label}, Actual Price: ${product.price}`);
      });
    });

    // Step 4: Navigate to Women >> Dress >> Women – Tops Products
    cy.get('.active > .col-sm-6:nth-child(1)').click();
    cy.get('.panel:nth-child(1) > .panel-heading a').click();
    //cy.url().should('contains', 'https://www.automationexercise.com/category_products/1');
    cy.get('.panel:nth-child(1) .fa').click();
    cy.get('.panel:nth-child(1) .fa').click();
   



    // Select the Fancy Green Top and add to cart
    cy.get('a[href="/product_details/8"]').click();
    cy.url().should('contains', 'https://www.automationexercise.com/product_details/8');
    cy.get('.cart').click();
    cy.get('.btn-success').click();
    // Select the summer white top and add to cart
    cy.get('.panel:nth-child(1) .badge').click();
    cy.get('#Women > .panel-body > ul > :nth-child(2) > a').click();
    cy.get('a[href="/product_details/6"]').click();

    //cy.url().should('contains', 'https://www.automationexercise.com/product_details/5"]');
    cy.url().should('contains', 'https://www.automationexercise.com/product_details/6');
    cy.get('.cart').click();
    cy.get('.btn-success').click();


    // Step 5: View cart and proceed to checkout
    cy.get('.cart').click();
    cy.get('.modal-body > :nth-child(2)').click();
    cy.get('.btn.btn-default.check_out').click();
    cy.get('textarea[name="message"]').type('order placed');
    cy.get('.btn.btn-default.check_out').type('order placed');

    // Enter card details
    cy.get('input[name="name_on_card"]').type('Test Card');
    cy.get('input[name="card_number"]').type('4100 0000 0000 0000');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[name="expiry_month"]').type('01');
    cy.get('input[name="expiry_year"]').type('1900');
    cy.contains('Pay and Confirm Order').click();

    // Step 6: Confirm order has been placed
    cy.contains('Order Placed!').should('be.visible');
  });
  })
  
    
  