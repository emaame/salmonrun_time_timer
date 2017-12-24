import { expect } from 'chai';
import DateFormatter from "../src/date_formatter";

// test は JST 環境での実行を仮定している。
describe('DateFormatter', () => {
    const date_formatter = new DateFormatter();

    describe('getMonthText', () => {
        it('4:3:2.001 で 03:02.001 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T04:03:02.001+09:00'));
            expect(date_formatter.getMonthText(d)).to.eql("12/31 04:03:02");
        });
        it('14:23:32.059 で 23:32.059 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T14:23:32.059+09:00'));
            expect(date_formatter.getMonthText(d)).to.eql("12/31 14:23:32");
        });
        it('23:58:59.987 で 58:59.987 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T23:58:59.987+09:00'));
            console.log(d);
            expect(date_formatter.getMonthText(d)).to.eql("12/31 23:58:59");
        });
    });
    describe('getMinText', () => {
        it('4:3:2.001 で 03:02.001 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T04:03:02.001+09:00'));
            expect(date_formatter.getMinText(d)).to.eql("03:02.001");
        });
        it('14:23:32.059 で 23:32.059 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T14:23:32.059+09:00'));
            expect(date_formatter.getMinText(d)).to.eql("23:32.059");
        });
        it('23:58:59.987 で 58:59.987 を返すこと', () => {
            const d = new Date(Date.parse('2017-12-31T23:58:59.987+09:00'));
            expect(date_formatter.getMinText(d)).to.eql("58:59.987");
        });
    });
});