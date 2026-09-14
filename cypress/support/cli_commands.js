Cypress.Commands.add('cloneViaSSH', project => {
  const domain = new URL(Cypress.config('baseUrl')).hostname

  cy.task('cloneViaSSH', {
    repository: `ssh://git@${domain}:2222/${Cypress.env('user_name')}/${project.name}.git`,
    destination: `cypress/downloads/${project.name}`,
  })
})