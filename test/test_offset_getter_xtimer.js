import { expect } from "chai";
import { OffsetGetterXTimer } from "../src/time_offset";

describe("OffsetGetterXTimer", () => {
    // see https://qiita.com/AtsushiFukuda/items/fb20f8a410b47396d83a
    const data = [
        { xtimer: "S1602674787.604632,VS0,VE180", expect: 1602674786.604632 }, // -1の補正が必要
        { xtimer: "S1605950105.481643,VS0,VE191", expect: 1605950105.481643 },
        { xtimer: "S1605950354.922070,VS0,VE0", expect: 1605950353.92207 }, // -1の補正が必要
    ];
    describe("parse", () => {
        const xtimer = new OffsetGetterXTimer();
        for (var info of data) {
            it(`${info.xtimer} -> ${info.expect}`, () => {
                expect(xtimer.parse(info.xtimer)).to.approximately(
                    info.expect,
                    0.01 // 誤差を込みにしておく
                );
            });
        }
    });
});
