import { expect } from 'chai';
import SalmonrunTimeTimer from "../src/salmonrun_time_timer";

describe('SalmonrunTimeTimer', () => {
    const timer = new SalmonrunTimeTimer();

    const date_check_helper = (list, text_list) => {
        expect(list.length).to.eql(text_list.length);
        for(let i = 0; i < list.length; ++i) {
            expect(list[i] - Date.parse(text_list[i])).to.eql(0, list[i]);
        }
    };

    describe('listup_next_STT', () => {
        it('7個の配列を返すこと', () => {
            const list = timer.listup_next_STT();
            expect(list.length).to.equal(7);
        });
        it('00:00 で 00:02 を返すこと', () => {
            const date = Date.parse('2017-12-31T00:00:00+09:00');
            const list = timer.listup_next_STT(date)
            date_check_helper(list,
                ['2017-12-31T00:02:00+09:00',
                 '2017-12-31T00:10:00+09:00', 
                 '2017-12-31T00:18:00+09:00', 
                 '2017-12-31T00:26:00+09:00', 
                 '2017-12-31T00:34:00+09:00', 
                 '2017-12-31T00:42:00+09:00', 
                 '2017-12-31T00:50:00+09:00']);
        });
        it('00:02 で 00:10 を返すこと', () => {
            const date = Date.parse('2017-12-31T00:02:00+09:00');
            const list = timer.listup_next_STT(date);
            date_check_helper(list,
                ['2017-12-31T00:10:00+09:00',
                 '2017-12-31T00:18:00+09:00', 
                 '2017-12-31T00:26:00+09:00', 
                 '2017-12-31T00:34:00+09:00', 
                 '2017-12-31T00:42:00+09:00', 
                 '2017-12-31T00:50:00+09:00', 
                 '2017-12-31T01:02:00+09:00']);
        });
        it('00:50 で 01:02 を返すこと', () => {
            const date = Date.parse('2017-12-31T00:50:00+09:00');
            const list = timer.listup_next_STT(date);
            date_check_helper(list,
                ['2017-12-31T01:02:00+09:00', 
                 '2017-12-31T01:10:00+09:00', 
                 '2017-12-31T01:18:00+09:00', 
                 '2017-12-31T01:26:00+09:00', 
                 '2017-12-31T01:34:00+09:00', 
                 '2017-12-31T01:42:00+09:00', 
                 '2017-12-31T01:50:00+09:00']);
        });
        it('日、月、年またぎでバグらないこと', () => {
            const date = Date.parse('2017-12-31T23:49:00+09:00');
            const list = timer.listup_next_STT(date);
            date_check_helper(list,
                ['2017-12-31T23:50:00+09:00', 
                 '2018-01-01T00:02:00+09:00',
                 '2018-01-01T00:10:00+09:00', 
                 '2018-01-01T00:18:00+09:00', 
                 '2018-01-01T00:26:00+09:00', 
                 '2018-01-01T00:34:00+09:00', 
                 '2018-01-01T00:42:00+09:00']);
        });
        it('9分間隔', () => {
            const date = Date.parse('2017-12-31T23:46:00+09:00');
            const list = timer.listup_next_STT(date, 2, 9);
            date_check_helper(list,
                ['2017-12-31T23:47:00+09:00',
                 '2018-01-01T00:02:00+09:00',
                 '2018-01-01T00:11:00+09:00', 
                 '2018-01-01T00:20:00+09:00', 
                 '2018-01-01T00:29:00+09:00', 
                 '2018-01-01T00:38:00+09:00', 
                 '2018-01-01T00:47:00+09:00']);
        });
        it('10分間隔', () => {
            const date = Date.parse('2017-12-31T23:40:00+09:00');
            const list = timer.listup_next_STT(date, 2, 10);
            date_check_helper(list,
                ['2017-12-31T23:42:00+09:00',
                 '2018-01-01T00:02:00+09:00',
                 '2018-01-01T00:12:00+09:00', 
                 '2018-01-01T00:22:00+09:00', 
                 '2018-01-01T00:32:00+09:00', 
                 '2018-01-01T00:42:00+09:00', 
                 '2018-01-01T01:02:00+09:00']);
        });
    });
});