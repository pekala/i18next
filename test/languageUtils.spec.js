import LanguageUtils from '../src/LanguageUtils';

describe('LanguageUtils', () => {

  describe('toResolveHierarchy()', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en' });
    });

    var tests = [
      {args: ['en'], expected: ['en']},
      {args: ['de'], expected: ['de', 'en']},
      {args: ['de', 'fr'], expected: ['de', 'fr']},
      {args: ['de', ['fr', 'en']], expected: ['de', 'fr', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de', 'fr']},
      {args: ['de-CH'], expected: ['de-CH', 'de', 'en']},
      {args: ['nb-NO'], expected: ['nb-NO', 'no', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

  describe('toResolveHierarchy() - cleanCode Option', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en', cleanCode: true });
    });

    var tests = [
      {args: ['EN'], expected: ['en']},
      {args: ['DE'], expected: ['de', 'en']},
      {args: ['DE', 'fr'], expected: ['de', 'fr']},
      {args: ['de', ['FR', 'en']], expected: ['de', 'fr', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de', 'fr']},
      {args: ['DE-CH'], expected: ['de-CH', 'de', 'en']},
      {args: ['nb-NO'], expected: ['nb-NO', 'no', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

  describe('toResolveHierarchy() - lowerCaseLng Option', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en', lowerCaseLng: true });
    });

    var tests = [
      {args: ['EN'], expected: ['en']},
      {args: ['DE'], expected: ['de', 'en']},
      {args: ['DE', 'fr'], expected: ['de', 'fr']},
      {args: ['de', ['FR', 'en']], expected: ['de', 'fr', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de', 'fr']},
      {args: ['DE-CH'], expected: ['de-ch', 'de', 'en']},
      {args: ['nb-NO'], expected: ['nb-no', 'no', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

  describe('toResolveHierarchy() - load Option: lngOnly', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en', load: 'languageOnly' });
    });

    var tests = [
      {args: ['en'], expected: ['en']},
      {args: ['de'], expected: ['de', 'en']},
      {args: ['de', 'fr'], expected: ['de', 'fr']},
      {args: ['de', ['fr', 'en']], expected: ['de', 'fr', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de', 'fr']},
      {args: ['de-CH'], expected: ['de', 'en']},
      {args: ['nb-NO'], expected: ['no', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

  describe('toResolveHierarchy() - load Option: currentOnly', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en', load: 'currentOnly' });
    });

    var tests = [
      {args: ['en'], expected: ['en']},
      {args: ['de'], expected: ['de', 'en']},
      {args: ['de', 'fr'], expected: ['de', 'fr']},
      {args: ['de', ['fr', 'en']], expected: ['de', 'fr', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de', 'fr']},
      {args: ['de-CH'], expected: ['de-CH', 'en']},
      {args: ['nb-NO'], expected: ['nb-NO', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

  describe('toResolveHierarchy() - whitelist', () => {
    var cu;

    before(() => {
      cu = new LanguageUtils({ fallbackLng: 'en', whitelist: ['nb-NO', 'de', 'en'] });
      cu.logger.setDebug(false); // silence
    });

    var tests = [
      {args: ['en'], expected: ['en']},
      {args: ['de'], expected: ['de', 'en']},
      {args: ['de', 'fr'], expected: ['de']},
      {args: ['de', ['fr', 'en']], expected: ['de', 'en']},
      {args: ['de', ['fr', 'de']], expected: ['de']},
      {args: ['de-CH'], expected: ['de', 'en']},
      {args: ['nb-NO'], expected: ['nb-NO', 'en']}
    ];

    tests.forEach((test) => {
      it('correctly prepares resolver for ' + JSON.stringify(test.args) + ' args', () => {
        expect(cu.toResolveHierarchy.apply(cu, test.args)).to.eql(test.expected);
      });
    });
  });

});
