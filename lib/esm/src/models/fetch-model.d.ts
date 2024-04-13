import { Model } from "./model";
export declare class FetchModel extends Model {
    constructor();
    error: Error | undefined;
    busy: boolean;
    ok: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
    get fetched(): boolean;
    fetch(fetch: () => Promise<unknown>): Promise<unknown>;
}
