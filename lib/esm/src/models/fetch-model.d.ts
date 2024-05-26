import { Model } from "./model";
export declare class FetchModel extends Model {
    constructor();
    error: Error | undefined;
    busy: boolean;
    ok: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
    setError(error: Error | undefined): void;
    setBusy(busy: boolean): void;
    setOk(ok: boolean): void;
    setStartDate(startDate: Date | undefined): void;
    setEndDate(endDate: Date | undefined): void;
    get fetched(): boolean;
    fetch(fetch: () => Promise<unknown>): Promise<unknown>;
}
