describe('Index Page', () => {
    let testPoint = { x: 200, y: 400 }
    beforeEach(function () {
        cy.visit('http://localhost:8080/');
        cy.wait(2000)
    })
    it('Deve ser capaz de criar um registro no mapa', () => {
        cy.wait(1000); // espera o mapa carregar
        cy.get('#map').should('be.visible').then(() => {
            cy.get('#map').click(testPoint.x, testPoint.y);
        });

        cy.get('#titulo').type('Example Title');
        cy.get('#tipo').select('Assalto');
        cy.get('#data').type('2022-01-01T12:00');

        cy.get('#register').click();

        cy.reload();
        cy.wait(2000)
        cy.get('#map').click(testPoint.x, testPoint.y - 15);

        cy.get('p').should('contain', 'Título: Example Title');
        cy.get('p').should('contain', 'Tipo: Assalto');
        // formato da data pode variar de acordo com a linguagem do navegador
        // cy.get('p').should('contain', `Data: 01/01/2022, 12:00:00`);
    });
    
    it('deve ser capaz de buscar por registros dentro de 1km', () => {
        cy.get('#map').should('be.visible').then(() => {
            cy.get('#kmInput').type('1')
            cy.get('#map').click(testPoint.x, testPoint.y + 15);
        });
        cy.get('#geosearch').click()
        cy.wait(5000) // espera a query retornar, a primeira vez demora pois seta o cache
        cy.get('#listaOcorrencias').should('contain', 'Tipo:')
        cy.get('#listaOcorrencias').should('contain', 'Título:')
        cy.get('#listaOcorrencias').should('contain', 'Data:')
        
    })
    
    it('Deve retornar um erro ao registrar uma ocorrência sem marcar o local no mapa', () => {
        cy.get('#map').should('be.visible').then(() => {
            cy.get('#titulo').type('Example Title');
            cy.get('#tipo').select('Assalto');
            cy.get('#data').type('2022-01-01T12:00');

            cy.get('#register').click();
        });

        cy.on('window:alert', (message) => {
            expect(message).to.equal('Selecione um local no mapa antes de registrar');
        });
    });

});
