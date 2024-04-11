import { Model } from "./model";
export declare class FetchModel extends Model {
    error?: Error;
    busy: boolean;
    ok: boolean;
    startDate?: Date;
    endDate?: Date;
    get fetched(): boolean;
    fetch(fetch: () => Promise<unknown>): Promise<unknown>;
}
