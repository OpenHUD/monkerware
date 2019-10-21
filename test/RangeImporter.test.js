import { importFile, importDirectory } from '../src/RangeImporter.js';
import { expect } from 'chai';

describe('RangeImporter', () => {
    describe('importFile', () => {
        it ('imports .rng files', () => {
            const range = importFile({
                file: './test/ranges/4-way/10bb/0.rng'
            });

            expect(range.get('72o')).to.deep.equal({
                p: 1.0,
                ev: 0.0
            });
        });
    });

    describe('importDirectory', () => {
        it ('imports all .rng files', () => {
            const ranges = importDirectory({
                directory: './test/ranges/4-way/10bb/'
            });

            expect(ranges.get('0')).to.not.be.undefined;
            expect(ranges.get('2')).to.be.undefined;
            expect(ranges.get('5.3.0.1.0')).to.not.be.undefined;

            expect(ranges.get('0').get('72o')).to.deep.equal({
                p: 1.0,
                ev: 0.0
            });
        });
    });
});