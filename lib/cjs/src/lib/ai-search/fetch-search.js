"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSearchDocs = void 0;
const fetchSearchDocs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ nexaiApiKey, nexaiApiUrl }) {
    const res = yield fetch(nexaiApiUrl + '/doc/search/?projectId=' + nexaiApiKey, {
        mode: 'cors'
    });
    const data = (yield res.json()).data;
    const extractions = data.extractions;
    console.log('data', data);
    const nav = extractions.map((doc) => {
        return ({
            title: doc.title || doc.name,
            href: doc.name,
            items: doc.question_answers.map(q => {
                return {
                    title: q.question,
                    summary: q.answer,
                    href: doc.documentId + '#' + q.question,
                    label: doc.keywords[0],
                };
            })
        });
    });
    return nav;
});
exports.fetchSearchDocs = fetchSearchDocs;
