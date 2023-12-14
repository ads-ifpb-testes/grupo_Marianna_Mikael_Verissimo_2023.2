describe('Index Page', () => {
    let testPoint = { x: 100, y: 150 }

    beforeEach(() => {
        cy.visit('http://localhost:8080/');
        cy.wait(5000); // Wait for the map to load
    });

    it('Deve ser capaz de criar um registro no mapa', () => {
        cy.get('#map').should('be.visible').then(() => {
            cy.get('#map').click(testPoint.x, testPoint.y);
        });

        cy.get('#titulo').type('Example Title');
        cy.get('#tipo').select('Assalto');
        cy.get('#data').type('2022-01-01T12:00');

        cy.get('#register').click();
    });

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