// import { module, test } from 'qunit';
// import { visit, currentURL } from '@ember/test-helpers';
// import { setupApplicationTest } from 'ember-qunit';

// module('Acceptance | list rentals', function(hooks) {
//   setupApplicationTest(hooks);

//   test('visiting /list-rentals', async function(assert) {
//     await visit('/list-rentals');

//     assert.equal(currentURL(), '/list-rentals');
//   });
// });

import { test, module } from 'qunit';
// import moduleForAcceptance from 'ember-project/tests/helpers/module-for-acceptance';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance | list-rentals');

test('should redirect to rentals route', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});

test('should list available rentals.', function (assert) {
  visit('/');
  assert.equal(
    this.element.querySelectorAll('.listing').length,
    3,
    'should display 3 listings'
  );
});

test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information.', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function () {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

test('should filter the list of rentals by city.', function (assert) {
  visit('/');

  fillIn('.list-filter input', 'seattle');

  keyEvent('.list-filter input', 'keyup', 69);

  andThen(function () {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');

    assert.equal(
      find('.listing .location:contains("Seattle")').length,
      1,
      'should contain 1 listing with location Seattle'
    );
  });
});

test('should show details for a specific rental', function (assert) {
  visit('/rentals');
  click('a:contains("Grand Old Mansion")');
  andThen(function () {
    assert.equal(
      currentURL(),
      '/rentals/grand-old-mansion',
      'should navigate to show route'
    );
    assert.equal(
      find('.show-listing h2').text(),
      'Grand Old Mansion',
      'should list rental title'
    );
    assert.equal(
      find('.description').length,
      1,
      'should list a description of the property'
    );
  });
});
