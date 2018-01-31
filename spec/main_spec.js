const getMsg = require('../main/main');

describe('UAV', function () {

    let txt = `plane1 1 1 1
plane1 1 1 1 1 2 3
plane1 2 3 4 1 1 1
plane1 3 4 5
plane1 1 1 1 1 2 3`;

    it('returns infos with id : 0', function () {
        let result = getMsg(txt, 0);
        let expectText ="plane1 0 1 1 1";

        expect(result).toEqual(expectText);
    });

    it('returns infos with id : 1', function () {
        let result = getMsg(txt, 1);
        let expectText ="plane1 1 2 3 4";

        expect(result).toEqual(expectText);
    });

    it('returns infos with id : 2', function () {
        let result = getMsg(txt, 2);
        let expectText ="plane1 2 3 4 5";

        expect(result).toEqual(expectText);
    });

    it('returns infos with id : 3', function () {
        let result = getMsg(txt, 3);
        let expectText ="Error: 3";

        expect(result).toEqual(expectText);
    });

    it('returns infos with id : 4', function () {
        let result = getMsg(txt, 4);
        let expectText ="Error: 4";

        expect(result).toEqual(expectText);
    });
    it('returns infos with id : 100', function () {
        let result = getMsg(txt, 100);
        let expectText ="Cannot find 100";

        expect(result).toEqual(expectText);
    });

});
